import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ConnectionSelectionCard from "./ConnectionSelectionCard"
import SkeletonCard from "./SkeletonCard.jsx"

function ConnectionSelectionList({
  connections = [],
  error,
  isLoading = false,
  journeyId,
}) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Verbindung wählen</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex flex-col gap-3 px-2 py-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || connections.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Verbindung wählen</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <p className="px-2 py-2 text-sm text-muted-foreground">
            {error
              ? "Es konnte keine Verbindung gefunden werden."
              : "Keine Verbindungen gefunden."}
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
