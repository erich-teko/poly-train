import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import Dashboard from "../pages/Dashboard"
import Auth from "../pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "@/components/ui/toast"

export function App() {
  const projectName = "Poly-Train"

  return (
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth formType="login" />} />
          <Route path="/register" element={<Auth formType="register" />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard projectName={projectName} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
