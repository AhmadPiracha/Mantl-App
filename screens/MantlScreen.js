import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useApp } from "../context/AppContext"
import PostCard from "../components/PostCard"
import { useNavigation } from "@react-navigation/native"

export default function MantlScreen() {
  const { posts } = useApp()
  const navigation = useNavigation()

  const mantlPosts = posts.filter((post) => post.mode === "mantl")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MANTL</Text>
        <Text style={styles.subtitle}>Build strength. Stay grounded.</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#00ff88" }]}
          onPress={() => navigation.navigate("CreatePost", { mode: "mantl" })}
        >
          <Text style={styles.addButtonText}>+ MANTL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed}>
        {mantlPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Ready to build?</Text>
            <Text style={styles.emptySubtext}>Share your wins and growth</Text>
          </View>
        ) : (
          mantlPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#00ff88" />)
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
    color: "#00ff88",
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
    color: "#000",
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
