"use client"

import { createContext, useContext } from "react"
import { THEME } from "../constants/theme"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={{ theme: THEME }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
