import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from './AuthContext'
import {
  createLoan,
  fetchLoan,
  fetchOutstanding,
  fetchReturned,
  markReturned,
  updateLoan,
} from '../lib/loanApi'
import { supabase } from '../lib/supabaseClient'
import type { Store } from '../lib/store'
import { createDemoStore } from '../demo/demoStore'

const Ctx = createContext<Store | null>(null)

// TEMPORARY preview switch: demo is the default until Supabase is connected.
// Set to false when backend setup is done. Live code paths stay intact below.
const DEMO_DEFAULT = true

/**
 * Picks the backend: live Supabase when configured, otherwise the
 * temporary in-memory demo (clearly labelled in the UI).
 * `?demo=1` forces the demo even when Supabase is configured —
 * the preview path that never touches .env or the network.
 * Live integration code (loanApi / AuthContext) is untouched.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const [demo] = useState(createDemoStore)
  const [demoEmail, setDemoEmail] = useState<string | null>(null)
  const [, setDemoTick] = useState(0)
  const refreshDemo = () => setDemoTick((n) => n + 1)
  const forceDemo =
    DEMO_DEFAULT ||
    (typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('demo'))
  const live = supabase && !forceDemo

  const store = useMemo<Store>(() => {
    if (live) {
      return {
        mode: 'live',
        userEmail: auth.user?.email ?? null,
        authLoading: auth.loading,
        signIn: auth.signIn,
        signUp: auth.signUp,
        signOut: auth.signOut,
        sendReset: auth.sendReset,
        updatePassword: auth.updatePassword,
        outstanding: fetchOutstanding,
        returned: fetchReturned,
        getLoan: fetchLoan,
        createLoan: async (input) => {
          if (!auth.user) throw new Error('You are not logged in.')
          return createLoan(auth.user.id, input)
        },
        updateLoan,
        markReturned,
      }
    }
    return {
      mode: 'demo',
      userEmail: demoEmail,
      authLoading: false,
      resetDemo: () => {
        demo.reset()
        refreshDemo()
      },
      // Demo session: any email signs in. Passwords are ignored and never stored.
      signIn: async (email) => {
        if (!email.trim()) return 'Enter your email address.'
        setDemoEmail(email.trim())
        return null
      },
      signUp: async (email) => {
        if (!email.trim()) return 'Enter your email address.'
        setDemoEmail(email.trim())
        return null
      },
      signOut: async () => {
        setDemoEmail(null)
      },
      // No real emails in demo — pretend the link was sent.
      sendReset: async (email) => {
        if (!email.trim()) return 'Enter your email address.'
        return null
      },
      updatePassword: async () => null,
      outstanding: async (...args) => {
        const rows = await demo.outstanding(...args)
        return rows
      },
      returned: demo.returned,
      getLoan: demo.getLoan,
      createLoan: async (...args) => {
        const row = await demo.createLoan(...args)
        refreshDemo()
        return row
      },
      updateLoan: async (...args) => {
        const row = await demo.updateLoan(...args)
        refreshDemo()
        return row
      },
      markReturned: async (...args) => {
        const row = await demo.markReturned(...args)
        refreshDemo()
        return row
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, auth.loading, demoEmail, demo])

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
