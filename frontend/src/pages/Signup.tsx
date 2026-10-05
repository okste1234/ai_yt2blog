import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'

interface SignupForm {
  username: string
  email: string
  password: string
  password2: string
}

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.password2) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const data = await authApi.signup(
        form.username,
        form.email,
        form.password,
        form.password2
      )
      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account. Try a different username.')
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof SignupForm) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value }),
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="h-1 bg-blogger-orange" />

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

      <div className="flex-1 flex items-start justify-center px-4 pt-6">
        <div className="w-full max-w-sm">
          <div className="card p-8">
            <h1 className="text-xl font-medium text-gray-800 mb-1">Create account</h1>
            <p className="text-sm text-gray-500 mb-6">
              Join YT2Blog — turn YouTube into articles
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
                  className="input-field"
                  placeholder="Choose a username"
                  required
                  autoFocus
                  {...field('username')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  required
                  {...field('email')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Create a password"
                  required
                  minLength={6}
                  {...field('password')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Repeat your password"
                  required
                  {...field('password2')}
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
                    Creating account…
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blogger-orange font-medium hover:underline">
              Sign in
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
