import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import { useAuth } from "/context/AuthContext"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login(email, password);
      navigate("/");
      console.log("Login erfolgreich")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Melde dich bei Poly-Train an</CardTitle>
        <CardDescription>
          Gib unten deine E-Mail-Adresse ein, um dich bei deinem Konto
          anzumelden
        </CardDescription>
        <CardAction>
          <Button variant="link">Registrieren</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Passwort</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
