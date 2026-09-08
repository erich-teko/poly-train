import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTime } from "../utils/timeUtils"
import ConnectionSelectionCard from "./ConnectionSelectionCard"
import { formatDuration } from "../utils/durationUtils"

function ConnectionSelectionList({ connections = [], journeyId }) {
  if (connections.length === 0) {
    return (
      <Card className="w-full">
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verbindung wählen</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="px-2 py-2">
          {connections.map((connection, index) => {
            return (
              <ConnectionSelectionCard
                key={`${connection.from?.departure}-${connection.to?.arrival}-${index}`}
                connection={connection}
                index={index}
                journeyId={journeyId}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ConnectionSelectionList
