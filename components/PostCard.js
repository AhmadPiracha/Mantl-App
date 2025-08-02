import { View, Text, StyleSheet } from "react-native"

export function PostCard({ post, accentColor }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  const getMoodEmoji = (mode) => {
    switch (mode) {
      case "vent":
        return "💨"
      case "unload":
        return "🎒"
      case "mantl":
        return "⚡"
      case "locker":
        return "🤝"
      default:
        return "💭"
    }
  }

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.header}>
        <Text style={styles.modeEmoji}>{getMoodEmoji(post.mode)}</Text>
        <Text style={[styles.mode, { color: accentColor }]}>{post.mode.toUpperCase()}</Text>
        <View style={styles.spacer} />
        <Text style={styles.timestamp}>{formatTime(post.timestamp)}</Text>
        {!post.synced && <Text style={styles.syncStatus}>📱</Text>}
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.wordCount && (
        <View style={styles.footer}>
          <Text style={styles.wordCount}>{post.wordCount} words</Text>
          {post.synced && <Text style={styles.cloudIcon}>☁️</Text>}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modeEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  mode: {
    fontSize: 12,
    fontWeight: "bold",
  },
  spacer: {
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  syncStatus: {
    fontSize: 12,
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  wordCount: {
    fontSize: 12,
    color: "#4ecdc4",
    fontWeight: "600",
  },
  cloudIcon: {
    fontSize: 12,
  },
})
