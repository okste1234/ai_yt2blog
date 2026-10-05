import { createContext, useContext, useState } from 'react'
import { User } from '../services/api'

interface AuthContextValue {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // PREVIEW: dummy user — remove when backend is ready
  const [user, setUser] = useState<User | null>({ username: 'johndoe' })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('yt2blog_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('yt2blog_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext) as AuthContextValue
}
