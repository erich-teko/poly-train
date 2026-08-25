import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"

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

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
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
