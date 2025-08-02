import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useApp } from "../context/AppContext"
import PostCard from "../components/PostCard"
import { useNavigation } from "@react-navigation/native"

export default function LockerRoomScreen() {
  const { posts } = useApp()
  const navigation = useNavigation()

  const lockerPosts = posts.filter((post) => post.mode === "locker")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LOCKER ROOM</Text>
        <Text style={styles.subtitle}>Real talk. No filters.</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#8844ff" }]}
          onPress={() => navigation.navigate("CreatePost", { mode: "locker" })}
        >
          <Text style={styles.addButtonText}>+ SHARE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed}>
        {lockerPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>The locker room is quiet.</Text>
            <Text style={styles.emptySubtext}>Start the conversation</Text>
          </View>
        ) : (
          lockerPosts.map((post) => <PostCard key={post.id} post={post} accentColor="#8844ff" />)
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
    color: "#8844ff",
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
