"use client"

import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useApp } from "../context/AppContext"

const MODE_TIPS = {
  vent: "Don't hold back. Use strong language if you need to. This is your space to release.",
  unload: "Take your time. Dig deeper into what's really bothering you. What's underneath the surface?",
  mantl: "Focus on growth. What did you learn? How are you getting stronger?",
  locker: "Be real with the community. Share your struggles and wins honestly.",
}

const getModeConfig = (mode) => {
  switch (mode) {
    case "vent":
      return {
        color: "#ff6b6b",
        placeholder: "What's eating at you? Let it out...",
        title: "VENT",
      }
    case "unload":
      return {
        color: "#ffa726",
        placeholder: "What weight are you carrying? Drop it here...",
        title: "UNLOAD",
      }
    case "mantl":
      return {
        color: "#66bb6a",
        placeholder: "Share your wins, growth, or insights...",
        title: "MANTL",
      }
    case "locker":
      return {
        color: "#ab47bc",
        placeholder: "Real talk. What's on your mind?",
        title: "LOCKER ROOM",
      }
    default:
      return {
        color: "#666",
        placeholder: "Share your thoughts...",
        title: "POST",
      }
  }
}

export default function CreatePostScreen() {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mode, prompt } = useLocalSearchParams()
  const { addPost } = useApp()

  const modeConfig = getModeConfig(mode)
  const tip = MODE_TIPS[mode] || MODE_TIPS.vent

  // Pre-fill with prompt if provided
  useState(() => {
    if (prompt && !content) {
      setContent(`${prompt}\n\n`)
    }
  }, [prompt])

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert("Hold up", "You gotta write something first.")
      return
    }

    setIsLoading(true)

    try {
      const post = {
        content: content.trim(),
        mode: mode || "vent",
      }

      addPost(post)

      // Show encouraging message
      const encouragement = getEncouragementMessage(mode, content.trim().split(/\s+/).length)
      Alert.alert("Posted ✓", encouragement, [{ text: "Done", onPress: () => router.back() }])
    } catch (error) {
      Alert.alert("Error", "Failed to save post. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getEncouragementMessage = (mode, wordCount) => {
    const messages = {
      vent: [
        "Good. Let it out. You'll feel better.",
        "That's what this space is for. Keep going.",
        "Sometimes you just need to scream into the void.",
      ],
      unload: [
        "Processing emotions takes courage. Well done.",
        "You're doing the hard work of self-awareness.",
        "Every unload makes room for better things.",
      ],
      mantl: [
        "Growth mindset in action. Keep building.",
        "You're forging mental strength every day.",
        "This is how champions think.",
      ],
      locker: [
        "Real recognize real. Thanks for sharing.",
        "The community is stronger with your voice.",
        "Vulnerability is strength.",
      ],
    }

    const modeMessages = messages[mode] || messages.vent
    const randomMessage = modeMessages[Math.floor(Math.random() * modeMessages.length)]

    if (wordCount > 100) {
      return `${randomMessage} +${Math.floor(wordCount / 10) * 5} points for the deep dive.`
    }
    return `${randomMessage} +10 points.`
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: modeConfig.color }]}>{modeConfig.title}</Text>
        <Text style={styles.subtitle}>{modeConfig.placeholder}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>{tip}</Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={modeConfig.placeholder}
            placeholderTextColor="#666"
            value={content}
            onChangeText={setContent}
            multiline
            autoFocus
            maxLength={2000}
            textAlignVertical="top"
          />
          <View style={styles.inputFooter}>
            <Text style={styles.charCount}>{content.length}/2000</Text>
            <Text style={styles.wordCount}>{content.trim().split(/\s+/).filter(Boolean).length} words</Text>
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={isLoading}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.postButton, { backgroundColor: modeConfig.color }]}
          onPress={handlePost}
          disabled={isLoading || !content.trim()}
        >
          <Text style={[styles.postText, { color: mode === "mantl" ? "#000" : "#fff" }]}>
            {isLoading ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
  },
  content: {
    flex: 1,
  },
  tipCard: {
    backgroundColor: "#1a1a1a",
    margin: 24,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4ecdc4",
  },
  tipText: {
    color: "#a0a0a0",
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  charCount: {
    color: "#666",
    fontSize: 12,
  },
  wordCount: {
    color: "#4ecdc4",
    fontSize: 12,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#333",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#333",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  postButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  postText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
