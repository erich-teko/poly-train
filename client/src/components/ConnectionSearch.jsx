import { useState } from "react"
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
import { useAuth } from "/context/AuthContext"
import DateTimePicker from "./DateTimePicker"
import ButtonArrivalDeparture from "./ButtonArrivalDeparture"

function ConnectionSearch({ onConnectionsFound }) {
  const { token } = useAuth()
  const [startStation, setStartStation] = useState("")
  const [endStation, setEndStation] = useState("")
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState("10:30")
  const [isArrivalTime, setIsArrivalTime] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resultCount, setResultCount] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!startStation.trim() || !endStation.trim()) {
      setError("Bitte Start- und Zielbahnhof eingeben.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams({
        startStation: startStation.trim(),
        endStation: endStation.trim(),
        travelDate: date ? date.toISOString().slice(0, 10) : "",
        travelTime: time,
        isArrivalTime: String(isArrivalTime),
      })

      const response = await fetch(
        `/api/public-transport/connections?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData?.error ||
            "Der Fahrplanservice ist momentan nicht erreichbar."
        )
      }

      const data = await response.json().catch(() => null)

      if (!Array.isArray(data)) {
        throw new Error("Der Fahrplanservice ist momentan nicht erreichbar.")
      }

      const connections = data
      setResultCount(connections.length)
      onConnectionsFound?.(connections)
      console.log("Verbindungen gefunden:", connections)
    } catch (fetchError) {
      console.error(fetchError)
      setError(
        fetchError.message || "Es konnte keine Verbindung gefunden werden."
      )
      setResultCount(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verbindung Suchen</CardTitle>
        <CardDescription>
          Fahsplanauskünften aus dem schweizerischen Umland
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="startStation">Von (Startbahnhof)</Label>
            <Input
              id="startStation"
              type="text"
              placeholder="Luzern"
              value={startStation}
              onChange={(event) => setStartStation(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endStation">Nach (Zielbahnhof)</Label>
            <Input
              id="endStation"
              type="text"
              placeholder="Hamburg Hbf"
              value={endStation}
              onChange={(event) => setEndStation(event.target.value)}
              required
            />
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

          {error && <p className="text-sm text-red-500">{error}</p>}
          {resultCount !== null && (
            <p className="text-sm text-muted-foreground">
              {resultCount} Verbindung(en) gefunden.
            </p>
          )}

          <CardFooter className="flex-col gap-2 border-0 p-0">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Suche läuft..." : "Verbindungen Suchen"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

export default ConnectionSearch
