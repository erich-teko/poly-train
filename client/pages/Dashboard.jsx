import { Plus } from "lucide-react"
import { Button } from "../src//components/ui/button"
import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import Journeys from "../src/components/Journeys"
import { toast } from "../src/components/ui/toast"

function Dashboard({ projectName }) {
  const handleNewJourney = () => {
    toast.add({
      title: "Neue Reise",
      description:
        "Hier kommt bald die Funktion zum Erstellen einer neuen Reise.",
      type: "info",
    })
  }

  return (
    <>
      <Header projectName={projectName} />
      <div className="flex min-h-svh p-6">
        <div className="flex w-full flex-col gap-4 text-sm leading-loose">
          <div className="flex w-full items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p>Hier findest du alle deine Reisen auf einen Blick.d</p>
            </div>
            <Button onClick={handleNewJourney}>
              <Plus />
              Neue Reise erstellen
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Journeys />
          </div>
        </div>
      </div>
      <Footer year={new Date().getFullYear()} projectName={projectName} />
    </>
  )
}

export default Dashboard
