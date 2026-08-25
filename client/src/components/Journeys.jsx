import { useEffect, useState } from "react"
import JourneyCard from "./JourneyCard"
import { useAuth } from "/context/AuthContext"

function Journeys() {
  const { token } = useAuth()
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await fetch("/api/journeys", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          console.error(
            "Error fetching journeys:",
            response.status,
            response.statusText
          )
          setJourneys([])
          return
        }

        const data = await response.json()
        const journeysArray = Array.isArray(data) ? data : []

        setJourneys(
          journeysArray.toSorted((a, b) => {
            const startDateDiff = new Date(b.startDate) - new Date(a.startDate)
            return startDateDiff !== 0
              ? startDateDiff
              : new Date(b.endDate) - new Date(a.endDate)
          })
        )
      } catch (error) {
        setJourneys([])
      }
    }
    fetchJourneys()
  }, [])

  return (
    <div className="w-full space-y-6">
      {journeys.length === 0 ? (
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
