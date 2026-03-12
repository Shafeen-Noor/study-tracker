import { createContext, useContext, useState, useMemo } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error("useThemeMode must be used inside ThemeModeProvider")
  return context
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: { main: "#9188f1" },
        },
      }),
    [isDarkMode],
  )

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
