// Parse API date values while handling missing or invalid input.
export function parseApiDate(value) {
  if (!value) return null

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === "string") {
    const normalized = value.endsWith("Z")
      ? value.replace("Z", "+00:00")
      : value
    const parsed = new Date(normalized)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  return null
}
