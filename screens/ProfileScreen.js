import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useApp } from "../context/AppContext"
import { useNavigation } from "@react-navigation/native"

export default function ProfileScreen() {
  const { user, moodEntries, posts } = useApp()
  const navigation = useNavigation()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getDaysActive = () => {
    const joinDate = new Date(user.joinDate)
    const today = new Date()
    const diffTime = Math.abs(today - joinDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getModeColor = (mode) => {
    switch (mode) {
      case "vent":
        return "#ff4444"
      case "unload":
        return "#ff8800"
      case "mantl":
        return "#00ff88"
      case "locker":
        return "#8844ff"
      default:
        return "#666"
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.subtitle}>Your mental fitness journey</Text>
      </View>

      {/* BroScore */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>BROSCORE</Text>
        <Text style={styles.scoreValue}>{user.broScore}</Text>
        <Text style={styles.scoreSubtext}>Keep grinding</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.currentStreak}</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.longestStreak}</Text>
          <Text style={styles.statLabel}>Longest Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.totalPosts}</Text>
          <Text style={styles.statLabel}>Total Posts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{getDaysActive()}</Text>
          <Text style={styles.statLabel}>Days Active</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("MoodTracker")}>
          <Text style={styles.actionText}>Track Mood</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
        {posts.slice(0, 3).map((post) => (
          <View key={post.id} style={styles.activityItem}>
            <View style={[styles.modeIndicator, { backgroundColor: getModeColor(post.mode) }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityMode}>{post.mode.toUpperCase()}</Text>
              <Text style={styles.activityText} numberOfLines={2}>
                {post.content}
              </Text>
              <Text style={styles.activityDate}>{formatDate(post.timestamp)}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
  },
  scoreCard: {
    margin: 20,
    padding: 24,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00ff88",
  },
  scoreTitle: {
    fontSize: 16,
    color: "#00ff88",
    fontWeight: "bold",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    color: "#00ff88",
    fontWeight: "bold",
    marginBottom: 4,
  },
  scoreSubtext: {
    fontSize: 14,
    color: "#999",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: "2%",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  actionsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
  },
  actionArrow: {
    fontSize: 18,
    color: "#00ff88",
  },
  activitySection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  modeIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMode: {
    fontSize: 12,
    color: "#999",
    fontWeight: "bold",
    marginBottom: 4,
  },
  activityText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: "#666",
  },
})
