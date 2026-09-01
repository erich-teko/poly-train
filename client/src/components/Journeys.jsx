import JourneyCard from "./JourneyCard"
import { useAuth } from "/context/AuthContext"
import useSWR from "swr"

const fetchJourneys = async ([url, token]) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Reisen konnten nicht geladen werden.")
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}

function Journeys() {
  const { token } = useAuth()
  const { data = [], error, isLoading } = useSWR(
    token ? ["/api/journeys", token] : null,
    fetchJourneys
  )
  const journeys = data.toSorted((a, b) => {
    const startDateDiff = new Date(b.startDate) - new Date(a.startDate)
    return startDateDiff !== 0
      ? startDateDiff
      : new Date(b.endDate) - new Date(a.endDate)
  })

  return (
    <div className="w-full space-y-6">
      {isLoading ? (
        <p className="text-muted-foreground">Reisen werden geladen...</p>
      ) : error ? (
        <p className="text-destructive">{error.message}</p>
      ) : journeys.length === 0 ? (
        <p className="text-muted-foreground">Keine Reisen gefunden.</p>
      ) : (
        <p className="text-muted-foreground">Deine Reisen:</p>
      )}
      {journeys.length > 0 && (
        <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {journeys.map((journey) => (
            <JourneyCard key={journey._id} journey={journey} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Journeys
