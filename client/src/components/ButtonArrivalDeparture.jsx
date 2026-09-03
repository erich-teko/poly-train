"use client"

import * as React from "react"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ButtonArrivalDeparture({ value = "departure", onChange }) {
  const selected = value === "arrival" ? "arrival" : "departure"

  return (
    <ButtonGroup>
      <Button
        type="button"
        variant={selected === "departure" ? "default" : "outline"}
        aria-pressed={selected === "departure"}
        onClick={() => onChange?.("departure")}
      >
        Abfahrt
      </Button>
      <Button
        type="button"
        variant={selected === "arrival" ? "default" : "outline"}
        aria-pressed={selected === "arrival"}
        onClick={() => onChange?.("arrival")}
      >
        Ankunft
      </Button>
    </ButtonGroup>
  )
}
export default ButtonArrivalDeparture
