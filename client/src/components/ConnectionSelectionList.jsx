import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTime } from "../utils/timeUtils"
import ConnectionSelectionCard from "./ConnectionSelectionCard"
import { formatDuration } from "../utils/durationUtils"

function ConnectionSelectionList({ connections = [] }) {
  if (connections.length === 0) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verbindung wählen</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <p className="px-2 py-2 text-sm text-muted-foreground">
            Keine Verbindungen gefunden.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verbindung wählen</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="px-2 py-2">
          {connections.map((connection, index) => {
            const departure = connection.from || {}
            const arrival = connection.to || {}
            const products = connection.products || []
            const category =
              Array.isArray(products) && products.length > 0
                ? products.join(" | ")
                : "Zug"
            const departurePlatform = departure.platform || "-"
            const arrivalPlatform = arrival.platform || "-"

            return (
              <ConnectionSelectionCard
                key={`${connection.from?.departure || index}-${connection.to?.arrival || index}`}
                category={category}
                duration={formatDuration(connection.duration)}
                departureTime={formatTime(departure.departure)}
                departureStation={
                  departure.station?.name || departure.name || "-"
                }
                departurePlatform={departurePlatform}
                arrivalTime={formatTime(arrival.arrival)}
                arrivalStation={arrival.station?.name || arrival.name || "-"}
                arrivalPlatform={arrivalPlatform}
                transfers={Number(connection.transfers ?? 0)}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ConnectionSelectionList
