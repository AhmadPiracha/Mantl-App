"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useApp } from "../context/AppContext"
import { useNavigation } from "@react-navigation/native"

const MOODS = [
  { emoji: "💪", label: "Strong", value: 5 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😤", label: "Rough", value: 1 },
]

export default function MoodTrackerScreen() {
  const [selectedMood, setSelectedMood] = useState(null)
  const { addMoodEntry } = useApp()
  const navigation = useNavigation()

  const handleSaveMood = () => {
    if (!selectedMood) {
      Alert.alert("Pick one", "Select how you're feeling right now.")
      return
    }

    addMoodEntry({
      mood: selectedMood.label,
      value: selectedMood.value,
      emoji: selectedMood.emoji,
    })

    Alert.alert("Tracked ✓", "Mood logged. Keep the streak going.", [
      { text: "Done", onPress: () => navigation.goBack() },
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HOW ARE YOU FEELING?</Text>
        <Text style={styles.subtitle}>Be honest. It helps.</Text>
      </View>

      <View style={styles.moodGrid}>
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[styles.moodButton, selectedMood?.value === mood.value && styles.selectedMood]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, !selectedMood && styles.disabledButton]}
          onPress={handleSaveMood}
          disabled={!selectedMood}
        >
          <Text style={styles.saveText}>Save Mood</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
  },
  moodGrid: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  moodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedMood: {
    borderColor: "#00ff88",
    backgroundColor: "#002211",
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  moodLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#333",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: "#00ff88",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#333",
  },
  saveText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
})
