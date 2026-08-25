import { useParams } from "react-router-dom"
import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import { Button } from "../src/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function JourneyPlanner({ projectName }) {
  const { journeyId } = useParams() // Get the journeyId from the URL parameters
  const navigate = useNavigate()
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
          {/* Add your journey planning content here */}
        </div>
      </div>
      <Footer year={new Date().getFullYear()} projectName={projectName} />
    </>
  )
}

export default JourneyPlanner
