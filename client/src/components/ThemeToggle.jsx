import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "@/components/theme-provider"
import { MoonIcon, SunIcon } from "lucide-react"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Toggle
      aria-label="Toggle dark mode"
      size="md"
      variant="default"
      pressed={isDarkMode}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
    >
      {isDarkMode ? (
        <MoonIcon className="group-aria-pressed/toggle:fill-foreground" />
      ) : (
        <SunIcon className="group-aria-pressed/toggle:fill-foreground" />
      )}
    </Toggle>
  )
}

export default ThemeToggle
