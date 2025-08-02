"use client"

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { useApp } from "../context/AppContext"

const MOODS = [
  {
    emoji: "💪",
    label: "Strong",
    value: 5,
    color: "#66bb6a",
    description: "Feeling confident and in control",
  },
  {
    emoji: "😊",
    label: "Good",
    value: 4,
    color: "#4ecdc4",
    description: "Generally positive and stable",
  },
  {
    emoji: "😐",
    label: "Neutral",
    value: 3,
    color: "#ffa726",
    description: "Neither good nor bad, just okay",
  },
  {
    emoji: "😔",
    label: "Low",
    value: 2,
    color: "#ff8a65",
    description: "Feeling down or discouraged",
  },
  {
    emoji: "😤",
    label: "Rough",
    value: 1,
    color: "#ff6b6b",
    description: "Struggling or overwhelmed",
  },
]

const STRESS_LEVELS = [
  { label: "No stress", value: 1, color: "#66bb6a" },
  { label: "Mild stress", value: 2, color: "#4ecdc4" },
  { label: "Moderate stress", value: 3, color: "#ffa726" },
  { label: "High stress", value: 4, color: "#ff8a65" },
  { label: "Overwhelming", value: 5, color: "#ff6b6b" },
]

export default function MoodCheckScreen() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedStress, setSelectedStress] = useState(null)
  const router = useRouter()
  const { addMoodEntry } = useApp()

  const handleSave = async () => {
    if (!selectedMood || !selectedStress) {
      Alert.alert("Almost there", "Please select both your mood and stress level.")
      return
    }

    try {
      await addMoodEntry({
        mood: selectedMood,
        stress: selectedStress,
        timestamp: new Date().toISOString(),
      })

      const encouragement = getMoodEncouragement(selectedMood.value, selectedStress.value)

      Alert.alert("Mood Tracked ✓", encouragement, [{ text: "Continue", onPress: () => router.back() }])
    } catch (error) {
      Alert.alert("Error", "Failed to save mood check. Please try again.")
    }
  }

  const getMoodEncouragement = (mood, stress) => {
    if (mood >= 4 && stress <= 2) {
      return "You're crushing it! Keep up the great work."
    } else if (mood <= 2 || stress >= 4) {
      return "Tough times don't last, but tough people do. Consider using VENT or UNLOAD to process these feelings."
    } else {
      return "Every check-in builds self-awareness. You're doing the work."
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling right now?</Text>
        <Text style={styles.subtitle}>Be honest. This helps you track patterns over time.</Text>
      </View>

      {/* Mood Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Mood</Text>
        <View style={styles.optionsContainer}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodOption,
                selectedMood?.value === mood.value && [styles.selectedOption, { borderColor: mood.color }],
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
              <Text style={styles.moodDescription}>{mood.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stress Level */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stress Level</Text>
        <View style={styles.stressContainer}>
          {STRESS_LEVELS.map((stress) => (
            <TouchableOpacity
              key={stress.value}
              style={[
                styles.stressOption,
                selectedStress?.value === stress.value && [styles.selectedStress, { backgroundColor: stress.color }],
              ]}
              onPress={() => setSelectedStress(stress)}
            >
              <Text style={[styles.stressLabel, selectedStress?.value === stress.value && styles.selectedStressText]}>
                {stress.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, (!selectedMood || !selectedStress) && styles.disabledButton]}
          onPress={handleSave}
          disabled={!selectedMood || !selectedStress}
        >
          <Text style={styles.saveText}>Save Check-in</Text>
        </TouchableOpacity>
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
    lineHeight: 22,
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
  optionsContainer: {
    gap: 12,
  },
  moodOption: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  moodDescription: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  stressContainer: {
    gap: 8,
  },
  stressOption: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  selectedStress: {
    backgroundColor: "#4ecdc4",
  },
  stressLabel: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
  },
  selectedStressText: {
    color: "#0f0f0f",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4ecdc4",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#333",
  },
  saveText: {
    color: "#0f0f0f",
    fontSize: 16,
    fontWeight: "bold",
  },
})
