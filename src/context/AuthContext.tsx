import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import type { Member } from '../types'
import {
  getMemberById,
  getSessionUserId,
  loginMember,
  registerMember,
  setSessionUserId,
} from '../lib/storage'
import { AuthContext } from './auth-context'

type AuthState = {
  member: Member | null
  loading: boolean
}

const emptyState: AuthState = { member: null, loading: false }
let cachedAuth: AuthState = emptyState

function computeAuthState(): AuthState {
  const id = getSessionUserId()
  if (!id) return emptyState
  const member = getMemberById(id)
  if (!member) return emptyState
  return { member, loading: false }
}

function getSnapshot(): AuthState {
  const next = computeAuthState()
  if (
    cachedAuth.member?.id === next.member?.id &&
    cachedAuth.loading === next.loading
  ) {
    return cachedAuth
  }
  cachedAuth = next
  return cachedAuth
}

const AUTH_EVENT = 'chc-auth'

function subscribe(callback: () => void) {
  const onAuth = () => callback()
  window.addEventListener(AUTH_EVENT, onAuth)
  window.addEventListener('storage', onAuth)
  return () => {
    window.removeEventListener(AUTH_EVENT, onAuth)
    window.removeEventListener('storage', onAuth)
  }
}

function useAuthState() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => emptyState
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { member, loading } = useAuthState()

  useEffect(() => {
    const id = getSessionUserId()
    if (id && !getMemberById(id)) {
      setSessionUserId(null)
      window.dispatchEvent(new Event(AUTH_EVENT))
    }
  }, [])

  const register = useCallback((fullName: string, email: string, password: string) => {
    const result = registerMember(fullName, email, password)
    if (result.ok) {
      setSessionUserId(result.member.id)
      window.dispatchEvent(new Event(AUTH_EVENT))
    }
    return result
  }, [])

  const login = useCallback((email: string, password: string) => {
    const result = loginMember(email, password)
    if (result.ok) {
      setSessionUserId(result.member.id)
      window.dispatchEvent(new Event(AUTH_EVENT))
    }
    return result
  }, [])

  const logout = useCallback(() => {
    setSessionUserId(null)
    window.dispatchEvent(new Event(AUTH_EVENT))
  }, [])

  const value = useMemo(
    () => ({ member, loading, register, login, logout }),
    [member, loading, register, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
