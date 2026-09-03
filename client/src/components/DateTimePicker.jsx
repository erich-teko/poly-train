"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "@/utils/dateUtils"
import { getClientLocale } from "@/utils/localeUtils"
import { useState } from "react"

function DateTimePicker({ date, time, onDateChange, onTimeChange }) {
  const locale = getClientLocale()
  const [open, setOpen] = useState(false)
  const selectedDate = date ?? new Date()

  return (
    <FieldGroup className="grid w-full grid-cols-3 gap-4">
      <Field className="col-span-2">
        <FieldLabel htmlFor="date-picker-optional">Datum</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-optional"
                className="w-full justify-between font-normal"
              >
                {date ? formatDate(locale, date) : "Datum wählen"}
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            }
          />
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              locale={locale}
              selected={selectedDate}
              captionLayout="dropdown"
              defaultMonth={selectedDate}
              onSelect={(selected) => {
                onDateChange?.(selected)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel htmlFor="time-picker-optional">Uhrzeit</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="60"
          value={time ?? "10:30"}
          onChange={(event) => onTimeChange?.(event.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}

export default DateTimePicker
