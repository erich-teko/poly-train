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

function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateLabel = "Datum",
  idPrefix = "date-picker-optional",
}) {
  const locale = getClientLocale()
  const [open, setOpen] = useState(false)
  const selectedDate = date ?? new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(
    today.getFullYear() + 5,
    today.getMonth(),
    today.getDate()
  )

  return (
    <FieldGroup className="grid w-full grid-cols-3 gap-4">
      <Field className="col-span-2">
        <FieldLabel htmlFor={`${idPrefix}-date`}>{dateLabel}</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id={`${idPrefix}-date`}
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
              startMonth={today}
              endMonth={maxDate}
              disabled={{ before: today, after: maxDate }}
              onSelect={(selected) => {
                onDateChange?.(selected)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-time`}>Uhrzeit</FieldLabel>
        <Input
          type="time"
          id={`${idPrefix}-time`}
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
