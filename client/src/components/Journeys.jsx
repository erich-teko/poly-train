import { fetcher } from "../utils/fetcher"
import SkeletonCard from "./SkeletonCard"
import JourneyCard from "./JourneyCard"
import { useAuth } from "/context/AuthContext"
import useSWR from "swr"

function Journeys() {
  const { token } = useAuth()
  const {
    data = [],
    error,
    isLoading,
  } = useSWR(token ? ["/api/journeys", token] : null, fetcher)
  const journeys = data.toSorted((a, b) => {
    const startDateDiff = new Date(b.startDate) - new Date(a.startDate)
    return startDateDiff !== 0
      ? startDateDiff
      : new Date(b.endDate) - new Date(a.endDate)
  })

  return (
    <div className="w-full space-y-6">
      {isLoading ? (
        <>
          <p className="text-muted-foreground">Lade Reisen...</p>
          <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
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
