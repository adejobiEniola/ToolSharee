import type { ReactNode } from 'react'
import { useStore } from '../app/StoreProvider'
import { Backdrop, Icon, ICONS } from './ui'

type Props = {
  nav: 'dashboard' | 'history'
  title: string
  subtitle: string
  actions?: ReactNode
  onDashboard: () => void
  onHistory: () => void
  children: ReactNode
}

/** Shared application frame: floating frosted sidebar + mobile top bar. */
export default function AppShell({
  nav,
  title,
  subtitle,
  actions,
  onDashboard,
  onHistory,
  children,
}: Props) {
  const { signOut } = useStore()

  const item = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
      active
        ? 'bg-[#2456e2] text-white shadow-lg shadow-blue-600/25'
        : 'text-[#46536e] hover:bg-white/80 hover:text-[#16224a]'
    }`

  return (
    <div className="min-h-dvh lg:flex lg:gap-10 lg:p-6">
      <Backdrop />

      {/* Floating sidebar — desktop */}
      <aside className="hidden lg:flex w-[230px] shrink-0 flex-col glass hairline rounded-3xl p-5 sticky top-6 h-[calc(100dvh-3rem)]">
        <div className="text-[#16224a] font-extrabold tracking-[0.18em] text-sm">
          ToolLocker
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Workshop loan ledger
        </p>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Primary">
          <button
            type="button"
            onClick={onDashboard}
            aria-current={nav === 'dashboard' ? 'page' : undefined}
            className={item(nav === 'dashboard')}
          >
            <Icon d={ICONS.grid} /> Dashboard
          </button>
          <button
            type="button"
            onClick={onHistory}
            aria-current={nav === 'history' ? 'page' : undefined}
            className={item(nav === 'history')}
          >
            <Icon d={ICONS.history} /> Returned History
          </button>
        </nav>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-bold text-[#46536e] transition-all duration-200 hover:bg-white/80 hover:text-[#16224a] active:scale-[0.98]"
        >
          <Icon d={ICONS.logout} /> Log out
        </button>
      </aside>

      {/* Compact top bar — mobile */}
      <div className="lg:hidden sticky top-0 z-10 glass hairline border-x-0 border-t-0 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[#16224a] font-extrabold tracking-[0.18em] text-[13px]">
            ToolLocker
          </span>
          <button
            type="button"
            onClick={() => void signOut()}
            className="btn btn-sm btn-soft-lock active:scale-[0.97]"
          >
            Log out
          </button>
        </div>
        <nav className="mt-2 flex gap-2" aria-label="Primary">
          <button
            type="button"
            onClick={onDashboard}
            className={`btn btn-sm flex-1 ${nav === 'dashboard' ? 'btn-primary-lock' : 'btn-soft-lock'}`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={onHistory}
            className={`btn btn-sm flex-1 ${nav === 'history' ? 'btn-primary-lock' : 'btn-soft-lock'}`}
          >
            Returned History
          </button>
        </nav>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 p-4 md:p-6 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#16224a]">
              {title}
            </h1>
            <p className="text-sm text-[#46536e] mt-1">{subtitle}</p>
          </div>
          {actions}
        </div>
        <div className="mt-5">{children}</div>
      </main>
    </div>
  )
}
