import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from "../context/AuthContext"

const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9.5L12 3l9 6.5v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-11Z" />
      </svg>
    ),
  },
  {
    name: 'Companies',
    path: '/companies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 22h16V12L12 3 4 12v10Z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    name: 'Add Company',
    path: '/addCompanies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
  },
]

const adminItems = [
  {
    name: 'Users',
    path: '/users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'Pending Companies',
    path: '/pendingCompanies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2l7 4v6c0 5-3.75 9.74-7 12-3.25-2.26-7-7-7-12V6l7-4Z" />
        <path d="M12 6v6" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
]

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || false;
  const userName = user?.userName || 'User';

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    navigate('/login');
  }

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // const renderItem = (item) => {
  //   const isActive = location.pathname === item.path;
  //   return (
  //     <Link
  //       key={item.path}
  //       to={item.path}
  //       onClick={closeSidebar}
  //       title={item.name}
  //       className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
  //     >
  //       <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
  //         {item.icon}
  //       </span>
  //       {isSidebarOpen && <span>{item.name}</span>}
  //     </Link>
  //   );
  // }

  return (
    <>
      <div className="fixed top-4 left-4 z-30 rounded-2xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur-sm"
      // className="fixed inset-y-0 left-0 z-30 w-20 flex h-screen flex-col items-center justify-between border-r border-slate-200 bg-white/95 px-2 py-4 shadow-sm backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-label="Open navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        // className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          {isSidebarOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* <nav className="flex w-full flex-1 flex-col items-center gap-2 overflow-hidden pt-4">
          {sidebarItems.map(renderItem)}
          {isAdmin && adminItems.map(renderItem)}
        </nav>

        <div className="mt-auto flex w-full flex-col items-center gap-2">
          <Link
            to="/profile"
            onClick={closeSidebar}
            title="Profile"
            className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${location.pathname === '/profile' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${location.pathname === '/profile' ? 'bg-slate-200 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            {isSidebarOpen && (
              <div className="overflow-hidden text-left">
                <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
                <p className="truncate text-xs text-slate-500">{isAdmin ? 'Admin' : 'User'}</p>
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-500 px-3 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </span>
            {isSidebarOpen && 'Logout'}
          </button>
        </div> */}
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-white shadow-xl border-r border-slate-200 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex min-h-full flex-col justify-between px-4 py-6">
          <div>
            <div className="mb-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">📋</span>
                <div>
                  <p className="text-lg font-semibold text-slate-900">JobTracker</p>
                  <p className="text-sm text-slate-500">Navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Close navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
              {isAdmin && adminItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Link
              to="/profile"
              onClick={closeSidebar}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${location.pathname === '/profile' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-900">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
                <p className="text-xs text-slate-500">{isAdmin ? 'Admin' : 'User'}</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar
