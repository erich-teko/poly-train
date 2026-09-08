import { useEffect, useState } from "react"
import StageCard from "./StageCard.jsx"

const initialStages = [
  {
    _id: "1",
    type: 0,
    stageStart: "Luzern",
    stageEnd: "Hamburg Hbf",
    startDate: "2026-07-10T09:54:00.000Z",
    endDate: "2026-07-10T15:38:00.000Z",
    note: "Test journey 1",
    transfers: 2,
  },
  {
    _id: "2",
    type: 0,
    stageStart: "Zürich HB",
    stageEnd: "Berlin Hbf",
    startDate: "2026-09-15T08:30:00.000Z",
    endDate: "2026-09-15T17:45:00.000Z",
    note: "Test journey 2",
    transfers: 1,
  },
  {
    _id: "3",
    type: 0,
    stageStart: "Basel",
    stageEnd: "München Hbf",
    startDate: "2026-09-20T11:03:00.000Z",
    endDate: "2026-09-21T04:59:00.000Z",
    note: "Test journey 3",
    transfers: 3,
  },
  {
    _id: "4",
    type: 1,
    stageStart: "Luzern",
    stageEnd: "Luzern",
    startDate: "2026-03-10T00:00:00.000Z",
    endDate: "2026-03-13T00:00:00.000Z",
    note: "inkl Pool und PP",
  },
  {
    _id: "5",
    type: 2,
    stageStart: "Luzern",
    stageEnd: "Luzern",
    startDate: "2026-03-10T20:00:00.000Z",
    endDate: "2026-03-10T20:00:00.000Z",
    note: "Treffpunkt morgen bei der TEKO",
  },
  {
    _id: "6",
    type: 3,
    stageStart: "Luzern",
    stageEnd: "Luzern",
    startDate: "2026-03-11T09:00:00.000Z",
    endDate: "2026-03-10T20:45:00.000Z",
    note: "TEKO - Hübsch, aber nicht so schön wie die ETH (Bewertung von VSC)",
  },
]

function sortStages(stages) {
  return [...stages].sort(
    (firstStage, secondStage) =>
      new Date(firstStage.startDate) - new Date(secondStage.startDate)
  )
}

function StageList({
  stages: providedStages,
  onStagesChange,
  newStageType,
  onNewStageHandled,
}) {
  const [stages, setStages] = useState(() =>
    sortStages(providedStages || initialStages)
  )

  useEffect(() => {
    if (newStageType === null || newStageType === undefined) return

    const now = new Date().toISOString()
    setStages((currentStages) =>
      sortStages([
        ...currentStages,
        {
          _id: `new-${Date.now()}`,
          type: newStageType,
          stageStart: "",
          stageEnd: "",
          startDate: now,
          endDate: now,
          address: {},
          note: "",
          isNew: true,
        },
      ])
    )
    onNewStageHandled?.()
  }, [newStageType, onNewStageHandled])

  const handleStageSave = async (stageId, changes) => {
    const previousStages = stages
    const updatedStages = sortStages(
      stages.map((stage) =>
        stage._id === stageId ? { ...stage, ...changes } : stage
      )
    )
    setStages(updatedStages)

    try {
      await onStagesChange?.(updatedStages)
    } catch {
      setStages(previousStages)
    }
  }

  return (
    <div className="w-full space-y-6">
      {stages.length === 0 ? (
        <p className="text-muted-foreground">Keine Reisen gefunden.</p>
      ) : (
        <p className="text-muted-foreground">Reiseplaner:</p>
      )}
      {stages.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          {stages.map((journey) => (
            <StageCard
              key={journey._id}
              {...journey}
              startInEdit={journey.isNew}
              onSave={(changes) => handleStageSave(journey._id, changes)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StageList
