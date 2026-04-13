import { createContext } from 'react'
import type { Member } from '../types'
import { loginMember, registerMember } from '../lib/storage'

export const AuthContext = createContext<{
  member: Member | null
  loading: boolean
  register: (
    fullName: string,
    email: string,
    password: string
  ) => ReturnType<typeof registerMember>
  login: (email: string, password: string) => ReturnType<typeof loginMember>
  logout: () => void
} | null>(null)
