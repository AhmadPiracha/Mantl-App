import { View, Text, StyleSheet } from "react-native"

export function BroScore({ score, large = false }) {
  return (
    <View style={[styles.container, large && styles.largeContainer]}>
      <Text style={[styles.title, large && styles.largeTitle]}>BROSCORE</Text>
      <Text style={[styles.score, large && styles.largeScore]}>{score}</Text>
      <Text style={[styles.subtitle, large && styles.largeSubtitle]}>Keep grinding</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00ff88",
    marginBottom: 16,
  },
  largeContainer: {
    margin: 20,
    padding: 24,
  },
  title: {
    fontSize: 14,
    color: "#00ff88",
    fontWeight: "bold",
    marginBottom: 4,
  },
  largeTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  score: {
    fontSize: 32,
    color: "#00ff88",
    fontWeight: "bold",
    marginBottom: 2,
  },
  largeScore: {
    fontSize: 48,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
  },
  largeSubtitle: {
    fontSize: 14,
  },
})
