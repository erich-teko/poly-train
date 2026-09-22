"use client"


import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

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
