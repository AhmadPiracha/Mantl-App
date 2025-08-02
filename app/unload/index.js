"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { PostCard } from "../../components/PostCard"
import { Header } from "../../components/Header"
import { useApp } from "../../context/AppContext"

export default function UnloadScreen() {
  const router = useRouter()
  const { posts } = useApp()

  const unloadPosts = posts.filter((post) => post.mode === "unload")

  return (
    <View style={styles.container}>
      <Header title="UNLOAD" subtitle="Drop the weight. Clear the mind." color="#ffa726" />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#ffa726" }]}
        onPress={() => router.push({ pathname: "/create-post", params: { mode: "unload" } })}
      >
        <Text style={styles.addButtonText}>+ UNLOAD</Text>
      </TouchableOpacity>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {unloadPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎒</Text>
            <Text style={styles.emptyText}>Nothing to unload yet</Text>
            <Text style={styles.emptySubtext}>
              When life feels heavy, this is where you drop the weight and process what's really going on.
            </Text>
          </View>
        ) : (
          unloadPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#ffa726" />)
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
