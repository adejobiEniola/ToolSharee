import type { ReactNode } from 'react'

/* Shared glassmorphism primitives: one icon set, badges, panels, backdrop. */

export function Icon({
  d,
  className = 'h-4 w-4',
}: {
  d: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export const ICONS = {
  grid: 'M3 3h6v6H3zM11 3h6v4h-6zM11 9h6v8h-6zM3 11h6v6H3z',
  history: 'M10 4.5V10l3.5 2M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  logout: 'M12 4H5v12h7M8.5 10H18m0 0-3-3m3 3-3 3',
  plus: 'M10 4v12M4 10h12',
  back: 'M12 4 6 10l6 6',
  check: 'm4 10.5 4 4 8-9',
}

export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[#e8f1fb]" />
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan-200/60 blur-3xl" />
      <div className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-violet-200/60 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-100/80 blur-3xl" />
    </div>
  )
}

const BADGE: Record<string, string> = {
  Borrowed:
    'inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900',
  Overdue:
    'inline-flex items-center rounded-full border border-red-300 bg-red-100 px-3 py-1 text-xs font-bold text-red-900',
  Returned:
    'inline-flex items-center rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-bold text-green-900',
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={BADGE[status] ?? BADGE.Borrowed}>{status}</span>
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="glass rounded-3xl p-8 text-center">
      <p className="text-sm font-medium text-[#46536e]">{message}</p>
    </div>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-[#16224a] font-semibold">
        {label}
      </legend>
      {children}
    </fieldset>
  )
}
