import { useNavigation } from "@react-navigation/native"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useApp } from "../context/AppContext"

export default function HomeScreen() {
  const { user, posts, moodEntries } = useApp()
  const navigation = useNavigation()

  const quickActions = [
    {
      title: "Quick Vent",
      subtitle: "Release what's bothering you",
      color: "#ff4444",
      action: () => navigation.navigate("CreatePost", { mode: "vent" }),
    },
    {
      title: "Mood Check",
      subtitle: "How are you feeling?",
      color: "#00ff88",
      action: () => navigation.navigate("MoodTracker"),
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Ready to level up?</Text>
        <Text style={styles.subtitle}>Your mental fitness journey</Text>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.broScore || 0}</Text>
          <Text style={styles.statLabel}>BroScore</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{posts?.length || 0}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
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
    color: "#00ff88",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
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
    height: 40,
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
    color: "#999",
  },
  actionArrow: {
    fontSize: 18,
    color: "#00ff88",
    fontWeight: "bold",
  },
})
