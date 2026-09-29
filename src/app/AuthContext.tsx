import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

type AuthState = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  sendReset: (email: string) => Promise<string | null>
  updatePassword: (password: string) => Promise<string | null>
}

const Ctx = createContext<AuthState | null>(null)

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function wrap(fn: () => Promise<{ error: unknown }>): Promise<string | null> {
    if (!supabase) return 'Database is not connected yet.'
    try {
      const { error } = await fn()
      return error ? errMsg(error) : null
    } catch (e) {
      return errMsg(e)
    }
  }

  const value: AuthState = {
    user,
    loading,
    signIn: (email, password) =>
      wrap(() => supabase!.auth.signInWithPassword({ email: email.trim(), password })),
    signUp: (email, password) =>
      wrap(() => supabase!.auth.signUp({ email: email.trim(), password })),
    signOut: async () => {
      await supabase?.auth.signOut()
    },
    sendReset: (email) =>
      wrap(() => supabase!.auth.resetPasswordForEmail(email.trim())),
    updatePassword: (password) =>
      wrap(() => supabase!.auth.updateUser({ password })),
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
