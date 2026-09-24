import { useState, type FormEvent } from 'react'

type Mode = 'login' | 'signup' | 'forgot' | 'reset'

type Props = {
  initialMode?: Mode
  onBack?: () => void
}

export default function AuthPage({ initialMode = 'login', onBack }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setResetSent(false)
  }

  function requireEmail(): boolean {
    if (!email.trim()) {
      setError('Enter your email address.')
      return false
    }
    return true
  }

  function requirePasswords(): boolean {
    if (!password.trim()) {
      setError('Enter your password.')
      return false
    }
    if (mode === 'signup' && password !== confirm) {
      setError('Passwords do not match.')
      return false
    }
    return true
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (mode === 'forgot') {
      if (!requireEmail()) return
      setResetSent(true)
      return
    }
    if (!requireEmail()) return
    if (!requirePasswords()) return
    setError('Design preview — sign-in is not connected yet.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title justify-center text-2xl">ToolLocker</h1>
          <p className="text-center text-sm opacity-70">
            {mode === 'login' && 'Log in to track your loans.'}
            {mode === 'signup' && 'Create your workshop account.'}
            {mode === 'forgot' && 'Reset your password by email.'}
            {mode === 'reset' && 'Choose a new password.'}
          </p>

          {(mode === 'login' || mode === 'signup') && (
            <div className="tabs tabs-boxed justify-center mt-2" role="tablist">
              <button
                type="button"
                role="tab"
                className={`tab ${mode === 'login' ? 'tab-active' : ''}`}
                onClick={() => switchMode('login')}
              >
                Log in
              </button>
              <button
                type="button"
                role="tab"
                className={`tab ${mode === 'signup' ? 'tab-active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Sign up
              </button>
            </div>
          )}

          {error && (
            <div className="alert alert-info mt-3" role="alert">
              <span>{error}</span>
            </div>
          )}

          {mode === 'forgot' && resetSent ? (
            <div className="mt-3">
              <div className="alert alert-success" role="status">
                <span>Reset link sent. Check your email inbox.</span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm mt-3"
                onClick={() => switchMode('reset')}
              >
                Preview new-password form
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm mt-1"
                onClick={() => switchMode('login')}
              >
                Back to log in
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-3" noValidate>
              {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="david@workshop.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </fieldset>
              )}

              {(mode === 'login' || mode === 'signup') && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={
                      mode === 'signup' ? 'new-password' : 'current-password'
                    }
                  />
                </fieldset>
              )}

              {mode === 'signup' && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Confirm password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                </fieldset>
              )}

              {mode === 'reset' && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">New password</legend>
                    <input
                      type="password"
                      className="input w-full"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Confirm new password
                    </legend>
                    <input
                      type="password"
                      className="input w-full"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                    />
                  </fieldset>
                </>
              )}

              <button type="submit" className="btn btn-primary w-full mt-4">
                {mode === 'login' && 'Log in'}
                {mode === 'signup' && 'Create account'}
                {mode === 'forgot' && 'Send reset link'}
                {mode === 'reset' && 'Save new password'}
              </button>
            </form>
          )}

          <div className="text-center mt-3 text-sm flex flex-col gap-1">
            {onBack && (
              <button type="button" className="link" onClick={onBack}>
                ← Back to home
              </button>
            )}
            {mode === 'login' && (
              <button
                type="button"
                className="link"
                onClick={() => switchMode('forgot')}
              >
                Forgot password?
              </button>
            )}
            {(mode === 'forgot' || mode === 'reset') && !resetSent && (
              <button
                type="button"
                className="link"
                onClick={() => switchMode('login')}
              >
                Back to log in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
