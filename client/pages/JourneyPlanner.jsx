import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useSWR from "swr"
import { useAuth } from "../context/AuthContext"
import ConnectionSearch from "../src/components/ConnectionSearch"
import ConnectionSelectionList from "../src/components/ConnectionSelectionList"
import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import StageList from "../src/components/StageList"
import { Button } from "../src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../src/components/ui/dropdown-menu"
import { fetcher } from "../src/utils/fetcher"
import typeConfig, { selectableStageTypes } from "../src/utils/typeConfig.js"

// Coordinate connection searches and editing the selected journey.
function JourneyPlanner({ projectName }) {
  const { journeyId } = useParams() // Get the journeyId from the URL parameters
  const navigate = useNavigate()
  const { token } = useAuth()
  const [searchParams, setSearchParams] = useState(null)
  const [searchId, setSearchId] = useState(0)
  const [newStageType, setNewStageType] = useState(null)
  const {
    data: connections,
    error: connectionsError,
    isLoading: isSearching,
  } = useSWR(
    token && searchParams
      ? [`/api/public-transport/connections?${searchParams}`, token, searchId]
      : null,
    fetcher
  )
  const { data: journey } = useSWR(
    token && journeyId ? [`/api/journeys/${journeyId}`, token] : null,
    fetcher
  )

  // Start a new connection search and force SWR to refresh the results.
  const handleSearch = (params) => {
    setSearchParams(params)
    // force a re-fetch even if the params are unchanged from the last search
    setSearchId((id) => id + 1)
  }

  const resultCount =
    searchParams &&
    !isSearching &&
    !connectionsError &&
    Array.isArray(connections)
      ? connections.length
      : null

  // Return to the list of saved journeys.
  const handleBackToDashboard = () => {
    navigate("/dashboard") // Navigate back to the dashboard
  }

  return (
    <>
      <Header projectName={projectName} />
      <div className="flex min-h-svh p-6">
        <div className="flex w-full flex-col gap-4 text-sm leading-loose">
          <div className="flex w-full items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Reiseplanung</h1>
              <p>Deine Reise startet hier mit deiner Planung.</p>
            </div>
            <Button className="w-56" onClick={handleBackToDashboard}>
              <ArrowLeft />
              Zurück zum Dashboard
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-1 lg:col-start-1 lg:row-start-2">
              <ConnectionSearch
                onSearch={handleSearch}
                isSearching={isSearching}
                resultCount={resultCount}
                initialDate={journey?.startDate}
              />
              <ConnectionSelectionList
                connections={Array.isArray(connections) ? connections : []}
                error={connectionsError}
                isLoading={isSearching}
                journeyId={journeyId}
              />
            </div>
            <div className="flex justify-end lg:col-span-2 lg:col-start-2 lg:row-start-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button type="button" className="w-56">
                      <Plus />
                      Hinzufügen
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56">
                  {selectableStageTypes.map((type) => {
                    const OptionIcon = typeConfig[type].icon
                    return (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => setNewStageType(type)}
                      >
                        {OptionIcon && <OptionIcon className="h-5 w-5" />}
                        {typeConfig[type].title}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="lg:col-span-2 lg:col-start-2 lg:row-start-2">
              <StageList
                newStageType={newStageType}
                onNewStageHandled={() => setNewStageType(null)}
                journeyId={journeyId}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer year={new Date().getFullYear()} projectName={projectName} />
    </>
  )
}

export default JourneyPlanner
