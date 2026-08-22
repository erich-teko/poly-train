import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

function AuthContainer({ projectName, formType = "login" }) {
  const navigate = useNavigate()

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{projectName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={formType} onValueChange={(value) => navigate(`/${value}`)} className="w-full">
          <TabsList>
            <TabsTrigger value="login">Anmelden</TabsTrigger>
            <TabsTrigger value="register">Konto erstellen</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm projectName={projectName} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm projectName={projectName} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default AuthContainer
