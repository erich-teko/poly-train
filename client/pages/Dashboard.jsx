import Footer from "../src/components/Footer"
import Header from "../src/components/Header"

function Dashboard({ projectName }) {
  return (
    <>
      <Header projectName={projectName} />
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to the Poly-Train dashboard!</p>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </div>
      <Footer year={new Date().getFullYear()} projectName={projectName} />
    </>
  )
}

export default Dashboard
