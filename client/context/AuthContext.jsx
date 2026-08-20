import { createContext, useState, useContext } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))

  const login = async (email, password) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error("Login fehlgeschlagen!")

      const data = await response.json()
      setToken(data.token)
      setUserId(data.userId)
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: null,
      })

      if (!response.ok) throw new Error("Logout fehlgeschlagen!")

      setToken(null);
      setUserId(null);
      localStorage.clear();
    } catch (error) {
      console.error(error)
    }
  }

  const signUp = async ({ username, email, password }) => {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { username, email, password },
      })

      if (!response.ok) throw new Error("Registrierung ist fehlgeschlagen!")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, isLoggedin: !!token, userId, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
