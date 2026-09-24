import { useState } from 'react'
import { supabase, supabaseMissingVars } from './lib/supabaseClient'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'

type View =
  | { name: 'landing' }
  | { name: 'auth'; mode: 'login' | 'signup' }

function App() {
  const [view, setView] = useState<View>({ name: 'landing' })

  return (
    <>
      {!supabase && (
        <div className="alert alert-warning rounded-none" role="alert">
          <span>
            Not connected to the database yet (missing{' '}
            {supabaseMissingVars.join(', ')}). Copy{' '}
            <code>.env.example</code> to <code>.env</code>, fill in those
            values, and restart the app. What you see is a preview only.
          </span>
        </div>
      )}
      {view.name === 'landing' ? (
        <LandingPage
          onLogin={() => setView({ name: 'auth', mode: 'login' })}
          onSignup={() => setView({ name: 'auth', mode: 'signup' })}
        />
      ) : (
        <AuthPage
          key={view.mode}
          initialMode={view.mode}
          onBack={() => setView({ name: 'landing' })}
        />
      )}
    </>
  )
}

export default App
