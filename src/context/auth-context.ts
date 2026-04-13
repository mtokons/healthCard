import { createContext } from 'react'
import type { Member } from '../types'

export type AuthResult = { ok: true } | { ok: false; error: string }

export const AuthContext = createContext<{
  member: Member | null
  loading: boolean
  /** False when Supabase env vars were not set at build time. */
  supabaseConfigured: boolean
  register: (fullName: string, email: string, password: string) => Promise<AuthResult>
  login: (email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
} | null>(null)
