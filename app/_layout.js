"use client"

import { Tabs } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { Text } from "react-native"
import { AppProvider } from "../context/AppContext"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources here
        console.log("App is preparing...")

        // Simulate loading time (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen once the app is ready
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null // This keeps the native splash screen visible
  }

  return (
    <AppProvider>
      <StatusBar style="light" backgroundColor="#0f0f0f" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1a1a1a",
            borderTopColor: "#333",
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: "#4ecdc4",
          tabBarInactiveTintColor: "#666",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
          headerStyle: {
            backgroundColor: "#1a1a1a",
          },
          headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="vent/index"
          options={{
            title: "Vent",
            tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>💨</Text>,
          }}
        />
        <Tabs.Screen
          name="unload/index"
          options={{
            title: "Unload",
            tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🎒</Text>,
          }}
        />
        <Tabs.Screen
          name="forge/index"
          options={{
            title: "Mantle",
            tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>⚡</Text>,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>👤</Text>,
          }}
        />

        {/* Hidden screens */}
        <Tabs.Screen name="create-post" options={{ href: null, title: "New Entry" }} />
        <Tabs.Screen name="mood-check" options={{ href: null, title: "Mood Check" }} />
        <Tabs.Screen name="analytics" options={{ href: null, title: "Analytics" }} />
        <Tabs.Screen
          name="onboarding"
          options={{
            href: null,
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen name="settings/index" options={{ href: null, title: "Settings" }} />
        <Tabs.Screen name="locker/index" options={{ href: null }} />
      </Tabs>
    </AppProvider>
  )
}
