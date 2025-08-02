"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const MOODS = [
  { emoji: "💪", label: "Strong", value: 5 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😤", label: "Rough", value: 1 },
]

export function MoodTracker({ compact = false }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const { updateMoodStreak } = useAuth()

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood)
    await updateMoodStreak(mood)
  }

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Text style={styles.compactTitle}>Quick mood check</Text>
        <View style={styles.compactMoods}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[styles.compactMoodButton, selectedMood?.value === mood.value && styles.selectedCompactMood]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={styles.compactMoodEmoji}>{mood.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOW ARE YOU FEELING?</Text>
      <Text style={styles.subtitle}>Be honest. It helps.</Text>

      <View style={styles.moodGrid}>
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[styles.moodButton, selectedMood?.value === mood.value && styles.selectedMood]}
            onPress={() => handleMoodSelect(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  moodGrid: {
    gap: 12,
  },
  moodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedMood: {
    borderColor: "#00ff88",
    backgroundColor: "#002211",
  },
  moodEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  moodLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  compactContainer: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  compactTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  compactMoods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compactMoodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCompactMood: {
    borderColor: "#00ff88",
    backgroundColor: "#002211",
  },
  compactMoodEmoji: {
    fontSize: 20,
  },
})
