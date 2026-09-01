import { createContext, useState, useContext } from "react"
import useSWRMutation from "swr/mutation"
import { mutationFetcher } from "../src/utils/fetcher"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [username, setUsername] = useState(() => localStorage.getItem("username"))
  const { trigger: triggerLogin } = useSWRMutation(["/auth/login", null], mutationFetcher)
  const { trigger: triggerLogout } = useSWRMutation(["/auth/logout", null], mutationFetcher)
  const { trigger: triggerRegister } = useSWRMutation(["/auth/register", null], mutationFetcher)

  const login = async (email, password) => {
    try {
      const data = await triggerLogin({ body: { email, password } })

      setToken(data.token)
      setUserId(data.userId)
      setUsername(data.username)
      setIsLoggedIn(!!data.token);
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("username", data.username)
    } catch (error) {
      console.error(error)
      throw new Error("Anmeldung fehlgeschlagen! Bitte überprüfe deine Eingaben.")
    }
  }

  const logout = async () => {
    try {
      await triggerLogout()

      setToken(null);
      setUserId(null);
      setUsername(null);
      setIsLoggedIn(false);
      localStorage.clear();
    } catch (error) {
      console.error(error)
    }
  }

  const register = async ({ username, email, password }) => {
    try {
      await triggerRegister({ body: { username, email, password } })
    } catch (error) {
      console.error(error)
      throw new Error("Registrierung ist fehlgeschlagen! Bitte überprüfe deine Eingaben.")
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn, userId, username, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
