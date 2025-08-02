// Authentication utilities (placeholder for Firebase Auth)
export const signInAnonymously = async () => {
  // Placeholder for Firebase anonymous auth
  return {
    user: {
      uid: `anon_${Date.now()}`,
      isAnonymous: true,
    },
  }
}

export const signOut = async () => {
  // Placeholder for Firebase sign out
  return true
}
