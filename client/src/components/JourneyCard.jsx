import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "@/utils/dateUtils"
import { getClientLocale } from "@/utils/localeUtils"

function JourneyCard({ journey }) {
  const locale = getClientLocale()
  const stagesCount = journey.stages.length
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/journey/${journey._id}`)
  }

  return (
    <Card
      className="flex cursor-pointer flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
          {formatDate(locale, journey.startDate)} - {formatDate(locale, journey.endDate)}
          <br />
          {stagesCount === 0 ? "Keine Etappen" : `${stagesCount} Etappen`}
        </p>
      </CardContent>
    </Card>
  )
}

export default JourneyCard
