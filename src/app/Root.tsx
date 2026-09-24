import { useState } from 'react'
import AuthPage from '../pages/AuthPage'
import LandingPage from '../pages/LandingPage'
import EnvBanner from '../components/EnvBanner'

type View =
  | { name: 'landing' }
  | { name: 'auth'; mode: 'login' | 'signup' }

export default function Root() {
  const [view, setView] = useState<View>({ name: 'landing' })

  return (
    <>
      <EnvBanner />
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
