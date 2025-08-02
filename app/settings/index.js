"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useApp } from "../../context/AppContext"

export default function SettingsScreen() {
  const { user, forceSync, syncing, isOnline, firebaseUser } = useApp()

  const handleForceSync = async () => {
    if (!isOnline) {
      Alert.alert("Offline", "You need an internet connection to sync data.")
      return
    }

    if (!firebaseUser) {
      Alert.alert("Not Connected", "Firebase authentication is not active.")
      return
    }

    try {
      await forceSync()
      Alert.alert("Sync Complete", "Your data has been synced with the cloud.")
    } catch (error) {
      Alert.alert("Sync Failed", "There was an error syncing your data. Please try again.")
    }
  }

  const handleClearData = () => {
    Alert.alert("Clear Data", "This will delete all your posts and progress. This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", onPress: () => {}, style: "destructive" },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SETTINGS</Text>
        <Text style={styles.subtitle}>Manage your account and data</Text>
      </View>

      {/* Connection Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONNECTION STATUS</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Internet</Text>
            <Text style={[styles.statusValue, { color: isOnline ? "#66bb6a" : "#ff6b6b" }]}>
              {isOnline ? "Connected" : "Offline"}
            </Text>
          </View>

          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Cloud Sync</Text>
            <Text style={[styles.statusValue, { color: firebaseUser ? "#66bb6a" : "#ff6b6b" }]}>
              {firebaseUser ? "Active" : "Inactive"}
            </Text>
          </View>

          {syncing && (
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Status</Text>
              <Text style={[styles.statusValue, { color: "#4ecdc4" }]}>Syncing...</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.syncButton, { opacity: syncing ? 0.5 : 1 }]}
          onPress={handleForceSync}
          disabled={syncing}
        >
          <Text style={styles.syncButtonText}>{syncing ? "Syncing..." : "Force Sync"}</Text>
        </TouchableOpacity>
      </View>

      {/* Account Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>User ID</Text>
          <Text style={styles.settingValue}>{user?.id || "Loading..."}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Firebase ID</Text>
          <Text style={styles.settingValue}>
            {firebaseUser?.uid ? `${firebaseUser.uid.substring(0, 8)}...` : "Not connected"}
          </Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Member Since</Text>
          <Text style={styles.settingValue}>
            {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "Today"}
          </Text>
        </View>
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DATA</Text>

        <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
          <Text style={styles.dangerText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Mantl v1.0.0</Text>
        <Text style={styles.footerSubtext}>Mental fitness for men</Text>
        <Text style={styles.footerSubtext}>
          {isOnline ? "🟢 Online" : "🔴 Offline"} •{firebaseUser ? " 🔄 Cloud Sync Active" : " 📱 Local Only"}
        </Text>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  syncButton: {
    backgroundColor: "#4ecdc4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  syncButtonText: {
    color: "#0f0f0f",
    fontSize: 16,
    fontWeight: "bold",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#fff",
  },
  settingValue: {
    fontSize: 16,
    color: "#999",
  },
  dangerButton: {
    backgroundColor: "#ff6b6b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  dangerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
})
