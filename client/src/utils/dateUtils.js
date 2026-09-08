import { format } from "date-fns"

export function formatDate(locale, dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

// Formats using local date parts (unlike toISOString, avoids shifting to the previous/next day in non-UTC timezones)
export function toLocalDateString(date) {
  return format(date, "yyyy-MM-dd")
}
