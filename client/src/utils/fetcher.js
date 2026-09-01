async function readJson(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function fetcher([url, token]) {
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const data = await readJson(response)

  if (!response.ok) {
    const error = new Error(data?.error || "Die Daten konnten nicht geladen werden.")
    error.status = response.status
    throw error
  }

  return data
}

export async function mutationFetcher([url, token], { arg }) {
  const { method = "POST", body } = arg ?? {}

  const response = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await readJson(response)

  if (!response.ok) {
    const error = new Error(data?.error || "Die Anfrage konnte nicht verarbeitet werden.")
    error.status = response.status
    throw error
  }

  return data
}
