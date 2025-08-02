"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useApp } from "../context/AppContext"
import { useNavigation, useRoute } from "@react-navigation/native"


export default function CreatePostScreen() {
  const [content, setContent] = useState("")
  const { addPost } = useApp()
  const navigation = useNavigation()
  const route = useRoute()
  const { mode } = route.params

  const getModeConfig = (mode) => {
    switch (mode) {
      case "vent":
        return {
          color: "#ff4444",
          placeholder: "What's eating at you? Let it out...",
          title: "VENT",
        }
      case "unload":
        return {
          color: "#ff8800",
          placeholder: "What weight are you carrying? Drop it here...",
          title: "UNLOAD",
        }
      case "mantl":
        return {
          color: "#00ff88",
          placeholder: "Share your wins, growth, or insights...",
          title: "MANTL",
        }
      case "locker":
        return {
          color: "#8844ff",
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

  const config = getModeConfig(mode)

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert("Hold up", "You gotta write something first.")
      return
    }

    addPost({
      content: content.trim(),
      mode,
    })

    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: config.color }]}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.placeholder}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={config.placeholder}
          placeholderTextColor="#666"
          value={content}
          onChangeText={setContent}
          multiline
          autoFocus
          maxLength={500}
        />
        <Text style={styles.charCount}>{content.length}/500</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.postButton, { backgroundColor: config.color }]} onPress={handlePost}>
          <Text style={[styles.postText, { color: mode === "mantl" ? "#000" : "#fff" }]}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
  },
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
    lineHeight: 24,
  },
  charCount: {
    textAlign: "right",
    color: "#666",
    fontSize: 12,
    marginTop: 8,
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
  postButton: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  postText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
