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
            <Button onClick={handleBackToDashboard}>
              <ArrowLeft />
              Zurück zum Dashboard
            </Button>
          </div>
          <p>Journey ID: {journeyId}</p>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-1">
              <ConnectionSearch onConnectionsFound={setConnections} />
              <ConnectionSelectionList
                connections={connections}
                journeyId={journeyId}
              />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button type="button">
                        <Plus />
                        Hinzufügen
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setNewStageType(1)}>
                      Unterkunft
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewStageType(2)}>
                      Notiz
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewStageType(3)}>
                      Sehenswürdigkeit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
