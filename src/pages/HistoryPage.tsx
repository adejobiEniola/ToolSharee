import { useEffect, useState } from 'react'
import { useStore } from '../app/StoreProvider'
import { fmtDate, type Loan } from '../lib/loans'
import AppShell from '../components/AppShell'
import { EmptyState, StatusBadge } from '../components/ui'

type Props = {
  onOpen: (id: string) => void
  onBack: () => void
  onDashboard: () => void
  onHistory: () => void
}

export default function HistoryPage({ onOpen, onBack, onDashboard, onHistory }: Props) {
  const { returned } = useStore()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    returned()
      .then(setLoans)
      .catch(() => setError('Something went wrong. Please try again.'))
      .finally(() => setLoading(false))
  }, [returned])

  return (
    <AppShell
      nav="history"
      title="Returned History"
      subtitle="Every tool that made it home — newest first."
      onDashboard={onDashboard}
      onHistory={onHistory}
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-bold text-[#2456e2] hover:underline underline-offset-4 mb-3"
      >
        ← Back to Dashboard
      </button>

      {loading && <p className="text-sm text-[#46536e]">Loading history…</p>}
      {error && (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      )}
      {!loading && !error && loans.length === 0 && (
        <EmptyState message="No returned loans yet." />
      )}
      {!loading && !error && loans.length > 0 && (
        <div className="surface-solid hairline rounded-3xl overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-[#5b6a86] border-b border-slate-200">
                  <th scope="col" className="px-5 py-3 font-bold">
                    Tool name
                  </th>
                  <th scope="col" className="px-5 py-3 font-bold">
                    Borrower name
                  </th>
                  <th scope="col" className="px-5 py-3 font-bold">
                    Return date
                  </th>
                  <th scope="col" className="px-5 py-3 font-bold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    onClick={() => onOpen(loan.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onOpen(loan.id)
                    }}
                    tabIndex={0}
                    className="row-edge border-b border-slate-100 last:border-none cursor-pointer text-[#16224a]"
                  >
                    <td className="px-5 py-3.5 font-bold">{loan.tool_name}</td>
                    <td className="px-5 py-3.5">{loan.borrower_name}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {loan.return_date ? fmtDate(loan.return_date) : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status="Returned" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="md:hidden flex flex-col gap-2 p-3">
            {loans.map((loan) => (
              <li key={loan.id}>
                <button
                  type="button"
                  onClick={() => onOpen(loan.id)}
                    className="hairline hairline-lift w-full text-left rounded-[20px] border border-slate-200 bg-white/80 p-4"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-bold truncate text-[#16224a]">
                      {loan.tool_name}
                    </span>
                    <StatusBadge status="Returned" />
                  </span>
                  <span className="block text-sm text-[#46536e] mt-1">
                    {loan.borrower_name} • returned{' '}
                    {loan.return_date ? fmtDate(loan.return_date) : '—'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AppShell>
  )
}
