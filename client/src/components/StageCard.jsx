import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DateTimePicker from "./DateTimePicker"
import ButtonArrivalDeparture from "./ButtonArrivalDeparture"
import { Plus, Minus, Train, NotepadText, ChevronUp, ChevronDown } from "lucide-react"

function StageCard({
  stageStart,
  stageEnd,
  startDate,
  endDate,
  note,
  _id,
  transfers,
  type,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className={config.layout === "note" ? "bg-yellow-50 dark:bg-yellow-900" : ""}>
        <CardTitle className="flex items-center gap-2">
          {config.icon}
          <span>{config.title}</span>
        </CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
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
              <div className="flex items-stretch gap-4">
                {/* Start Station */}
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="startStation" className="text-xs">
                    Von
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

                {/* Connection Line */}
                <div className="flex flex-col items-center justify-center gap-1 py-2">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400"></div>
                  <div className="text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {calculateTravelTime()}
                  </div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400"></div>
                  <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                    {transfers !== undefined
                      ? `${transfers} Umstieg${transfers !== 1 ? "e" : ""}`
                      : "Keine Angabe"}
                  </div>
                </div>

                {/* End Station */}
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="endStation" className="text-xs">
                    Nach
                  </Label>
                  <div className="flex flex-col justify-center rounded-md border border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
                    <div className="text-sm font-medium">
                      {stageEnd || "Nicht angegeben"}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {endDate
                        ? new Date(endDate).toLocaleString("de-DE", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Zeit nicht gesetzt"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label="Element nach oben verschieben"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label="Element nach unten verschieben"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StageCard
