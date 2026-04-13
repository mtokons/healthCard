import { useCallback, useEffect, useMemo, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Member } from '../types'
import { generateCardNumber } from '../lib/storage'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase'
import { AuthContext } from './auth-context'

type AuthState = {
  member: Member | null
  loading: boolean
}

const initialLoadingState = (): AuthState => ({
  member: null,
  loading: isSupabaseConfigured(),
})

function toBanglaError(message: string) {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) return 'ইমেইল বা পাসওয়ার্ড ভুল।'
  if (m.includes('user already registered')) return 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।'
  return 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabaseConfigured = isSupabaseConfigured()
  const [{ member, loading }, setState] = useState<AuthState>(initialLoadingState)

  useEffect(() => {
    const client = getSupabaseClient()
    if (!client) return

    let cancelled = false

    async function load(sb: SupabaseClient) {
      const { data } = await sb.auth.getSession()
      const user = data.session?.user ?? null
      if (!user) {
        if (!cancelled) setState({ member: null, loading: false })
        return
      }

      const { data: profile, error } = await sb
        .from('profiles')
        .select('id,email,full_name,card_number,member_since')
        .eq('id', user.id)
        .single()

      if (error || !profile) {
        if (!cancelled) setState({ member: null, loading: false })
        return
      }

      const nextMember: Member = {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        cardNumber: profile.card_number,
        memberSince: profile.member_since,
      }

      if (!cancelled) setState({ member: nextMember, loading: false })
    }

    void load(client)

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      if (!user) {
        setState({ member: null, loading: false })
        return
      }
      void (async () => {
        const client = getSupabaseClient()
        if (!client) {
          setState({ member: null, loading: false })
          return
        }
        const { data: profile } = await client
          .from('profiles')
          .select('id,email,full_name,card_number,member_since')
          .eq('id', user.id)
          .single()

        if (!profile) {
          setState({ member: null, loading: false })
          return
        }

        setState({
          member: {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            cardNumber: profile.card_number,
            memberSince: profile.member_since,
          },
          loading: false,
        })
      })()
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  const register = useCallback((fullName: string, email: string, password: string) => {
    return (async () => {
      const supabase = getSupabaseClient()
      if (!supabase) {
        return { ok: false as const, error: 'সার্ভার কনফিগারেশন সম্পূর্ণ নয়।' }
      }
      if (!fullName.trim() || !email.trim() || !password) {
        return { ok: false as const, error: 'সব ঘর পূরণ করুন।' }
      }

      setState((s) => ({ ...s, loading: true }))

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      })

      if (error || !data.user) {
        setState((s) => ({ ...s, loading: false }))
        return { ok: false as const, error: toBanglaError(error?.message ?? '') }
      }

      const cardNumber = generateCardNumber()

      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: email.trim().toLowerCase(),
        full_name: fullName.trim(),
        card_number: cardNumber,
      })

      if (profileError) {
        setState((s) => ({ ...s, loading: false }))
        return { ok: false as const, error: 'প্রোফাইল তৈরি করা যায়নি। আবার চেষ্টা করুন।' }
      }

      setState((s) => ({ ...s, loading: false }))
      return { ok: true as const }
    })()
  }, [])

  const login = useCallback((email: string, password: string) => {
    return (async () => {
      const supabase = getSupabaseClient()
      if (!supabase) {
        return { ok: false as const, error: 'সার্ভার কনফিগারেশন সম্পূর্ণ নয়।' }
      }
      if (!email.trim() || !password) return { ok: false as const, error: 'সব ঘর পূরণ করুন।' }
      setState((s) => ({ ...s, loading: true }))
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        setState((s) => ({ ...s, loading: false }))
        return { ok: false as const, error: toBanglaError(error.message) }
      }
      setState((s) => ({ ...s, loading: false }))
      return { ok: true as const }
    })()
  }, [])

  const logout = useCallback(() => {
    return (async () => {
      const supabase = getSupabaseClient()
      if (supabase) await supabase.auth.signOut()
      setState({ member: null, loading: false })
    })()
  }, [])

  const value = useMemo(
    () => ({ member, loading, supabaseConfigured, register, login, logout }),
    [member, loading, supabaseConfigured, register, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
