"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { useRouter } from "expo-router"
import { PostCard } from "../../components/PostCard"
import { Header } from "../../components/Header"
import { getPosts } from "../../lib/storage"

export default function LockerScreen() {
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const allPosts = await getPosts()
    const lockerPosts = allPosts.filter((post) => post.mode === "locker")
    setPosts(lockerPosts)
  }

  return (
    <View style={styles.container}>
      <Header title="LOCKER ROOM" subtitle="Real talk. Connect with others." color="#ab47bc" />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#ab47bc" }]}
        onPress={() => router.push({ pathname: "/create-post", params: { mode: "locker" } })}
      >
        <Text style={styles.addButtonText}>+ SHARE</Text>
      </TouchableOpacity>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {posts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🤝</Text>
            <Text style={styles.emptyText}>The locker room is quiet</Text>
            <Text style={styles.emptySubtext}>
              This is where we share real talk - progress, setbacks, and everything in between.
            </Text>
          </View>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} accentColor="#ab47bc" />)
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  addButton: {
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  feed: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 22,
  },
})
