import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import Dashboard from "../pages/Dashboard"
import Auth from "../pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth formType="login" />} />
          <Route path="/register" element={<Auth formType="register" />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
