import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/aspirant/Dashboard";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ADMIN">
            <Admin />
          </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
          <ProtectedRoute roleRequired="ASPIRANT">
          <Dashboard />
        </ProtectedRoute>
          }
          />
      </Routes>
    </Router>
  );
}

export default App;