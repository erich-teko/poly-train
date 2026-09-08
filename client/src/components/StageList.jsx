import { fetcher } from "@/utils/fetcher.js"
import { useEffect, useState } from "react"
import useSWR from "swr"
import StageCard from "./StageCard.jsx"
import { useAuth } from "/context/AuthContext"
import SkeletonCard from "./SkeletonCard.jsx"

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
  journeyId,
}) {
  const { token } = useAuth()
  const { data, error, isLoading } = useSWR(
    token ? [`/api/journeys/${journeyId}`, token] : null,
    fetcher
  )

  const [stages, setStages] = useState(() =>
    sortStages(providedStages || data?.stages || [])
  )

  useEffect(() => {
    const nextStages = sortStages(providedStages || data?.stages || [])
    setStages(nextStages)
  }, [providedStages, data])

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
      {isLoading ? (
        <>
          <p className="text-muted-foreground">Lade Reisen...</p>
          <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      ) : error ? (
        <p className="text-destructive">{error.message}</p>
      ) : stages.length === 0 ? (
        <p className="text-muted-foreground">Keine Reisen gefunden.</p>
      ) : (
        <p className="text-muted-foreground">Deine Reisen:</p>
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
