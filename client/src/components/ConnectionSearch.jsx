import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toLocalDateString } from "@/utils/dateUtils"
import { fetcher } from "@/utils/fetcher"
import { ArrowUpDown, X } from "lucide-react"
import { useState } from "react"
import useSWR from "swr"
import { formatTime } from "../utils/timeUtils"
import ButtonArrivalDeparture from "./ButtonArrivalDeparture"
import DateTimePicker from "./DateTimePicker"
import { Skeleton } from "./ui/skeleton"
import { useAuth } from "/context/AuthContext"

function useStationSuggestions(query, token) {
  const shouldSearch = query && query.length > 2
  const params = new URLSearchParams(shouldSearch ? { station: query } : {})
  const { data = [], isValidating } = useSWR(
    token && shouldSearch
      ? [`/api/public-transport/stations?${params}`, token]
      : null,
    fetcher
  )
  // clear stale suggestions while a new search is in-flight
  return isValidating ? [] : data.filter((item) => item.id != null)
}

function ConnectionSearch({
  onSearch,
  isSearching = false,
  resultCount = null,
}) {
  const { token } = useAuth()
  const [startStation, setStartStation] = useState("")
  const [endStation, setEndStation] = useState("")
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(formatTime(new Date()))
  const [isArrivalTime, setIsArrivalTime] = useState(false)
  const [error, setError] = useState("")
  const startStationSuggestions = useStationSuggestions(startStation, token)
  const endStationSuggestions = useStationSuggestions(endStation, token)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!startStation.trim() || !endStation.trim()) {
      setError("Bitte Start- und Zielbahnhof eingeben.")
      return
    }

    setError("")

    const params = new URLSearchParams({
      startStation: startStation.trim(),
      endStation: endStation.trim(),
      travelDate: date ? toLocalDateString(date) : "",
      travelTime: time,
      isArrivalTime: String(isArrivalTime),
    })

    onSearch?.(params.toString())
  }

  const onSwitchStation = () => {
    const startStationTemp = startStation
    setStartStation(endStation)
    setEndStation(startStationTemp)
  }
  const isSwitchStationDisabled = !startStation || !endStation

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verbindung Suchen</CardTitle>
        <CardDescription>
          Fahsplanauskünften aus dem schweizerischen Umland
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSearching} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="startStation">Von (Startbahnhof)</Label>
              <div className="relative">
                <Input
                  id="startStation"
                  type="text"
                  placeholder="Luzern"
                  value={startStation}
                  onChange={(event) => setStartStation(event.target.value)}
                  list="startStationSuggestions"
                  className="pr-8"
                  required
                />
                {startStation && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-0 size-7 -translate-y-1/2 border-none shadow-none"
                    onClick={() => setStartStation("")}
                  >
                    <X className="size-3.5" />
                  </Button>
                )}
              </div>
              <datalist id="startStationSuggestions">
                {startStationSuggestions.map((suggestion, index) => (
                  <option key={suggestion.id} value={suggestion.name} />
                ))}
              </datalist>
            </div>
            <div className="-my-3 flex justify-center">
              <Button
                onClick={onSwitchStation}
                type="button"
                variant="ghost"
                size="icon"
                className="border-none shadow-none"
                disabled={isSwitchStationDisabled}
              >
                <ArrowUpDown className="size-5" />
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endStation">Nach (Zielbahnhof)</Label>
              <div className="relative">
                <Input
                  id="endStation"
                  type="text"
                  placeholder="Hamburg Hbf"
                  value={endStation}
                  onChange={(event) => setEndStation(event.target.value)}
                  list="endStationSuggestions"
                  className="pr-8"
                  required
                />
                {endStation && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-0 size-7 -translate-y-1/2 border-none shadow-none"
                    onClick={() => setEndStation("")}
                  >
                    <X className="size-3.5" />
                  </Button>
                )}
              </div>
              <datalist id="endStationSuggestions">
                {endStationSuggestions.map((suggestion, index) => (
                  <option key={suggestion.id} value={suggestion.name} />
                ))}
              </datalist>
            </div>
            <DateTimePicker
              date={date}
              time={time}
              onDateChange={setDate}
              onTimeChange={setTime}
            />
            <ButtonArrivalDeparture
              value={isArrivalTime ? "arrival" : "departure"}
              onChange={(value) => setIsArrivalTime(value === "arrival")}
            />

            <div className="flex min-h-5 items-center">
              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : isSearching ? (
                <Skeleton className="h-5 w-full rounded-md bg-muted" />
              ) : resultCount !== null ? (
                <p className="text-sm text-muted-foreground">
                  {resultCount} Verbindung(en) gefunden.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">&nbsp;</p>
              )}
            </div>

            <CardFooter className="flex-col gap-2 border-0 p-0">
              <Button type="submit" className="w-full" disabled={isSearching}>
                {isSearching ? "Suche läuft..." : "Verbindungen Suchen"}
              </Button>
            </CardFooter>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  )
}

export default ConnectionSearch
