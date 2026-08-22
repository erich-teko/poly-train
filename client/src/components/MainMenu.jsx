import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function MainMenu() {
  return (
    <Tabs defaultValue={formType} className="w-full">
      <TabsList>
        <TabsTrigger value="dashboard" render={<Link to="/" />}>
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="trip" render={<Link to="/trip" />}>
          Reiseplanung
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div>
            <h2>Dashboard</h2>
        </div>
      </TabsContent>
      <TabsContent value="trip">
        <div>
            <h2>Reiseplanung</h2>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default MainMenu
