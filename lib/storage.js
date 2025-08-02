import AsyncStorage from "@react-native-async-storage/async-storage"

const POSTS_KEY = "mantl_posts"

export const getPosts = async () => {
  try {
    const postsData = await AsyncStorage.getItem(POSTS_KEY)
    return postsData ? JSON.parse(postsData) : []
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

export const savePost = async (post) => {
  try {
    const existingPosts = await getPosts()
    const updatedPosts = [post, ...existingPosts]
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts))
    return true
  } catch (error) {
    console.error("Error saving post:", error)
    return false
  }
}

export const deletePost = async (postId) => {
  try {
    const existingPosts = await getPosts()
    const updatedPosts = existingPosts.filter((post) => post.id !== postId)
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts))
    return true
  } catch (error) {
    console.error("Error deleting post:", error)
    return false
  }
}

export const getPostsByMode = async (mode) => {
  try {
    const allPosts = await getPosts()
    return allPosts.filter((post) => post.mode === mode)
  } catch (error) {
    console.error("Error getting posts by mode:", error)
    return []
  }
}

export const clearAllPosts = async () => {
  try {
    await AsyncStorage.removeItem(POSTS_KEY)
    return true
  } catch (error) {
    console.error("Error clearing posts:", error)
    return false
  }
}
