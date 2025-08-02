"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { MODES } from "../constants/modes"

export function ModeSwitcher() {
  const router = useRouter()

  const handleModePress = (modeKey) => {
    router.push(`/${modeKey}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR MODE</Text>

      <View style={styles.modesGrid}>
        {Object.entries(MODES).map(([key, mode]) => (
          <TouchableOpacity
            key={key}
            style={[styles.modeCard, { borderColor: mode.color }]}
            onPress={() => handleModePress(key)}
          >
            <View style={[styles.modeIndicator, { backgroundColor: mode.color }]} />
            <Text style={[styles.modeName, { color: mode.color }]}>{mode.name}</Text>
            <Text style={styles.modeDescription}>{mode.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  modesGrid: {
    gap: 12,
  },
  modeCard: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#333",
  },
  modeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginBottom: 8,
  },
  modeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: "#999",
  },
})
