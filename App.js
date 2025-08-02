import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { Text } from "react-native"

// Context Providers
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"

// Import screens
import HomeScreen from "./screens/HomeScreen"
import VentScreen from "./screens/VentScreen"
import UnloadScreen from "./screens/UnloadScreen"
import MantlScreen from "./screens/MantlScreen"
import LockerRoomScreen from "./screens/LockerRoomScreen"
import ProfileScreen from "./screens/ProfileScreen"
import CreatePostScreen from "./screens/CreatePostScreen"
import MoodTrackerScreen from "./screens/MoodTrackerScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#00ff88",
        tabBarInactiveTintColor: "#666",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Vent"
        component={VentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>💨</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Unload"
        component={UnloadScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🎒</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Mantl"
        component={MantlScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>⚡</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Locker"
        component={LockerRoomScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🤝</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// Main App
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#fff",
              cardStyle: { backgroundColor: "#000" },
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen
              name="MoodTracker"
              component={MoodTrackerScreen}
              options={{ headerShown: true, title: "Mood Check" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  )
}
