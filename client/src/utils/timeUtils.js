import { parseApiDate } from "./parseApiDateUtils"

export function formatTime(dateString) {
  const parsed = parseApiDate(dateString)
  if (!parsed) return "-"

  return new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsed)
}
