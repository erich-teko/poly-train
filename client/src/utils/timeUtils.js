import { parseApiDate } from "./parseApiDateUtils"

const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function formatTime(dateString) {
  const parsed = parseApiDate(dateString)
  if (!parsed) return "-"

  return new Intl.DateTimeFormat("de-CH", {
    timeZone: systemTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsed)
}

export function formatDate(dateString) {
  const parsed = parseApiDate(dateString)
  if (!parsed) return "-"

  return new Intl.DateTimeFormat("de-CH", {
    timeZone: systemTimeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed)
}
