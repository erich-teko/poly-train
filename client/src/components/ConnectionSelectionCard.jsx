import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "/context/AuthContext"
import useSWR, { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import { fetcher, mutationFetcher } from "@/utils/fetcher"
import { toast } from "@/components/ui/toast"
import ConnectionInfo from "./ConnectionInfo"

// Show one connection and allow it to be added to a journey.
function ConnectionSelectionCard({ connection, journeyId }) {
  const { token } = useAuth()
  const { mutate } = useSWRConfig()
  const journeyUrl = `/api/journeys/${journeyId}`
  const { data: journey } = useSWR(
    token && journeyId ? [journeyUrl, token] : null,
    fetcher
  )
  const { trigger: save, isMutating } = useSWRMutation(
    token ? [journeyUrl, token] : null,
    mutationFetcher
  )

  // Append the selected connection as a new journey stage.
  const onAddConnection = async () => {
    if (!journey) return

    const newStage = {
      type: 0,
      stageStart: connection.from.station?.name || connection.from.name || "-",
      stageEnd: connection.to.station?.name || connection.to.name || "-",
      startDate: connection.from.departure,
      endDate: connection.to.arrival,
      note: "",
      trainConnection: connection,
    }

    try {
      await save({
        method: "PUT",
        body: {
          ...journey,
          stages: [...(journey.stages || []), newStage],
        },
      })

      await mutate([`/api/journeys/${journeyId}`, token])
    } catch (error) {
      toast.add({
        title: journeyId
          ? "Fehler beim Aktualisieren der Reise"
          : "Fehler beim Erstellen der Reise",
        description:
          error?.message ?? "Die Reise konnte nicht gespeichert werden.",
        type: "error",
      })
    }
  }

  return (
    <Card className="mb-3 w-full rounded-xl border-border bg-card text-card-foreground shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <CardContent className="flex flex-col gap-4 p-4">
        <ConnectionInfo connection={connection} />

        {/* Button */}
        <Button
          variant="outline"
          onClick={onAddConnection}
          disabled={isMutating || !journey}
          className="mt-1 h-9 w-full border-border bg-transparent font-medium text-foreground hover:bg-accent"
        >
          <Plus className="mr-1.5 h-4 w-4 text-muted-foreground" />
          Zu Reise hinzufügen
        </Button>
      </CardContent>
    </Card>
  )
}
export default ConnectionSelectionCard
