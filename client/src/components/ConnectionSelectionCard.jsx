import { Train, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "/context/AuthContext"
import useSWR, { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import { fetcher, mutationFetcher } from "@/utils/fetcher"
import { toast } from "@/components/ui/toast"
import { formatDuration } from "@/utils/durationUtils"
import { formatTime } from "@/utils/timeUtils"

function ConnectionSelectionCard({ connection, index, journeyId }) {
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

  const departure = connection.from || {}
  const arrival = connection.to || {}
  const products = connection.products || []
  const category =
    Array.isArray(products) && products.length > 0
      ? products.join(" | ")
      : "Zug"
  const departurePlatform = departure.platform || "-"
  const arrivalPlatform = arrival.platform || "-"
  const key = `connection-${departure.departure}-${arrival.arrival}-${category}`
  const duration = formatDuration(connection?.duration)
  const departureTime = formatTime(departure.departure)
  const departureStation = departure.station?.name || departure.name || "-"
  const arrivalTime = formatTime(arrival.arrival)
  const arrivalStation = arrival.station?.name || arrival.name || "-"
  const transfers = Number(connection.transfers ?? 0)

  return (
    <Card className="mb-3 w-full rounded-xl border-border bg-card text-card-foreground shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Header: Zug-Typ & Dauer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Train className="h-5 w-5 stroke-[1.75] text-foreground" />
            <span>{category}</span>
          </div>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {duration}
          </span>
        </div>

        {/* Verbindungsinfos */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Abfahrt */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {departureTime}
            </span>
            <span
              className="max-w-[100px] truncate text-[10px] font-medium text-muted-foreground"
              title={departureStation}
            >
              {departureStation}
            </span>
            <span className="mt-0.5 text-[11px] text-muted-foreground/80">
              Gleis {departurePlatform}
            </span>
          </div>

          {/* Umstiege-Anzeige */}
          <div className="flex flex-col items-center px-2">
            {transfers === 0 ? (
              <span className="mb-1 text-[11px] font-medium text-emerald-500">
                Direkt
              </span>
            ) : (
              <span className="mb-1 text-[11px] text-muted-foreground/80">
                {transfers} Umstieg(e)
              </span>
            )}
            {transfers === 0 ? (
              <div className="relative flex h-3 w-16 items-center justify-center">
                <div className="h-[2px] w-12 bg-border" />
              </div>
            ) : (
              <div
                className="relative flex h-3 items-center justify-center"
                style={{
                  width: `${Math.max(56, (transfers - 1) * 20 + 8)}px`,
                }}
              >
                <div
                  className="h-[2px] bg-border"
                  style={{
                    width: `${Math.max(48, (transfers - 1) * 20)}px`,
                  }}
                />
                {Array.from({ length: transfers }, (_, index) => {
                  const spacing = 20
                  const offset =
                    index * spacing - ((transfers - 1) * spacing) / 2

                  return (
                    <div
                      key={index}
                      className={`absolute h-1.5 w-1.5 rounded-full bg-foreground/80 ${
                        index === transfers - 1 ? "opacity-100" : "opacity-70"
                      }`}
                      style={{
                        left: `calc(50% + ${offset}px - 0.375rem)`,
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Ankunft */}
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-foreground">
              {arrivalTime}
            </span>
            <span
              className="max-w-[100px] truncate text-right text-[10px] font-medium text-muted-foreground"
              title={arrivalStation}
            >
              {arrivalStation}
            </span>
            <span className="mt-0.5 text-[11px] text-muted-foreground/80">
              Gleis {arrivalPlatform}
            </span>
          </div>
        </div>

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
