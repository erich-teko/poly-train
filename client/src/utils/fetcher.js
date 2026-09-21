async function readJson(response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

// Fetch JSON data and convert HTTP errors into useful exceptions.
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

// Send a JSON API mutation using the requested HTTP method.
export async function mutationFetcher([url, token], { arg }) {
  const { method = "POST", body, params } = arg ?? {}
  const requestUrl = params ? `${url}?${params.toString()}` : url

  const response = await fetch(requestUrl, {
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
