import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Train, NotepadText } from "lucide-react"

function StageCard({
  stageStart,
  stageEnd,
  startDate,
  endDate,
  note,
  _id,
  transfers,
  type,
}) {
  // Type configuration with icons and descriptions
  const typeConfig = {
    1: {
      icon: <Train className="h-5 w-5" />,
      title: "Verbindung",
      description: "Mein Reiseverlauf",
      layout: "connection",
    },
    2: {
      icon: <NotepadText className="h-5 w-5" />,
      title: "Notiz",
      description: "Meine Notiz",
      layout: "note",
    },
    // 3: {
    //   icon: <SomeIcon className="h-5 w-5" />,
    //   title: "Titel",
    //   description: "Beschreibung",
    //   layout: "connection",
    // },
  }

  const config = typeConfig[type] || typeConfig[1]

  // Calculate total travel time
  const calculateTravelTime = () => {
    if (!startDate || !endDate) return "Zeit nicht verfügbar"

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end - start

    if (diffMs < 0) return "Ungültige Zeit"

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours === 0) return `${minutes}min`
    return `${hours}h ${minutes}min`
  }

  const formatTime = (date) =>
    date
      ? new Date(date).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--"

  return (
    <Card className="w-full rounded-xl border-border bg-card text-card-foreground shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <CardHeader
        className={
          config.layout === "note"
            ? "bg-yellow-50 dark:bg-yellow-900"
            : "flex flex-row items-center justify-between p-4 pb-0"
        }
      >
        {config.layout === "note" ? (
          <>
            <CardTitle className="flex items-center gap-2">
              {config.icon}
              <span>{config.title}</span>
            </CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="flex items-center gap-2 text-base">
              <Train className="h-5 w-5 stroke-[1.75] text-foreground" />
              <span>{config.title}</span>
            </CardTitle>
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {calculateTravelTime()}
            </span>
          </>
        )}
      </CardHeader>
      <CardContent className={config.layout === "note" ? undefined : "p-4"}>
        <form>
          <div className="flex flex-col gap-6">
            {/* Note Layout */}
            {config.layout === "note" ? (
              <div className="flex items-stretch gap-4">
                {/* Start Station with Date/Time */}
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="startStation" className="text-xs">
                    Ort
                  </Label>
                  <div className="flex flex-col justify-center rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    <div className="text-sm font-medium">
                      {stageStart || "Nicht angegeben"}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {startDate
                        ? new Date(startDate).toLocaleString("de-DE", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Zeit nicht gesetzt"}
                    </div>
                  </div>
                </div>

                {/* Note Field */}
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="note" className="text-xs">
                    Notiz
                  </Label>
                  <div className="flex flex-col justify-center rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    <div className="text-sm">{note || "Keine Notiz"}</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Connection Layout */
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                {/* Start Station */}
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground">
                    {formatTime(startDate)}
                  </span>
                  <span
                    className="max-w-[140px] truncate text-[10px] font-medium text-muted-foreground"
                    title={stageStart}
                  >
                    {stageStart || "Nicht angegeben"}
                  </span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground/80">
                    {startDate
                      ? new Date(startDate).toLocaleDateString("de-DE")
                      : "Datum nicht gesetzt"}
                  </span>
                </div>

                {/* Connection Line */}
                <div className="flex flex-col items-center px-2">
                  {transfers === 0 ? (
                    <span className="mb-1 text-[11px] font-medium text-emerald-500">
                      Direkt
                    </span>
                  ) : (
                    <span className="mb-1 text-center text-[11px] text-muted-foreground/80">
                      {transfers !== undefined
                        ? `${transfers} Umstieg${transfers !== 1 ? "e" : ""}`
                        : "Keine Angabe"}
                    </span>
                  )}
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
                    {transfers > 0 &&
                      Array.from({ length: transfers }, (_, index) => {
                        const spacing = 20
                        const offset =
                          index * spacing - ((transfers - 1) * spacing) / 2

                        return (
                          <div
                            key={index}
                            className="absolute h-1.5 w-1.5 rounded-full bg-foreground/80"
                            style={{
                              left: `calc(50% + ${offset}px - 0.375rem)`,
                            }}
                          />
                        )
                      })}
                  </div>
                </div>

                {/* End Station */}
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-foreground">
                    {formatTime(endDate)}
                  </span>
                  <span
                    className="max-w-[140px] truncate text-right text-[10px] font-medium text-muted-foreground"
                    title={stageEnd}
                  >
                    {stageEnd || "Nicht angegeben"}
                  </span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground/80">
                    {endDate
                      ? new Date(endDate).toLocaleDateString("de-DE")
                      : "Datum nicht gesetzt"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default StageCard
