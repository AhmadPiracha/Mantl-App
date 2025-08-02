import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useApp } from "../context/AppContext"
import PostCard from "../components/PostCard"
import { useNavigation } from "@react-navigation/native"

export default function VentScreen() {
  const { posts } = useApp()
  const navigation = useNavigation()

  const ventPosts = posts.filter((post) => post.mode === "vent")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VENT</Text>
        <Text style={styles.subtitle}>Let it out. No judgment.</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#ff4444" }]}
          onPress={() => navigation.navigate("CreatePost", { mode: "vent" })}
        >
          <Text style={styles.addButtonText}>+ VENT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed}>
        {ventPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No vents yet.</Text>
            <Text style={styles.emptySubtext}>Tap + VENT to get started</Text>
          </View>
        ) : (
          ventPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#ff4444" />)
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff4444",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  feed: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#444",
  },
})
