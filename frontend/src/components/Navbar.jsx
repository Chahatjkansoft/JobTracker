import { Link, useNavigate } from 'react-router-dom'
// import jwtDecode from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded?.role?.toLowerCase() === 'admin';
    } catch (error) {
      isAdmin = false;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/dashboard" className="text-xl font-semibold text-slate-900">JobTracker</Link>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-600">
          <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          <Link to="/companies" className="hover:text-slate-900">Companies</Link>
          <Link to="/addCompanies" className="hover:text-slate-900">Add Company</Link>
          {isAdmin && <Link to="/pendingCompanies" className="hover:text-slate-900">Pending</Link>}
        </nav>
        <button onClick={handleLogout} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Logout</button>
      </div>
    </header>
  )
}

export default Navbar
