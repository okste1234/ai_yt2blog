import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'

interface LoginForm {
  username: string
  password: string
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.login(form.username, form.password)
      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="h-1 bg-blogger-orange" />

      {/* Header */}
      <div className="flex justify-center pt-10 pb-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blogger-orange rounded-lg flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <span className="text-2xl font-medium text-gray-800">
            YT<span className="text-blogger-orange">2Blog</span>
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6">
        <div className="w-full max-w-sm">
          <div className="card p-8">
            <h1 className="text-xl font-medium text-gray-800 mb-1">Sign in</h1>
            <p className="text-sm text-gray-500 mb-6">
              to continue to YT2Blog
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="input-field"
                  placeholder="Enter your username"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blogger-orange font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      <footer className="text-center py-8 text-xs text-gray-400">
        © {new Date().getFullYear()} YT2Blog
      </footer>
    </div>
  )
}
