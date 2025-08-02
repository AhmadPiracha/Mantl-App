// Centralized color definitions for the app
export const COLORS = {
  // Brand colors
  primary: "#00ff88",
  background: "#000000",
  surface: "#1a1a1a",
  border: "#333333",

  // Mode colors
  modes: {
    vent: "#EF4444", // Red
    unload: "#F59E0B", // Amber
    mantl: "#3B82F6", // Blue
    locker: "#10B981", // Green
  },

  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "#999999",
    tertiary: "#666666",
    disabled: "#444444",
  },

  // Status colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Gradients
  gradients: {
    primary: ["#00ff88", "#00cc6a"],
    dark: ["#1a1a1a", "#000000"],
  },
}

// Helper function to get mode color
export const getModeColor = (mode) => {
  return COLORS.modes[mode] || COLORS.text.tertiary
}

// Helper function for opacity variations
export const withOpacity = (color, opacity) => {
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`
}
