import * as dateFnsLocales from "date-fns/locale"

// Return the browser locale used by date and calendar components.
export function getClientLocale() {
  const browserLocale =
    typeof navigator !== "undefined" ? navigator.language : "de-CH"
  const [language, region] = browserLocale.split("-")
  const key = region ? language + region.toUpperCase() : language
  return dateFnsLocales[key] || dateFnsLocales[language] || dateFnsLocales.deCH
}
