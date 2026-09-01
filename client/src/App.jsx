import { Toaster } from "@/components/ui/toast"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import { AuthProvider, useAuth } from "../context/AuthContext"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import JourneyPlanner from "../pages/JourneyPlanner"
import ProtectedRoute from "./components/ProtectedRoute"

// Logs the user out on expired/invalid tokens instead of retrying forever
function SWRAuthConfig({ children }) {
  const { logout } = useAuth()

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: (error) => error.status !== 401,
        onError: (error) => {
          if (error.status === 401) logout()
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export function App() {
  const projectName = "Poly-Train"

  return (
    <AuthProvider>
      <SWRAuthConfig>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth formType="login" />} />
            <Route path="/register" element={<Auth formType="register" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard projectName={projectName} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journey/:journeyId"
              element={
                <ProtectedRoute>
                  <JourneyPlanner projectName={projectName} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Auth formType="login" />} />
          </Routes>
        </BrowserRouter>
      </SWRAuthConfig>
    </AuthProvider>
  )
}

export default App
