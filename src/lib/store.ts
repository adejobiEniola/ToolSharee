import type { Loan, LoanInput } from './loans'

export type StoreMode = 'demo' | 'live'

/**
 * One interface, two backends. Pages and AuthPage talk only to this.
 * Demo mode ignores passwords entirely — nothing secret is ever stored.
 */
export type Store = {
  mode: StoreMode
  userEmail: string | null
  authLoading: boolean
  /** Demo only: restore the sample loans. Undefined on live. */
  resetDemo?: () => void
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  sendReset: (email: string) => Promise<string | null>
  updatePassword: (password: string) => Promise<string | null>
  outstanding: () => Promise<Loan[]>
  returned: () => Promise<Loan[]>
  getLoan: (id: string) => Promise<Loan>
  createLoan: (input: LoanInput) => Promise<Loan>
  updateLoan: (loan: Loan, input: LoanInput) => Promise<Loan>
  markReturned: (loan: Loan) => Promise<Loan>
}
