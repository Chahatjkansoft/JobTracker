import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddCompanies from './pages/add-company'
import Companies from './pages/Companies'
import PendingCompanies from './pages/AdminPending'
import Navbar from './components/Navbar.jsx'
import Users from './pages/Users.jsx'
import Profile from './pages/Profile.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isAuthenticated ? <><Navbar /><Dashboard /></> : <Navigate to="/login" />} />
      <Route path="/addCompanies" element={isAuthenticated ? <><Navbar /><AddCompanies /></> : <Navigate to="/login" />} />
      <Route path="/companies" element={isAuthenticated ? <><Navbar /><Companies /></> : <Navigate to="/login" />} />
      <Route path="/users" element={isAuthenticated ? <><Navbar /><Users /></> : <Navigate to="/login" />} />
      <Route path="/pendingCompanies" element={isAuthenticated ? <><Navbar /><PendingCompanies /></> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <><Navbar /><Profile /></> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
