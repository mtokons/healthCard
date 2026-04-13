import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth কেবল AuthProvider-এর ভিতর থেকে ব্যবহার করুন')
  return ctx
}
