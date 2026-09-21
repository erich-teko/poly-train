import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { useState } from "react"

import { toast } from "@/components/ui/toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "/context/AuthContext"

// Submit login credentials and navigate to the application.
function LoginForm({ projectName }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Authenticate the user and show a toast when login fails.
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      toast.add({
        title: "Anmeldung fehlgeschlagen",
        description: error?.message ?? "E-Mail oder Passwort ist falsch.",
        type: "error",
      })
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Willkommen bei {projectName}</CardTitle>
        <CardDescription>
          Melde dich an, um deine Reise zu planen!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
