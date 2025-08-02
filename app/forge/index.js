"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { PostCard } from "../../components/PostCard"
import { Header } from "../../components/Header"
import { useApp } from "../../context/AppContext"

export default function ForgeScreen() {
  const router = useRouter()
  const { posts } = useApp()

  const MantlPosts = posts.filter((post) => post.mode === "forge")

  return (
    <View style={styles.container}>
      <Header title="MANTL" subtitle="Build strength. Grow stronger." color="#66bb6a" />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#66bb6a" }]}
        onPress={() => router.push({ pathname: "/create-post", params: { mode: "forge" } })}
      >
        <Text style={styles.addButtonText}>+ MANTL</Text>
      </TouchableOpacity>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {MantlPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⚡</Text>
            <Text style={styles.emptyText}>Ready to mantl?</Text>
            <Text style={styles.emptySubtext}>
              This is where you document growth, celebrate wins, and build mental strength through reflection.
            </Text>
          </View>
        ) : (
          MantlPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#66bb6a" />)
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
    color: "#000",
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
