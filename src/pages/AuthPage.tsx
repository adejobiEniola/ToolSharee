import { useState, type FormEvent } from 'react'
import { useStore } from '../app/StoreProvider'
import { Backdrop, Field } from '../components/ui'

type Mode = 'login' | 'signup' | 'forgot' | 'reset'

type Props = {
  initialMode?: Mode
  onBack?: () => void
}

export default function AuthPage({ initialMode = 'login', onBack }: Props) {
  const { signIn, signUp, sendReset, updatePassword } = useStore()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [saved, setSaved] = useState(false)

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setResetSent(false)
    setSaved(false)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() && mode !== 'reset') {
      setError('Enter your email address.')
      return
    }
    if ((mode === 'login' || mode === 'signup') && !password.trim()) {
      setError('Enter your password.')
      return
    }
    if (mode === 'signup' && password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (mode === 'reset') {
      if (!password.trim()) {
        setError('Enter your new password.')
        return
      }
      if (password !== confirm) {
        setError('Passwords do not match.')
        return
      }
    }
    setBusy(true)
    try {
      if (mode === 'login') {
        const err = await signIn(email, password)
        if (err) setError(err)
      } else if (mode === 'signup') {
        const err = await signUp(email, password)
        if (err) setError(err)
      } else if (mode === 'forgot') {
        const err = await sendReset(email)
        if (err) setError(err)
        else setResetSent(true)
      } else {
        const err = await updatePassword(password)
        if (err) setError(err)
        else setSaved(true)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Backdrop />
      <div className="rise w-full max-w-3xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-4 items-stretch">
        <div className="hidden md:flex glass-deep rounded-3xl p-8 flex-col justify-center relative overflow-hidden">
          <div className="glow-spot h-48 w-48 bg-cyan-300/50 -top-8 -right-8" />
          <div className="glow-spot h-56 w-56 bg-violet-300/50 -bottom-10 -left-10" />
          <p className="relative text-[#16224a] font-extrabold tracking-[0.18em] text-sm">
            ToolLocker
          </p>
          <h2 className="relative text-3xl font-extrabold tracking-tight text-[#16224a] mt-3 leading-tight">
            Know who has <span className="text-gradient">your tools.</span>
          </h2>
          <p className="relative text-sm text-[#46536e] mt-3 leading-relaxed">
            The simple loan ledger for busy workshops — record every loan,
            track every return.
          </p>
        </div>
        <div className="glass hairline rounded-3xl shadow-xl">
          <div className="p-6 md:p-8">
          <p className="text-center text-[#16224a] font-extrabold tracking-[0.18em] text-sm">
            ToolLocker
          </p>
          <h1 className="text-center text-xl font-extrabold text-[#16224a] mt-2">
            {mode === 'login' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset password'}
            {mode === 'reset' && 'New password'}
          </h1>
          <p className="text-center text-sm text-[#46536e] mt-1">
            {mode === 'login' && 'Log in to track your loans.'}
            {mode === 'signup' && 'Create your workshop account.'}
            {mode === 'forgot' && 'Reset your password by email.'}
            {mode === 'reset' && 'Choose a new password.'}
          </p>

          {(mode === 'login' || mode === 'signup') && (
            <div className="flex mt-4 rounded-xl bg-slate-100 p-1 gap-1" role="tablist" aria-label="Choose log in or sign up">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => switchMode('login')}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition-colors duration-200 active:scale-[0.98] ${
                  mode === 'login'
                    ? 'bg-[#2456e2] text-white shadow-md shadow-blue-600/30'
                    : 'text-[#46536e] hover:text-[#16224a]'
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                onClick={() => switchMode('signup')}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition-colors duration-200 active:scale-[0.98] ${
                  mode === 'signup'
                    ? 'bg-[#2456e2] text-white shadow-md shadow-blue-600/30'
                    : 'text-[#46536e] hover:text-[#16224a]'
                }`}
              >
                Sign up
              </button>
            </div>
          )}

          {error && (
            <div className="alert alert-error mt-4" role="alert">
              <span>{error}</span>
            </div>
          )}

          {mode === 'forgot' && resetSent ? (
            <div className="mt-4">
              <div className="alert alert-success" role="status">
                <span>Reset link sent. Check your email inbox.</span>
              </div>
              <button
                type="button"
                className="btn btn-soft-lock btn-sm w-full mt-3 active:scale-[0.98]"
                onClick={() => switchMode('reset')}
              >
                I have a reset link — set new password
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm w-full mt-1 text-[#2456e2]"
                onClick={() => switchMode('login')}
              >
                Back to log in
              </button>
            </div>
          ) : mode === 'reset' && saved ? (
            <div className="mt-4">
              <div className="alert alert-success" role="status">
                <span>Password saved. You can now log in.</span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm w-full mt-3 text-[#2456e2]"
                onClick={() => switchMode('login')}
              >
                Back to log in
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-4" noValidate>
              {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                <Field label="Email">
                  <input
                    type="email"
                    className="input input-bordered w-full bg-white/85 field-lock"
                    placeholder="david@workshop.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Field>
              )}

              {(mode === 'login' || mode === 'signup') && (
                <Field label="Password">
                  <input
                    type="password"
                    className="input input-bordered w-full bg-white/85 field-lock"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={
                      mode === 'signup' ? 'new-password' : 'current-password'
                    }
                  />
                </Field>
              )}

              {mode === 'signup' && (
                <Field label="Confirm password">
                  <input
                    type="password"
                    className="input input-bordered w-full bg-white/85 field-lock"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                </Field>
              )}

              {mode === 'reset' && (
                <>
                  <Field label="New password">
                    <input
                      type="password"
                      className="input input-bordered w-full bg-white/85 field-lock"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Field>
                  <Field label="Confirm new password">
                    <input
                      type="password"
                      className="input input-bordered w-full bg-white/85 field-lock"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Field>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary-lock w-full mt-4 active:scale-[0.98]"
                disabled={busy}
              >
                {busy
                  ? 'Please wait…'
                  : mode === 'login'
                    ? 'Log in'
                    : mode === 'signup'
                      ? 'Create account'
                      : mode === 'forgot'
                        ? 'Send reset link'
                        : 'Save new password'}
              </button>
            </form>
          )}

          <div className="text-center mt-4 text-sm flex flex-col gap-1">
            {onBack && (
              <button
                type="button"
                className="font-bold text-[#2456e2] hover:underline underline-offset-4"
                onClick={onBack}
              >
                ← Back to home
              </button>
            )}
            {mode === 'login' && (
              <button
                type="button"
                className="font-bold text-[#2456e2] hover:underline underline-offset-4"
                onClick={() => switchMode('forgot')}
              >
                Forgot password?
              </button>
            )}
            {(mode === 'forgot' || mode === 'reset') && !resetSent && (
              <button
                type="button"
                className="font-bold text-[#2456e2] hover:underline underline-offset-4"
                onClick={() => switchMode('login')}
              >
                Back to log in
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
