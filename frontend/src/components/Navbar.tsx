import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (_) {
      // proceed regardless
    }
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Orange top bar */}
      <div className="h-1 bg-blogger-orange" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blogger-orange rounded-md flex items-center justify-center text-white font-bold text-lg leading-none">
              B
            </div>
            <span className="text-gray-800 font-medium text-base hidden sm:block">
              YT<span className="text-blogger-orange">2Blog</span>
            </span>
          </Link>

          {/* Nav links */}
          {user ? (
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={`btn-ghost text-sm ${
                  location.pathname === '/' ? 'text-blogger-orange bg-blogger-orange-bg' : ''
                }`}
              >
                Generate
              </Link>
              <Link
                to="/blogs"
                className={`btn-ghost text-sm ${
                  location.pathname.startsWith('/blogs') ? 'text-blogger-orange bg-blogger-orange-bg' : ''
                }`}
              >
                My Blogs
              </Link>
              <div className="w-px h-5 bg-gray-200 mx-1" />
              <span className="text-sm text-gray-500 hidden sm:block px-2">
                {user.username}
              </span>
              <button onClick={handleLogout} className="btn-ghost text-sm text-gray-600">
                Sign out
              </button>
            </nav>
          ) : (
            <nav className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Get started
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
