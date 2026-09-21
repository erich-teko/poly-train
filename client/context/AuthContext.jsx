import { createContext, useState, useContext } from "react"
import useSWRMutation from "swr/mutation"
import { mutationFetcher } from "../src/utils/fetcher"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [username, setUsername] = useState(() => localStorage.getItem("username"))
  const [avatarStyle, setAvatarStyle] = useState(
    () => localStorage.getItem("avatarStyle") ?? "identicon"
  )
  const { trigger: triggerLogin } = useSWRMutation(["/auth/login", null], mutationFetcher)
  const { trigger: triggerLogout } = useSWRMutation(["/auth/logout", null], mutationFetcher)
  const { trigger: triggerRegister } = useSWRMutation(["/auth/register", null], mutationFetcher)
  const { trigger: triggerUpdateAvatarStyle } = useSWRMutation(
    token ? ["/api/user/avatar-style", token] : null,
    mutationFetcher
  )

  // Authenticate the user and store the returned session data.
  const login = async (email, password) => {
    try {
      const data = await triggerLogin({ body: { email, password } })

      setToken(data.token)
      setUserId(data.userId)
      setUsername(data.username)
      setAvatarStyle(data.avatarStyle ?? "identicon")
      setIsLoggedIn(!!data.token);
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("username", data.username)
      localStorage.setItem("avatarStyle", data.avatarStyle ?? "identicon")
    } catch (error) {
      console.error(error)
      throw new Error("Anmeldung fehlgeschlagen! Bitte überprüfe deine Eingaben.")
    }
  }

  // End the current session and clear locally stored user data.
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

  // Create a new user account.
  const register = async ({ username, email, password }) => {
    try {
      await triggerRegister({ body: { username, email, password } })
    } catch (error) {
      console.error(error)
      throw new Error("Registrierung ist fehlgeschlagen! Bitte überprüfe deine Eingaben.")
    }
  }

  // Update the avatar immediately and revert it if saving fails.
  const updateAvatarStyle = async (style) => {
    const previousStyle = avatarStyle
    setAvatarStyle(style)
    localStorage.setItem("avatarStyle", style)

    try {
      await triggerUpdateAvatarStyle({
        method: "PUT",
        body: { avatarStyle: style },
      })
    } catch (error) {
      console.error(error)
      // revert if the server couldn't persist the new style
      setAvatarStyle(previousStyle)
      localStorage.setItem("avatarStyle", previousStyle)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        userId,
        username,
        avatarStyle,
        login,
        logout,
        register,
        updateAvatarStyle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
