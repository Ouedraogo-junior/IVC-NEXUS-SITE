import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading') // loading | guest | authed

  useEffect(() => {
    let alive = true
    api
      .get('/me')
      .then((res) => {
        if (!alive) return
        setUser(res.user)
        setStatus('authed')
      })
      .catch(() => {
        if (!alive) return
        setUser(null)
        setStatus('guest')
      })
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/login', { email, password })
    setUser(res.user)
    setStatus('authed')
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/logout')
    } finally {
      setUser(null)
      setStatus('guest')
    }
  }, [])

  const value = useMemo(() => ({ user, status, login, logout }), [user, status, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>')
  return ctx
}
