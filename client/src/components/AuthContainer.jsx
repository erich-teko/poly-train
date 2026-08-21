import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

function FormContainer({ formType = "login" }) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Poly-Train</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={formType} className="w-full">
          <TabsList>
            <TabsTrigger value="login" asChild>
              <Link to="/login">Anmelden</Link>
            </TabsTrigger>
            <TabsTrigger value="register" asChild>
              <Link to="/register">Konto erstellen</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default FormContainer
