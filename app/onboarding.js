"use client"

import { useRouter } from "expo-router"
import { useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useApp } from "../context/AppContext"

const { width } = Dimensions.get("window")

const onboardingSteps = [
  {
    title: "Welcome to Mantl",
    subtitle: "Mental fitness designed for men",
    description:
      "We get it. Traditional therapy isn't for everyone. Mantl gives you practical tools to manage stress, process emotions, and build mental strength - without the fluff.",
    icon: "💪",
  },
  {
    title: "Why Mental Fitness Matters",
    subtitle: "Your mind is like a muscle",
    description:
      "Just like physical fitness, mental fitness requires regular training. Studies show that emotional processing reduces stress by 40% and improves decision-making.",
    icon: "🧠",
  },
  {
    title: "The 4 Modes System",
    subtitle: "Different tools for different situations",
    description:
      "VENT for quick release, UNLOAD for deeper processing, mantl for growth, and LOCKER ROOM for peer support. Each mode targets specific emotional needs.",
    icon: "🎯",
  },
  {
    title: "Track Your Progress",
    subtitle: "See real results",
    description:
      "Build streaks, earn points, and watch your mental fitness improve over time. We'll show you patterns in your mood and stress levels.",
    icon: "📈",
  },
  {
    title: "You're In Control",
    subtitle: "Private, secure, and judgment-free",
    description:
      "Your data stays on your device. No therapists, no appointments, no judgment. Just you building mental strength on your own terms.",
    icon: "🔒",
  },
]

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const { completeOnboarding } = useApp()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
      router.replace("/")
    }
  }

  const handleSkip = () => {
    completeOnboarding()
    router.replace("/")
  }

  const step = onboardingSteps[currentStep]

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {onboardingSteps.map((_, index) => (
          <View key={index} style={[styles.progressDot, index <= currentStep && styles.progressDotActive]} />
        ))}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.icon}>{step.icon}</Text>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.subtitle}>{step.subtitle}</Text>
        <Text style={styles.description}>{step.description}</Text>

        {/* Special content for modes step */}
        {currentStep === 2 && (
          <View style={styles.modesPreview}>
            {[
              { name: "VENT", color: "#ff6b6b", desc: "Quick emotional release" },
              { name: "UNLOAD", color: "#ffa726", desc: "Process deeper issues" },
              { name: "mantl", color: "#66bb6a", desc: "Build strength & growth" },
              { name: "LOCKER", color: "#ab47bc", desc: "Peer support" },
            ].map((mode, index) => (
              <View key={index} style={styles.modePreviewCard}>
                <View style={[styles.modePreviewIndicator, { backgroundColor: mode.color }]} />
                <View>
                  <Text style={styles.modePreviewName}>{mode.name}</Text>
                  <Text style={styles.modePreviewDesc}>{mode.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 1,
  },
  skipText: {
    color: "#a0a0a0",
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 40,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  progressDotActive: {
    backgroundColor: "#4ecdc4",
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#4ecdc4",
    textAlign: "center",
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  modesPreview: {
    width: "100%",
    gap: 12,
  },
  modePreviewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
  },
  modePreviewIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 16,
  },
  modePreviewName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 2,
  },
  modePreviewDesc: {
    fontSize: 12,
    color: "#a0a0a0",
  },
  bottomActions: {
    padding: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: "#4ecdc4",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f0f0f",
  },
})
