import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo"

// Displays the login and registration forms.
function AuthContainer({ projectName, formType = "login" }) {
  const navigate = useNavigate()

  return (
    <Card className="fixed top-24 left-1/2 w-full max-w-sm -translate-x-1/2">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle>{projectName}</CardTitle>
        <Logo size={80} className="mt-4" />
      </CardHeader>
      <CardContent>
        <Tabs value={formType} onValueChange={(value) => navigate(`/${value}`)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
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
