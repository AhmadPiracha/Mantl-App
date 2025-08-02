import { Text } from "react-native"

export function ThemeIcon({ name, focused }) {
  const getIcon = (name) => {
    switch (name) {
      case "home":
        return "🏠"
      case "vent":
        return "💨"
      case "unload":
        return "📦"
      case "mantl":
        return "🔨"
      case "locker":
        return "🏃"
      case "profile":
        return "👤"
      default:
        return "●"
    }
  }

  return (
    <Text
      style={{
        fontSize: 20,
        opacity: focused ? 1 : 0.6,
      }}
    >
      {getIcon(name)}
    </Text>
  )
}
