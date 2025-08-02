"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  signInAnonymouslyUser,
  onAuthStateChange,
  saveUserToFirestore,
  getUserFromFirestore,
  savePostToFirestore,
  getPostsFromFirestore,
  saveMoodToFirestore,
  getMoodsFromFirestore,
  isOnline,
  initializeNetworkMonitoring,
} from "../lib/firebase"

const AppContext = createContext()

const initialState = {
  posts: [],
  moodEntries: [],
  user: null,
  loading: true,
  isFirstTime: true,
  isOnline: true,
  firebaseUser: null,
  syncing: false,
  lastSyncTime: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_SYNCING":
      return { ...state, syncing: action.payload }

    case "SET_ONLINE":
      return { ...state, isOnline: action.payload }

    case "SET_FIREBASE_USER":
      return { ...state, firebaseUser: action.payload }

    case "SET_FIRST_TIME":
      return { ...state, isFirstTime: action.payload }

    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_LAST_SYNC":
      return { ...state, lastSyncTime: action.payload }

    case "INITIALIZE_USER":
      if (state.user) return state

      const newUser = {
        id: `user_${Date.now()}`,
        broScore: 0,
        currentStreak: 0,
        longestStreak: 0,
        badges: [],
        totalPosts: 0,
        totalEntries: 0,
        joinDate: new Date().toISOString(),
        lastMoodDate: null,
      }
      return { ...state, user: newUser }

    case "ADD_POST":
      const newPost = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        wordCount: action.payload.content.trim().split(/\s+/).filter(Boolean).length,
        synced: false,
      }
      const updatedPosts = [newPost, ...state.posts]
      const newBroScore = (state.user?.broScore || 0) + 10

      return {
        ...state,
        posts: updatedPosts,
        user: {
          ...state.user,
          broScore: newBroScore,
          totalPosts: (state.user?.totalPosts || 0) + 1,
          totalEntries: (state.user?.totalEntries || 0) + 1,
        },
      }

    case "ADD_MOOD_ENTRY":
      const moodEntry = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        synced: false,
      }
      const updatedMoodEntries = [moodEntry, ...state.moodEntries]

      const today = new Date().toDateString()
      const lastEntry = state.moodEntries[0]
      const isConsecutive =
        lastEntry &&
        new Date(lastEntry.timestamp).toDateString() === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

      const newStreak = isConsecutive ? (state.user?.currentStreak || 0) + 1 : 1
      const newLongestStreak = Math.max(newStreak, state.user?.longestStreak || 0)

      return {
        ...state,
        moodEntries: updatedMoodEntries,
        user: {
          ...state.user,
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          broScore: (state.user?.broScore || 0) + 5,
          lastMoodDate: today,
          totalEntries: (state.user?.totalEntries || 0) + 1,
        },
      }

    case "SYNC_POSTS":
      return {
        ...state,
        posts: action.payload.map((post) => ({ ...post, synced: true })),
      }

    case "SYNC_MOODS":
      return {
        ...state,
        moodEntries: action.payload.map((mood) => ({ ...mood, synced: true })),
      }

    case "LOAD_DATA":
      return { ...state, ...action.payload, loading: false }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (!state.loading && state.user) {
      saveDataLocally()
    }
  }, [state.posts, state.moodEntries, state.user, state.loading])

  useEffect(() => {
    if (state.firebaseUser && state.isOnline) {
      syncWithFirebase()
    }
  }, [state.firebaseUser, state.isOnline])

  const initializeApp = async () => {
    try {
      // Initialize network monitoring
      const unsubscribeNetwork = initializeNetworkMonitoring()

      // Check initial online status
      dispatch({ type: "SET_ONLINE", payload: isOnline() })

      // Load local data first
      await loadLocalData()

      // Initialize Firebase auth
      await initializeFirebaseAuth()

      // Cleanup function for network monitoring
      return unsubscribeNetwork
    } catch (error) {
      console.error("Error initializing app:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const initializeFirebaseAuth = async () => {
    try {
      onAuthStateChange(async (user) => {
        if (user) {
          dispatch({ type: "SET_FIREBASE_USER", payload: user })
          await syncUserWithFirebase(user)
        } else {
          const newUser = await signInAnonymouslyUser()
          dispatch({ type: "SET_FIREBASE_USER", payload: newUser })
        }
      })
    } catch (error) {
      console.error("Error with Firebase auth:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const syncUserWithFirebase = async (firebaseUser) => {
    try {
      if (!state.isOnline) return

      const firestoreUser = await getUserFromFirestore()

      if (firestoreUser) {
        dispatch({ type: "SET_USER", payload: firestoreUser })
      } else if (state.user) {
        await saveUserToFirestore(state.user)
      } else {
        dispatch({ type: "INITIALIZE_USER" })
      }

      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      console.error("Error syncing user with Firebase:", error)
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const loadLocalData = async () => {
    try {
      const [savedData, isFirstTime] = await Promise.all([
        AsyncStorage.getItem("mantlData"),
        AsyncStorage.getItem("mantl_first_time"),
      ])

      if (savedData) {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: "LOAD_DATA", payload: parsedData })
      } else {
        dispatch({ type: "INITIALIZE_USER" })
        dispatch({ type: "SET_LOADING", payload: false })
      }

      dispatch({ type: "SET_FIRST_TIME", payload: isFirstTime === null })
    } catch (error) {
      console.error("Error loading local data:", error)
      dispatch({ type: "INITIALIZE_USER" })
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const saveDataLocally = async () => {
    try {
      await AsyncStorage.setItem(
        "mantlData",
        JSON.stringify({
          posts: state.posts,
          moodEntries: state.moodEntries,
          user: state.user,
          lastSyncTime: state.lastSyncTime,
        }),
      )
    } catch (error) {
      console.error("Error saving data locally:", error)
    }
  }

  const syncWithFirebase = async () => {
    if (state.syncing || !state.isOnline || !state.firebaseUser) return

    try {
      dispatch({ type: "SET_SYNCING", payload: true })

      await syncPostsWithFirebase()
      await syncMoodsWithFirebase()

      if (state.user) {
        await saveUserToFirestore(state.user)
      }

      dispatch({ type: "SET_LAST_SYNC", payload: new Date().toISOString() })
    } catch (error) {
      console.error("Error syncing with Firebase:", error)
    } finally {
      dispatch({ type: "SET_SYNCING", payload: false })
    }
  }

  const syncPostsWithFirebase = async () => {
    try {
      const unsyncedPosts = state.posts.filter((post) => !post.synced)
      for (const post of unsyncedPosts) {
        await savePostToFirestore(post)
      }

      const firestorePosts = await getPostsFromFirestore()
      dispatch({ type: "SYNC_POSTS", payload: firestorePosts })
    } catch (error) {
      console.error("Error syncing posts:", error)
    }
  }

  const syncMoodsWithFirebase = async () => {
    try {
      const unsyncedMoods = state.moodEntries.filter((mood) => !mood.synced)
      for (const mood of unsyncedMoods) {
        await saveMoodToFirestore(mood)
      }

      const firestoreMoods = await getMoodsFromFirestore()
      dispatch({ type: "SYNC_MOODS", payload: firestoreMoods })
    } catch (error) {
      console.error("Error syncing moods:", error)
    }
  }

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("mantl_first_time", "false")
      dispatch({ type: "SET_FIRST_TIME", payload: false })
    } catch (error) {
      console.error("Error completing onboarding:", error)
    }
  }

  const addPost = async (post) => {
    if (!state.user) {
      dispatch({ type: "INITIALIZE_USER" })
    }

    dispatch({ type: "ADD_POST", payload: post })

    if (state.isOnline && state.firebaseUser) {
      try {
        await savePostToFirestore({ ...post, synced: true })
      } catch (error) {
        console.error("Error saving post to Firebase:", error)
      }
    }
  }

  const addMoodEntry = async (mood) => {
    if (!state.user) {
      dispatch({ type: "INITIALIZE_USER" })
    }

    dispatch({ type: "ADD_MOOD_ENTRY", payload: mood })

    if (state.isOnline && state.firebaseUser) {
      try {
        await saveMoodToFirestore({ ...mood, synced: true })
      } catch (error) {
        console.error("Error saving mood to Firebase:", error)
      }
    }
  }

  const forceSync = async () => {
    if (state.isOnline && state.firebaseUser) {
      await syncWithFirebase()
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addPost,
        addMoodEntry,
        completeOnboarding,
        forceSync,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
