"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext()

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isFirstTime: true,
  moodHistory: [],
}

function authReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }

    case "SET_FIRST_TIME":
      return { ...state, isFirstTime: action.payload }

    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }

    case "ADD_MOOD_ENTRY":
      return {
        ...state,
        moodHistory: [action.payload, ...state.moodHistory.slice(0, 29)], // Keep last 30 entries
      }

    case "SET_MOOD_HISTORY":
      return { ...state, moodHistory: action.payload }

    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("mantl_user")
      const isFirstTime = await AsyncStorage.getItem("mantl_first_time")
      const moodHistory = await AsyncStorage.getItem("mantl_mood_history")

      if (userData) {
        const user = JSON.parse(userData)
        dispatch({ type: "SET_USER", payload: user })
      } else {
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          broScore: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalEntries: 0,
          joinDate: new Date().toISOString(),
        }
        await AsyncStorage.setItem("mantl_user", JSON.stringify(newUser))
        dispatch({ type: "SET_USER", payload: newUser })
      }

      if (moodHistory) {
        dispatch({ type: "SET_MOOD_HISTORY", payload: JSON.parse(moodHistory) })
      }

      dispatch({ type: "SET_FIRST_TIME", payload: isFirstTime === null })
    } catch (error) {
      console.error("Error loading user:", error)
      dispatch({ type: "SET_LOADING", payload: false })
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

  const updateUser = async (updates) => {
    try {
      const updatedUser = { ...state.user, ...updates }
      await AsyncStorage.setItem("mantl_user", JSON.stringify(updatedUser))
      dispatch({ type: "UPDATE_USER", payload: updates })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const updateMoodEntry = async (moodData) => {
    try {
      const entry = {
        id: Date.now().toString(),
        ...moodData,
      }

      // Update mood history
      const newHistory = [entry, ...state.moodHistory.slice(0, 29)]
      await AsyncStorage.setItem("mantl_mood_history", JSON.stringify(newHistory))
      dispatch({ type: "ADD_MOOD_ENTRY", payload: entry })

      // Update user stats
      const today = new Date().toDateString()
      const lastEntryDate = state.user?.lastMoodDate

      let newStreak = 1
      if (lastEntryDate) {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()
        if (lastEntryDate === yesterday) {
          newStreak = (state.user?.currentStreak || 0) + 1
        }
      }

      const longestStreak = Math.max(newStreak, state.user?.longestStreak || 0)

      await updateUser({
        currentStreak: newStreak,
        longestStreak,
        lastMoodDate: today,
        broScore: (state.user?.broScore || 0) + 10,
        totalEntries: (state.user?.totalEntries || 0) + 1,
      })
    } catch (error) {
      console.error("Error updating mood entry:", error)
      throw error
    }
  }

  const getMoodHistory = async () => {
    return state.moodHistory
  }

  const getWeeklyStats = async () => {
    // Calculate weekly statistics
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentEntries = state.moodHistory.filter((entry) => new Date(entry.timestamp) > weekAgo)

    return {
      mostUsedMode: "Vent", // Placeholder
      bestDay: "Monday", // Placeholder
      entriesThisWeek: recentEntries.length,
    }
  }

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["mantl_user", "mantl_mood_history", "mantl_first_time"])
      dispatch({ type: "SIGN_OUT" })
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        completeOnboarding,
        updateUser,
        updateMoodEntry,
        getMoodHistory,
        getWeeklyStats,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
