import { useEffect, useState } from 'react'
import { AuthProvider } from './AuthContext'
import { StoreProvider, useStore } from './StoreProvider'
import type { Loan } from '../lib/loans'
import DemoBanner from '../components/DemoBanner'
import EnvBanner from '../components/EnvBanner'
import AuthPage from '../pages/AuthPage'
import DashboardPage from '../pages/DashboardPage'
import HistoryPage from '../pages/HistoryPage'
import LandingPage from '../pages/LandingPage'
import LoanDetailsPage from '../pages/LoanDetailsPage'
import LoanFormPage from '../pages/LoanFormPage'

type View =
  | { name: 'landing' }
  | { name: 'auth'; mode: 'login' | 'signup' }
  | { name: 'dashboard' }
  | { name: 'form'; loan: Loan | null }
  | { name: 'details'; loanId: string; from: 'dashboard' | 'history' }
  | { name: 'history' }

const APP_VIEWS: View['name'][] = ['dashboard', 'form', 'details', 'history']

function Shell() {
  const { userEmail, authLoading, mode } = useStore()
  const [view, setView] = useState<View>({ name: 'landing' })

  // Signed-in session → dashboard. Visitors are never redirected;
  // Auth opens only via Log in / Create account clicks.
  // Logout returns to the login screen, per the OnePage.
  useEffect(() => {
    if (authLoading) return
    if (userEmail && (view.name === 'landing' || view.name === 'auth')) {
      setView({ name: 'dashboard' })
    }
    if (!userEmail && APP_VIEWS.includes(view.name)) {
      setView({ name: 'auth', mode: 'login' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, userEmail])

  const banner = mode === 'demo' ? <DemoBanner /> : <EnvBanner />

  if (view.name === 'landing') {
    return (
      <>
        {banner}
        <LandingPage
          onLogin={() => setView({ name: 'auth', mode: 'login' })}
          onSignup={() => setView({ name: 'auth', mode: 'signup' })}
        />
      </>
    )
  }

  if (view.name === 'auth') {
    return (
      <>
        {banner}
        <AuthPage
          key={view.mode}
          initialMode={view.mode}
          onBack={() => setView({ name: 'landing' })}
        />
      </>
    )
  }

  if (view.name === 'dashboard') {
    return (
      <DashboardPage
        onAdd={() => setView({ name: 'form', loan: null })}
        onOpen={(loanId) =>
          setView({ name: 'details', loanId, from: 'dashboard' })
        }
        onHistory={() => setView({ name: 'history' })}
        onDashboard={() => setView({ name: 'dashboard' })}
      />
    )
  }

  if (view.name === 'form') {
    return (
      <LoanFormPage
        loan={view.loan}
        onSaved={(saved) =>
          setView({ name: 'details', loanId: saved.id, from: 'dashboard' })
        }
        onCancel={() =>
          setView(
            view.loan
              ? { name: 'details', loanId: view.loan.id, from: 'dashboard' }
              : { name: 'dashboard' },
          )
        }
        onDashboard={() => setView({ name: 'dashboard' })}
        onHistory={() => setView({ name: 'history' })}
      />
    )
  }

  if (view.name === 'details') {
    return (
      <LoanDetailsPage
        loanId={view.loanId}
        onEdit={(loan) => setView({ name: 'form', loan })}
        onBack={() =>
          setView(
            view.from === 'history'
              ? { name: 'history' }
              : { name: 'dashboard' },
          )
        }
        onDashboard={() => setView({ name: 'dashboard' })}
        onHistory={() => setView({ name: 'history' })}
      />
    )
  }

  return (
    <HistoryPage
      onOpen={(loanId) =>
        setView({ name: 'details', loanId, from: 'history' })
      }
      onBack={() => setView({ name: 'dashboard' })}
      onDashboard={() => setView({ name: 'dashboard' })}
      onHistory={() => setView({ name: 'history' })}
    />
  )
}

export default function Root() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </AuthProvider>
  )
}
