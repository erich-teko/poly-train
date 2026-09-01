"use client"

import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { formatDate } from "@/utils/dateUtils"
import { getClientLocale } from "@/utils/localeUtils"
import { useMemo, useState } from "react"

export function DatePickerWithRange({ title, datePeriod, setDatePeriod, numberOfMonths = 2 }) {
  const clientLocale = useMemo(() => getClientLocale(), [])
  const [pendingDate, setPendingDate] = useState(datePeriod || undefined)
  const [open, setOpen] = useState(false)
  const locale = getClientLocale()

  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      setPendingDate(datePeriod || undefined)
    }
    setOpen(isOpen)
  }

  const handleApply = () => {
    setDatePeriod(pendingDate)
    setOpen(false)
  }

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">{title}</FieldLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal"
            >
              <CalendarIcon data-icon="inline-start" />
              {datePeriod?.from ? (
                datePeriod.to ? (
                  <>
                    {formatDate(locale, datePeriod.from)} -{" "}
                    {formatDate(locale, datePeriod.to)}
                  </>
                ) : (
                  formatDate(locale, datePeriod.from)
                )
              ) : (
                <span>Datum auswählen</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={pendingDate?.from}
            selected={pendingDate}
            onSelect={setPendingDate}
            numberOfMonths={numberOfMonths}
            locale={clientLocale}
          />
          <div className="flex justify-end border-t border-border p-2">
            <Button
              type="button"
              size="sm"
              onClick={handleApply}
              disabled={!pendingDate?.from}
            >
              Übernehmen
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
