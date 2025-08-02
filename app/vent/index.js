"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { PostCard } from "../../components/PostCard"
import { Header } from "../../components/Header"
import { useApp } from "../../context/AppContext"

const VENT_PROMPTS = [
  "What's really pissing you off right now?",
  "What situation is making you feel trapped?",
  "What's been eating at you all day?",
  "What would you tell that person if you could?",
  "What's the worst part about this situation?",
]

export default function VentScreen() {
  const [showPrompts, setShowPrompts] = useState(false)
  const router = useRouter()
  const { posts } = useApp()

  const ventPosts = posts.filter((post) => post.mode === "vent")

  const handlePromptSelect = (prompt) => {
    router.push({ pathname: "/create-post", params: { mode: "vent", prompt } })
  }

  return (
    <View style={styles.container}>
      <Header title="VENT" subtitle="Let it out. No judgment here." color="#ff6b6b" />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#ff6b6b" }]}
          onPress={() => router.push({ pathname: "/create-post", params: { mode: "vent" } })}
        >
          <Text style={styles.actionButtonText}>🔥 Quick Vent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#333" }]}
          onPress={() => setShowPrompts(!showPrompts)}
        >
          <Text style={styles.actionButtonText}>💭 Need Help?</Text>
        </TouchableOpacity>
      </View>

      {/* Prompts */}
      {showPrompts && (
        <View style={styles.promptsSection}>
          <Text style={styles.promptsTitle}>Try answering one of these:</Text>
          {VENT_PROMPTS.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptCard} onPress={() => handlePromptSelect(prompt)}>
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Posts Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {ventPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💨</Text>
            <Text style={styles.emptyText}>No vents yet</Text>
            <Text style={styles.emptySubtext}>
              Sometimes you just need to let it out. That's what this space is for.
            </Text>
          </View>
        ) : (
          ventPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#ff6b6b" />)
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
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  promptsSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  promptsTitle: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 12,
  },
  promptCard: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#ff6b6b",
  },
  promptText: {
    color: "#fff",
    fontSize: 14,
  },
  feed: {
    flex: 1,
    paddingHorizontal: 24,
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
