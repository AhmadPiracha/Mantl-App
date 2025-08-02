import { View, Text, StyleSheet } from "react-native"

export function Header({ title, subtitle, color = "#fff" }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    lineHeight: 22,
  },
})
