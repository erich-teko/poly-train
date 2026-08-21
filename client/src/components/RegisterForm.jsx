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
import { useNavigate } from "react-router-dom"
import { useAuth } from "/context/AuthContext"
import { useState } from "react"

function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await register({ username, email, password })
      navigate("/login")
      console.log("Registrierung erfolgreich")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Willkommen bei Poly-Train</CardTitle>
        <CardDescription>
          Registriere dich, und deine Reise kann beginnen!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                type="text"
                placeholder="Max Mustermann"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Passwort bestätigen</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="register-form" className="w-full">
          Registrieren
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm
