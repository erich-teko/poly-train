import { fetcher, mutationFetcher } from "@/utils/fetcher.js"
import { useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StageCard from "./StageCard.jsx"
import { useAuth } from "/context/AuthContext"
import SkeletonCard from "./SkeletonCard.jsx"

// Keep stages ordered by their start date.
function sortStages(stages) {
  return [...stages].sort(
    (firstStage, secondStage) =>
      new Date(firstStage.startDate) - new Date(secondStage.startDate)
  )
}

// Load, display, and persist all stages in a journey.
function StageList({ newStageType, onNewStageHandled, journeyId }) {
  const { token } = useAuth()
  const { mutate } = useSWRConfig()
  const journeyUrl = `/api/journeys/${journeyId}`
  const { data, error, isLoading } = useSWR(
    token ? [journeyUrl, token] : null,
    fetcher
  )
  const { trigger: save } = useSWRMutation(
    token ? [journeyUrl, token] : null,
    mutationFetcher
  )

  const [stages, setStages] = useState(() => sortStages(data?.stages || []))

  useEffect(() => {
    setStages(sortStages(data?.stages || []))
  }, [data])

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

  // Save the current stage list through the journey API.
  const persistStages = async (updatedStages) => {
    if (!data) return

    const stagesToSave = updatedStages.map((stage) => {
      const { _id, isNew, ...stageData } = stage

      return isNew ? stageData : { ...stageData, _id }
    })

    await save({
      method: "PUT",
      body: {
        ...data,
        stages: stagesToSave,
      },
    })
    await mutate([journeyUrl, token])
  }

  // Update one stage and restore the previous state if saving fails.
  const handleStageSave = async (stageId, changes) => {
    const previousStages = stages
    const updatedStages = sortStages(
      stages.map((stage) =>
        stage._id === stageId ? { ...stage, ...changes } : stage
      )
    )
    setStages(updatedStages)

    try {
      await persistStages(updatedStages)
    } catch {
      setStages(previousStages)
    }
  }

  // Remove one stage and restore it if the API request fails.
  const handleStageDelete = async (stageId) => {
    const previousStages = stages
    const updatedStages = stages.filter((stage) => stage._id !== stageId)
    setStages(updatedStages)

    try {
      await persistStages(updatedStages)
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Deine Reisen</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <p className="px-2 py-2 text-sm text-muted-foreground">
              Keine Reisen gefunden.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {stages.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          {stages.map((journey) => (
            <StageCard
              key={journey._id}
              {...journey}
              startInEdit={journey.isNew}
              onSave={(changes) => handleStageSave(journey._id, changes)}
              onDelete={() => handleStageDelete(journey._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StageList
