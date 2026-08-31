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

function ConnectionSearch() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verbindung Suchen</CardTitle>
        <CardDescription>
          Fahsplanauskünften aus dem schweizerischen Umland
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="startStation">Von (Startbahnhof)</Label>
              <Input
                id="startStation"
                type="text"
                placeholder="Luzern"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endStation">Nach (Zielbahnhof)</Label>
              <Input
                id="endStation"
                type="text"
                placeholder="Hamburg Hbf"
                required
              />
            </div>
            <DateTimePicker />
            <ButtonArrivalDeparture />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Verbindungen Suchen
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ConnectionSearch
