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
import { parseDate } from "chrono-node"
import { Plus } from "lucide-react"
import { useState } from "react"

export function JourneyDialog({ open, setOpen, }) {
  const [value, setValue] = useState("In 2 days")
  const [datePeriod, setDatePeriod] = useState(parseDate(value) || undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger
          render={
            <Button>
              <Plus /> Neue Reise erstellen
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Neue Reise erstellen</DialogTitle>
            <DialogDescription>
              Das ist der Anfang deiner Reise.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="startLocation">Start der Reise</Label>
              <Input
                id="startLocation"
                name="startLocation"
                placeholder="Luzern"
              />
            </Field>
            <Field>
              <Label htmlFor="destinationLocation">Ziel der Reise</Label>
              <Input
                id="destinationLocation"
                name="destinationLocation"
                placeholder="Paris"
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
            <Button type="submit">Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
