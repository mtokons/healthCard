import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/** True when Vite env vars are present at build time (GitHub Actions secrets for production). */
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  return Boolean(url?.trim() && key?.trim())
}

/** Singleton Supabase client, or null if env vars are missing (no crash). */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (client) return client
  const url = import.meta.env.VITE_SUPABASE_URL as string
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  client = createClient(url, key)
  return client
}
