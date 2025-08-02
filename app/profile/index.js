"use client"

import { useRouter } from "expo-router"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useApp } from "../../context/AppContext"

export default function ProfileScreen() {
  const { user, posts, moodEntries } = useApp()
  const router = useRouter()

  const stats = [
    { label: "Current Streak", value: user?.currentStreak || 0, color: "#4ecdc4" },
    { label: "Longest Streak", value: user?.longestStreak || 0, color: "#66bb6a" },
    { label: "Total Posts", value: user?.totalPosts || 0, color: "#ffa726" },
    { label: "Mental Points", value: user?.broScore || 0, color: "#ab47bc" },
  ]

  const quickActions = [
    {
      title: "View Analytics",
      subtitle: "See your progress over time",
      action: () => router.push("/analytics"),
      color: "#4ecdc4",
    },
    {
      title: "Mood Check",
      subtitle: "Track how you're feeling",
      action: () => router.push("/mood-check"),
      color: "#66bb6a",
    },
    {
      title: "Settings",
      subtitle: "Manage your account",
      action: () => router.push("/settings"),
      color: "#ffa726",
    },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.subtitle}>Your mental fitness journey</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionCard} onPress={action.action}>
            <View style={[styles.actionIndicator, { backgroundColor: action.color }]} />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {posts && posts.length > 0 ? (
          posts.slice(0, 3).map((post) => (
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
          ))
        ) : (
          <View style={styles.emptyActivity}>
            <Text style={styles.emptyText}>No activity yet</Text>
            <Text style={styles.emptySubtext}>Start by creating your first post</Text>
          </View>
        )}
      </View>

      {/* Account Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>{user?.id || "Loading..."}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
            {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "Today"}
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const getModeColor = (mode) => {
  switch (mode) {
    case "vent":
      return "#ff6b6b"
    case "unload":
      return "#ffa726"
    case "mantl":
      return "#66bb6a"
    case "locker":
      return "#ab47bc"
    default:
      return "#666"
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  header: {
    padding: 24,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#a0a0a0",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  actionArrow: {
    fontSize: 18,
    color: "#4ecdc4",
    fontWeight: "bold",
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
  emptyActivity: {
    backgroundColor: "#1a1a1a",
    padding: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  infoValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
})
