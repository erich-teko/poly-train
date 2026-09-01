import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { formatDate } from "@/utils/dateUtils"
import { getClientLocale } from "@/utils/localeUtils"
import { Edit, Map, Trash } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import { useAuth } from "../../context/AuthContext"
import { mutationFetcher } from "../utils/fetcher"
import { JourneyDialog } from "./JourneyDialog"

function JourneyCard({ journey }) {
  const { token } = useAuth()
  const { mutate } = useSWRConfig()
  const [editOpen, setEditOpen] = useState(false)
  const { trigger: remove, isMutating } = useSWRMutation(
    token ? [`/api/journeys/${journey._id}`, token] : null,
    mutationFetcher
  )
  const locale = getClientLocale()
  const stagesCount = journey.stages.length
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/journey/${journey._id}`)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    setEditOpen(true)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      await remove({ method: "DELETE" })
      await mutate(["/api/journeys", token])
      toast.add({
        title: "Reise gelöscht",
        description: "Die Reise wurde erfolgreich gelöscht.",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Fehler beim Löschen der Reise",
        description:
          error?.message ?? "Die Reise konnte nicht gelöscht werden.",
        type: "error",
      })
    }
  }

  return (
    <>
      <Card
        className="flex cursor-pointer flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick()
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-base">
                {journey.startLocation} → {journey.destinationLocation}
              </CardTitle>
            </div>
            <Map className="size-6 flex-shrink-0 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {formatDate(locale, journey.startDate)} -{" "}
            {formatDate(locale, journey.endDate)}
            <br />
            {stagesCount === 0 ? "Keine Etappen" : `${stagesCount} Etappen`}
          </p>
        </CardContent>
        <CardFooter>
          <ButtonGroup className="w-full justify-end">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="size-5" />
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isMutating}
            >
              <Trash className="size-5" />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <JourneyDialog
        open={editOpen}
        setOpen={setEditOpen}
        journeyId={journey._id}
      />
    </>
  )
}

export default JourneyCard
