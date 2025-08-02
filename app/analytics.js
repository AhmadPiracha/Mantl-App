"use client"

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { useApp } from "../context/AppContext"
import { useEffect, useState } from "react"

const { width } = Dimensions.get("window")

export default function AnalyticsScreen() {
  const { user, moodEntries, posts, syncing } = useApp()
  const [analytics, setAnalytics] = useState({
    moodTrend: "stable",
    averageMood: 0,
    mostActiveMode: "None",
    weeklyPosts: 0,
  })

  useEffect(() => {
    calculateAnalytics()
  }, [moodEntries, posts])

  const calculateAnalytics = () => {
    // Calculate mood trend
    const moodTrend = getMoodTrend()

    // Calculate average mood
    const averageMood =
      moodEntries.length > 0 ? moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / moodEntries.length : 0

    // Find most active mode
    const modeCounts = posts.reduce((acc, post) => {
      acc[post.mode] = (acc[post.mode] || 0) + 1
      return acc
    }, {})
    const mostActiveMode = Object.keys(modeCounts).reduce((a, b) => (modeCounts[a] > modeCounts[b] ? a : b), "None")

    // Weekly posts
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weeklyPosts = posts.filter((post) => new Date(post.timestamp) > weekAgo).length

    setAnalytics({
      moodTrend,
      averageMood: averageMood.toFixed(1),
      mostActiveMode: mostActiveMode.charAt(0).toUpperCase() + mostActiveMode.slice(1),
      weeklyPosts,
    })
  }

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return "stable"

    const recent = moodEntries.slice(0, 3).map((entry) => entry.mood.value)
    const older = moodEntries.slice(3, 6).map((entry) => entry.mood.value)

    if (recent.length === 0 || older.length === 0) return "stable"

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length

    if (recentAvg > olderAvg + 0.5) return "improving"
    if (recentAvg < olderAvg - 0.5) return "declining"
    return "stable"
  }

  const getTrendMessage = () => {
    switch (analytics.moodTrend) {
      case "improving":
        return { text: "Your mood is trending upward! Keep doing what you're doing.", color: "#66bb6a" }
      case "declining":
        return { text: "Your mood has been lower lately. Consider using VENT or UNLOAD more often.", color: "#ff8a65" }
      default:
        return { text: "Your mood has been stable. Consistency is key to mental fitness.", color: "#4ecdc4" }
    }
  }

  const trendMessage = getTrendMessage()

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Mental Fitness Journey</Text>
        <Text style={styles.subtitle}>Data-driven insights into your emotional patterns</Text>
        {syncing && <Text style={styles.syncStatus}>🔄 Syncing with cloud...</Text>}
      </View>

      {/* Key Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
          <Text style={styles.statSubtext}>Keep it going!</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.totalEntries || 0}</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
          <Text style={styles.statSubtext}>Every entry counts</Text>
        </View>
      </View>

      {/* Mood Trend */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood Trend</Text>
        <View style={styles.trendCard}>
          <Text style={[styles.trendText, { color: trendMessage.color }]}>{trendMessage.text}</Text>
        </View>
      </View>

      {/* Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsNumber}>{analytics.averageMood}</Text>
            <Text style={styles.analyticsLabel}>Avg Mood</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsNumber}>{analytics.weeklyPosts}</Text>
            <Text style={styles.analyticsLabel}>Posts</Text>
          </View>
        </View>
      </View>

      {/* Recent Mood History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Check-ins</Text>
        {moodEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No mood data yet</Text>
            <Text style={styles.emptySubtext}>Start tracking your mood to see patterns</Text>
          </View>
        ) : (
          <View style={styles.historyContainer}>
            {moodEntries.slice(0, 7).map((entry, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyEmoji}>{entry.mood.emoji}</Text>
                <View style={styles.historyContent}>
                  <Text style={styles.historyMood}>{entry.mood.label}</Text>
                  <Text style={styles.historyDate}>{new Date(entry.timestamp).toLocaleDateString()}</Text>
                </View>
                <View style={[styles.stressIndicator, { backgroundColor: entry.stress.color }]} />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <View style={styles.insightsContainer}>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Most Used Mode</Text>
            <Text style={styles.insightValue}>{analytics.mostActiveMode}</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Mood Trend</Text>
            <Text style={styles.insightValue}>{analytics.moodTrend}</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  syncStatus: {
    fontSize: 14,
    color: "#4ecdc4",
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 12,
    color: "#a0a0a0",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  trendCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
  },
  trendText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  analyticsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  analyticsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: "#a0a0a0",
  },
  historyContainer: {
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
  },
  historyEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
  },
  historyMood: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  stressIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 32,
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
  insightsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  insightCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  insightTitle: {
    fontSize: 12,
    color: "#a0a0a0",
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
})
