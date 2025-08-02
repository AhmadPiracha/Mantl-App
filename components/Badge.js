import { View, Text, StyleSheet } from "react-native"

export function Badge({ badge, earned = false }) {
  return (
    <View style={[styles.container, earned && styles.earnedContainer]}>
      <Text style={[styles.icon, !earned && styles.lockedIcon]}>{badge.icon}</Text>
      <Text style={[styles.name, !earned && styles.lockedText]}>{badge.name}</Text>
      <Text style={[styles.description, !earned && styles.lockedText]}>{badge.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
    marginBottom: 8,
    marginRight: "2%",
    opacity: 0.5,
  },
  earnedContainer: {
    opacity: 1,
    borderWidth: 2,
    borderColor: "#00ff88",
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  lockedIcon: {
    opacity: 0.3,
  },
  name: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  description: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
  lockedText: {
    color: "#666",
  },
})
