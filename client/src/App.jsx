import { Toaster } from "@/components/ui/toast"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import JourneyPlanner from "../pages/JourneyPlanner"
import ProtectedRoute from "./components/ProtectedRoute"

export function App() {
  const projectName = "Poly-Train"

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
