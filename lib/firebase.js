import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence, onAuthStateChanged, signInAnonymously } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  query,
  limit,
  getDocs,
  where,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from "@react-native-community/netinfo"

// Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyAsXi3A_ShgLYyF0_CbuRMvw8dxVVtJaIo",
  authDomain: "mantl-app.firebaseapp.com",
  projectId: "mantl-app",
  storageBucket: "mantl-app.firebasestorage.app",
  messagingSenderId: "1069005151259",
  appId: "1:1069005151259:web:2bdc846367dbd6e053ecbe",
  measurementId: "G-2SELE7NEB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export const db = getFirestore(app)

// Network monitoring
let isCurrentlyOnline = true

export const initializeNetworkMonitoring = () => {
  return NetInfo.addEventListener((state) => {
    const wasOffline = !isCurrentlyOnline
    isCurrentlyOnline = state.isConnected && state.isInternetReachable

    if (wasOffline && isCurrentlyOnline) {
      // Just came back online - enable Firestore
      enableNetwork(db).catch(console.error)
    } else if (!isCurrentlyOnline) {
      // Went offline - disable Firestore to save battery
      disableNetwork(db).catch(console.error)
    }
  })
}

// Auth functions
export const signInAnonymouslyUser = async () => {
  try {
    const result = await signInAnonymously(auth)
    return result.user
  } catch (error) {
    console.error("Error signing in anonymously:", error)
    throw error
  }
}

export const getCurrentUser = () => {
  return auth.currentUser
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// User functions
export const saveUserToFirestore = async (userData) => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    await setDoc(
      doc(db, "users", user.uid),
      {
        ...userData,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )

    return true
  } catch (error) {
    console.error("Error saving user to Firestore:", error)
    throw error
  }
}

export const getUserFromFirestore = async () => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user from Firestore:", error)
    throw error
  }
}

// Post functions with retry logic
export const savePostToFirestore = async (post, retries = 3) => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    const postData = {
      ...post,
      userId: user.uid,
      createdAt: serverTimestamp(),
      synced: true,
    }

    const docRef = await addDoc(collection(db, "posts"), postData)
    return docRef.id
  } catch (error) {
    if (retries > 0 && error.code === "unavailable") {
      // Retry after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return savePostToFirestore(post, retries - 1)
    }
    console.error("Error saving post to Firestore:", error)
    throw error
  }
}

export const getPostsFromFirestore = async (mode = null, limitCount = 50) => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    let q = query(collection(db, "posts"), where("userId", "==", user.uid), limit(limitCount))

    if (mode) {
      q = query(collection(db, "posts"), where("userId", "==", user.uid), where("mode", "==", mode), limit(limitCount))
    }

    const querySnapshot = await getDocs(q)
    const posts = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      posts.push({
        id: doc.id,
        ...data,
        timestamp: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      })
    })

    return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error("Error getting posts from Firestore:", error)
    throw error
  }
}

// Mood functions with retry logic
export const saveMoodToFirestore = async (moodData, retries = 3) => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    const moodEntry = {
      ...moodData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      synced: true,
    }

    const docRef = await addDoc(collection(db, "moods"), moodEntry)
    return docRef.id
  } catch (error) {
    if (retries > 0 && error.code === "unavailable") {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return saveMoodToFirestore(moodData, retries - 1)
    }
    console.error("Error saving mood to Firestore:", error)
    throw error
  }
}

export const getMoodsFromFirestore = async (limitCount = 30) => {
  try {
    const user = getCurrentUser()
    if (!user) throw new Error("No authenticated user")

    const q = query(collection(db, "moods"), where("userId", "==", user.uid), limit(limitCount))

    const querySnapshot = await getDocs(q)
    const moods = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      moods.push({
        id: doc.id,
        ...data,
        timestamp: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      })
    })

    return moods.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error("Error getting moods from Firestore:", error)
    throw error
  }
}

// Network status
export const isOnline = () => {
  return isCurrentlyOnline
}
