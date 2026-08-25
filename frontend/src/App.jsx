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

const ProtectedLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="ml-14 md:ml-[68px]">{children}</div>
  </>
);

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isAuthenticated ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/addCompanies" element={isAuthenticated ? <ProtectedLayout><AddCompanies /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/companies" element={isAuthenticated ? <ProtectedLayout><Companies /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/users" element={isAuthenticated ? <ProtectedLayout><Users /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/pendingCompanies" element={isAuthenticated ? <ProtectedLayout><PendingCompanies /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <ProtectedLayout><Profile /></ProtectedLayout> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
