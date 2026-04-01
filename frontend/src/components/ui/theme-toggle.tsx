import { Moon, Sun } from "lucide-react"

import { useTheme } from "../theme-provider"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"
  const nextTheme = isDark ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export default ThemeToggle
