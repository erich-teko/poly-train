import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"
import { useNavigate } from "react-router-dom"

function JourneyCard({ journey }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const stagesCount = journey.stages.length
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/journey/${journey._id}`)
  }

  return (
    <Card
      className="flex flex-col overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick()
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-base">
              {journey.startLocation} → {journey.destinationLocation}
            </CardTitle>
          </div>
          <Map className="size-5 flex-shrink-0 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {formatDate(journey.startDate)} - {formatDate(journey.endDate)}
          <br />
            {stagesCount === 0 ? "Keine Etappen" : `${stagesCount} Etappen`}
        </p>
      </CardContent>
    </Card>
  )
}

export default JourneyCard
