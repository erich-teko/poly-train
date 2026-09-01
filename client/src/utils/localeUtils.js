import * as dateFnsLocales from "date-fns/locale"

export function getClientLocale() {
  const browserLocale =
    typeof navigator !== "undefined" ? navigator.language : "de-CH"
  const [language, region] = browserLocale.split("-")
  const key = region ? language + region.toUpperCase() : language
  return dateFnsLocales[key] || dateFnsLocales[language] || dateFnsLocales.deCH
}
