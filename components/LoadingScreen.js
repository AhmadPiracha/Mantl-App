"use client"

import { View, Text, StyleSheet, Image, Animated } from "react-native"
import { useEffect, useRef } from "react"

export function LoadingScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Fade in and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish?.()
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Use your custom logo */}
        <Image source={require("../assets/icon.png")} style={styles.logoImage} />

        <Text style={styles.title}>MANTL</Text>
        <Text style={styles.subtitle}>Mental Fitness for Men</Text>

        {/* Animated progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Preparing your journey...</Text>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 8,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    marginBottom: 60,
    textAlign: "center",
  },
  progressContainer: {
    width: 250,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ecdc4",
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})
