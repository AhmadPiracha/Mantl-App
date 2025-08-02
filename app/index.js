"use client"

import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useApp } from "../context/AppContext"

const { width } = Dimensions.get("window")

export default function HomeScreen() {
  const { user, isFirstTime, loading } = useApp()
  const router = useRouter()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    // Wait for loading to complete before checking first time
    if (loading) return

    // Check if it's first time and redirect to onboarding
    if (isFirstTime) {
      console.log("First time user, redirecting to onboarding")
      router.replace("/onboarding")
      return
    }

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 17) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [isFirstTime, loading, router])

  // Show loading screen while initializing
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading Mantl...</Text>
      </View>
    )
  }

  // Don't render anything if redirecting to onboarding
  if (isFirstTime) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Setting up...</Text>
      </View>
    )
  }

  const quickActions = [
    {
      title: "Quick Vent",
      subtitle: "Release what's bothering you",
      color: "#ff6b6b",
      action: () => router.push({ pathname: "/create-post", params: { mode: "vent" } }),
    },
    {
      title: "Mood Check",
      subtitle: "How are you feeling?",
      color: "#4ecdc4",
      action: () => router.push("/mood-check"),
    },
    {
      title: "View Progress",
      subtitle: "See your mental fitness journey",
      color: "#45b7d1",
      action: () => router.push("/analytics"),
    },
  ]

  const modes = [
    {
      key: "vent",
      title: "Vent",
      description: "Release frustration & anger",
      color: "#ff6b6b",
      icon: "💨",
      route: "/vent",
    },
    {
      key: "unload",
      title: "Unload",
      description: "Process deeper emotions",
      color: "#ffa726",
      icon: "🎒",
      route: "/unload",
    },
    {
      key: "mantl",
      title: "mantl",
      description: "Build strength & growth",
      color: "#66bb6a",
      icon: "⚡",
      route: "/mantl",
    },
    {
      key: "locker",
      title: "Locker Room",
      description: "Connect & share progress",
      color: "#ab47bc",
      icon: "🤝",
      route: "/locker",
    },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>Ready to level up your mental game?</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.broScore || 0}</Text>
          <Text style={styles.statLabel}>Mental Points</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.totalEntries || 0}</Text>
          <Text style={styles.statLabel}>Entries</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard} onPress={action.action}>
              <View style={[styles.quickActionIndicator, { backgroundColor: action.color }]} />
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </View>
              <Text style={styles.quickActionArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Mode</Text>
        <Text style={styles.sectionSubtitle}>Each mode helps you process different types of emotions</Text>
        <View style={styles.modesGrid}>
          {modes.map((mode) => (
            <TouchableOpacity key={mode.key} style={styles.modeCard} onPress={() => router.push(mode.route)}>
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text style={[styles.modeTitle, { color: mode.color }]}>{mode.title}</Text>
              <Text style={styles.modeDescription}>{mode.description}</Text>
            </TouchableOpacity>
          ))}
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#4ecdc4",
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#a0a0a0",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#333",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#a0a0a0",
    marginBottom: 16,
  },
  quickActions: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
  },
  quickActionIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  quickActionArrow: {
    fontSize: 18,
    color: "#4ecdc4",
    fontWeight: "bold",
  },
  modesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  modeCard: {
    width: (width - 60) / 2,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 12,
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 16,
  },
})
