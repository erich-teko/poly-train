import { createContext, useState, useContext } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [username, setUsername] = useState(() => localStorage.getItem("username"))

  const login = async (email, password) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error("Anmeldung fehlgeschlagen! Bitte überprüfe deine Eingaben.")

      const data = await response.json()
      setToken(data.token)
      setUserId(data.userId)
      setUsername(data.username)
      setIsLoggedIn(!!data.token);
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("username", data.username)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: null,
      })

      if (!response.ok) throw new Error("Abmeldung fehlgeschlagen! Bitte versuche es erneut.")

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
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) throw new Error("Registrierung ist fehlgeschlagen!")
    } catch (error) {
      console.error(error)
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
