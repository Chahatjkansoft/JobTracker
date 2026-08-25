import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
  { name: 'Companies', path: '/companies', icon: 'briefcase' },
  { name: 'Add Company', path: '/addCompanies', icon: 'plus' },
]
const adminItems = [
  { name: 'Users', path: '/users', icon: 'users' },
  { name: 'Pending Companies', path: '/pendingCompanies', icon: 'clock' },
]
const Icon = ({ name, size = 'h-5 w-5' }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    users: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M18 15h1a3 3 0 0 1 3 3v1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={size}>{paths[name]}</svg>
}
const NavItem = ({ item, active }) => <Link to={item.path} title={item.name} aria-label={item.name} className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-600'}`}><Icon name={item.icon} /><span className="pointer-events-none absolute left-14 z-30 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block">{item.name}</span></Link>

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isAdmin = user?.role?.toLowerCase() === 'admin'
  const userName = user?.userName || 'User'
  const handleLogout = () => { logout(); navigate('/login') }
  return <>
    <aside className="fixed inset-y-0 left-0 z-20 flex w-14 flex-col items-center border-r border-slate-100 bg-white py-4 md:w-[68px] md:py-6">
      <Link to="/dashboard" aria-label="JobTracker home" className="mb-8 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-100 md:mb-14"><Icon name="briefcase" size="h-4 w-4" /></Link>
      <nav className="flex flex-col items-center gap-2 md:gap-3">{navigationItems.map((item) => <NavItem key={item.path} item={item} active={location.pathname === item.path} />)}{isAdmin && adminItems.map((item) => <NavItem key={item.path} item={item} active={location.pathname === item.path} />)}</nav>
      <div className="mt-auto flex flex-col items-center gap-3"><NavItem item={{ name: 'Profile', path: '/profile', icon: 'user' }} active={location.pathname === '/profile'} /><button type="button" onClick={handleLogout} title="Log out" aria-label="Log out" className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"><Icon name="logout" /></button></div>
    </aside>
    <header className="fixed left-14 right-0 top-0 z-10 flex h-[72px] items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-4 backdrop-blur md:left-[68px] md:h-[88px] md:px-10"><div className="min-w-0"><p className="truncate text-base font-bold text-slate-800 md:text-xl">Welcome, {userName}</p><p className="mt-1 text-[11px] text-slate-400 md:text-xs">Tuesday, 25 August 2026</p></div><div className="flex shrink-0 items-center gap-3 md:gap-5"><label className="flex h-9 w-32 items-center gap-2 rounded-lg bg-slate-50 px-3 text-slate-400 sm:w-48 md:h-10 md:w-64 md:gap-3 md:px-4"><Icon name="search" size="h-4 w-4" /><input aria-label="Search" className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-slate-400 md:text-sm" placeholder="Search" /></label><button type="button" aria-label="Notifications" className="relative text-slate-300 transition hover:text-blue-500"><Icon name="bell" /><span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" /></button><Link to="/profile" aria-label="Open profile" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-sm md:h-10 md:w-10">{userName.slice(0, 1).toUpperCase()}</Link></div></header>
  </>
}
export default Navbar
