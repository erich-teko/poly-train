import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import { JourneyDialog } from "../src/components/JourneyDialog"
import Journeys from "../src/components/Journeys"

function Dashboard({ projectName }) {
  return (
    <>
      <Header projectName={projectName} />
      <div className="flex min-h-svh p-6">
        <div className="flex w-full flex-col gap-4 text-sm leading-loose">
          <div className="flex w-full items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p>Hier findest du alle deine Reisen auf einen Blick.</p>
            </div>
            <JourneyDialog />
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
