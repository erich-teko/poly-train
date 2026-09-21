import { DatePickerWithRange } from "@/components/DatePickerWithRange"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import { parseDate } from "chrono-node"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import { fetcher, mutationFetcher } from "@/utils/fetcher"
import { useAuth } from "/context/AuthContext"

export function JourneyDialog({ open, setOpen, journeyId }) {
  const { token } = useAuth()
  const { mutate } = useSWRConfig()
  const [internalOpen, setInternalOpen] = useState(false)
  const [startLocation, setStartLocation] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState(null)
  const [datePeriod, setDatePeriod] = useState(undefined)
  const dialogOpen = open ?? internalOpen
  const handleOpenChange = setOpen ?? setInternalOpen
  const journeyUrl = journeyId ? `/api/journeys/${journeyId}` : "/api/journeys"
  const { data: journey } = useSWR(
    journeyId && token ? [journeyUrl, token] : null,
    fetcher
  )
  const { trigger: save, isMutating } = useSWRMutation(
    token ? [journeyUrl, token] : null,
    mutationFetcher
  )

  // Create a new journey or save changes to an existing one.
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const startLocation = formData.get("startLocation")
    const destinationLocation = formData.get("destinationLocation")

    const journeyData = {
      startLocation,
      destinationLocation,
      startDate: datePeriod?.from || null,
      endDate: datePeriod?.to || datePeriod?.from || null,
      stages: journey?.stages || [],
    }

    try {
      await save({
        method: journeyId ? "PUT" : "POST",
        body: journeyData,
      })

      await mutate(["/api/journeys", token])
      handleOpenChange(false)
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

  useEffect(() => {
    if (journey) {
      setStartLocation(journey.startLocation)
      setDestinationLocation(journey.destinationLocation)
      setDatePeriod({
        from: parseDate(journey.startDate) || undefined,
        to: parseDate(journey.endDate) || undefined,
      })
    }
  }, [journey])

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {!journeyId && (
        <DialogTrigger
          render={
            <Button>
              <Plus /> Neue Reise erstellen
            </Button>
          }
        />
      )}
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="contents">
          <DialogHeader>
            <DialogTitle>
              {journeyId ? "Reise bearbeiten" : "Neue Reise erstellen"}
            </DialogTitle>
            <DialogDescription>
              {journeyId
                ? "Passe die Daten deiner Reise an."
                : "Das ist der Anfang deiner Reise."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="startLocation">Start der Reise</Label>
              <Input
                id="startLocation"
                name="startLocation"
                placeholder="Luzern"
                value={startLocation || ""}
                onChange={(e) => setStartLocation(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="destinationLocation">Ziel der Reise</Label>
              <Input
                id="destinationLocation"
                name="destinationLocation"
                placeholder="Paris"
                value={destinationLocation || ""}
                onChange={(e) => setDestinationLocation(e.target.value)}
                required
              />
            </Field>
            <Field>
              <DatePickerWithRange
                title="Reisezeitraum"
                datePeriod={datePeriod}
                setDatePeriod={setDatePeriod}
                numberOfMonths={4}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Abbrechen</Button>}
            />
            <Button type="submit" disabled={isMutating || !datePeriod?.from}>
              {isMutating ? "Speichert..." : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
