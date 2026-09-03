export function formatDuration(duration) {
  if (!duration) return "-"

  if (typeof duration !== "string") {
    return String(duration)
  }

  const trimmed = duration.trim()

  const dayMatch = trimmed.match(/^(\d+)d(\d{2}):(\d{2}):(\d{2})$/i)
  if (dayMatch) {
    const days = Number(dayMatch[1])
    const hours = Number(dayMatch[2])
    const minutes = Number(dayMatch[3])
    const seconds = Number(dayMatch[4])
    const totalMinutes =
      days * 24 * 60 + hours * 60 + minutes + (seconds >= 30 ? 1 : 0)
    const displayHours = Math.floor(totalMinutes / 60)
    const displayMinutes = totalMinutes % 60

    if (displayHours === 0) return `${String(displayMinutes).padStart(2, "0")}m`
    return `${String(displayHours).padStart(2, "0")}h ${String(displayMinutes).padStart(2, "0")}m`
  }

  const timeMatch = trimmed.match(/^(\d+):(\d{2})(?::(\d{2}))?$/)
  if (timeMatch) {
    const hours = Number(timeMatch[1])
    const minutes = Number(timeMatch[2])
    const seconds = Number(timeMatch[3] || 0)
    const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0)
    const displayHours = Math.floor(totalMinutes / 60)
    const displayMinutes = totalMinutes % 60

    if (displayHours === 0) return `${String(displayMinutes).padStart(2, "0")}m`
    return `${String(displayHours).padStart(2, "0")}h ${String(displayMinutes).padStart(2, "0")}m`
  }

  return String(duration)
}
