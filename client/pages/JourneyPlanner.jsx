import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import typeConfig, { selectableStageTypes } from "../src/utils/typeConfig.js"

function JourneyPlanner({ projectName }) {
  const { journeyId } = useParams() // Get the journeyId from the URL parameters
  const navigate = useNavigate()
  const [connections, setConnections] = useState([])
  const [newStageType, setNewStageType] = useState(null)

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
            <div className="flex flex-col gap-4 lg:col-start-1 lg:col-span-1 lg:row-start-2">
              <ConnectionSearch onConnectionsFound={setConnections} />
              <ConnectionSelectionList
                connections={connections}
                journeyId={journeyId}
              />
            </div>
            <div className="flex justify-end lg:col-start-2 lg:col-span-2 lg:row-start-1">
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
            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2">
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
