import type { Member } from '../types'

const USERS_KEY = 'chc_users'
const SESSION_KEY = 'chc_session_user_id'

interface StoredUser extends Member {
  password: string
}

function toPublicMember(u: StoredUser): Member {
  return {
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    memberSince: u.memberSince,
    cardNumber: u.cardNumber,
  }
}

function loadUsers(): Record<string, StoredUser> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, StoredUser>
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function generateCardNumber(): string {
  const chars = '0123456789ABCDEF'
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `CHC-${segment()}-${segment()}-${segment()}`
}

export function registerMember(
  fullName: string,
  email: string,
  password: string
): { ok: true; member: Member } | { ok: false; error: string } {
  const key = normalizeEmail(email)
  if (!key || !fullName.trim() || !password) {
    return { ok: false, error: 'সব ঘর পূরণ করুন।' }
  }
  const users = loadUsers()
  if (users[key]) {
    return { ok: false, error: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।' }
  }
  const id = crypto.randomUUID()
  const member: StoredUser = {
    id,
    email: key,
    fullName: fullName.trim(),
    password,
    memberSince: new Date().toISOString(),
    cardNumber: generateCardNumber(),
  }
  users[key] = member
  saveUsers(users)
  return { ok: true, member: toPublicMember(member) }
}

export function loginMember(
  email: string,
  password: string
): { ok: true; member: Member } | { ok: false; error: string } {
  const key = normalizeEmail(email)
  const users = loadUsers()
  const u = users[key]
  if (!u || u.password !== password) {
    return { ok: false, error: 'ইমেইল বা পাসওয়ার্ড ভুল।' }
  }
  return { ok: true, member: toPublicMember(u) }
}

export function getMemberById(id: string): Member | null {
  const users = loadUsers()
  for (const u of Object.values(users)) {
    if (u.id === id) {
      return toPublicMember(u)
    }
  }
  return null
}

export function setSessionUserId(id: string | null) {
  if (id) localStorage.setItem(SESSION_KEY, id)
  else localStorage.removeItem(SESSION_KEY)
}

export function getSessionUserId(): string | null {
  return localStorage.getItem(SESSION_KEY)
}
