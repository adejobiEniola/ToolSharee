import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../app/StoreProvider'
import { fmtDate, loanStatus, type Loan } from '../lib/loans'
import AppShell from '../components/AppShell'
import { EmptyState, Icon, ICONS, StatusBadge } from '../components/ui'

type Props = {
  onAdd: () => void
  onOpen: (id: string) => void
  onHistory: () => void
  onDashboard: () => void
}

type StatusFilter = 'all' | 'Borrowed' | 'Overdue'

export default function DashboardPage({ onAdd, onOpen, onHistory, onDashboard }: Props) {
  const { outstanding } = useStore()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    outstanding()
      .then(setLoans)
      .catch(() => setError('Something went wrong. Please try again.'))
      .finally(() => setLoading(false))
  }, [outstanding])

  const visible = useMemo(() => {
    return loans
      .map((l) => ({ loan: l, status: loanStatus(l) }))
      .filter(({ status }) => statusFilter === 'all' || status === statusFilter)
      .filter(({ loan }) => !dateFilter || loan.expected_date === dateFilter)
  }, [loans, statusFilter, dateFilter])

  function clearFilters() {
    setStatusFilter('all')
    setDateFilter('')
  }

  return (
    <AppShell
      nav="dashboard"
      title="Dashboard"
      subtitle="Every outstanding loan — who has what, and when it is due."
      onDashboard={onDashboard}
      onHistory={onHistory}
      actions={
        <button
          type="button"
          onClick={onAdd}
          className="btn btn-primary-lock active:scale-[0.98]"
        >
          <Icon d={ICONS.plus} /> Add Loan
        </button>
      }
    >
      {/* Filter toolbar */}
      <div className="surface-solid hairline rounded-3xl p-3 md:p-4 flex flex-col md:flex-row gap-2 md:items-center">
        <label className="flex-1">
          <span className="sr-only">Filter by status</span>
          <select
            className="select select-bordered w-full bg-white/80 field-lock"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="all">All Outstanding</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
        <label className="flex-1">
          <span className="sr-only">Filter by expected return date</span>
          <input
            type="date"
            className="input input-bordered w-full bg-white/80 field-lock"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            aria-label="Filter by expected return date"
          />
        </label>
          <button
            type="button"
            onClick={clearFilters}
            disabled={statusFilter === 'all' && !dateFilter}
            className="btn btn-soft-lock whitespace-nowrap active:scale-[0.98]"
          >
            Clear filters
          </button>
        </div>

        {/* Active filter chips — makes the current selection explicit */}
        {(statusFilter !== 'all' || dateFilter) && (
          <div className="mt-2 flex flex-wrap gap-2" aria-live="polite">
            {statusFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="inline-flex items-center gap-1 rounded-full border border-[#2456e2]/30 bg-white/80 px-3 py-1 text-xs font-bold text-[#2456e2] transition-colors duration-200 hover:border-[#2456e2]"
                aria-label="Remove status filter"
              >
                {statusFilter} ×
              </button>
            )}
            {dateFilter && (
              <button
                type="button"
                onClick={() => setDateFilter('')}
                className="inline-flex items-center gap-1 rounded-full border border-[#2456e2]/30 bg-white/80 px-3 py-1 text-xs font-bold text-[#2456e2] transition-colors duration-200 hover:border-[#2456e2]"
                aria-label="Remove date filter"
              >
                Due {fmtDate(dateFilter)} ×
              </button>
            )}
          </div>
        )}

      {/* Loan panel */}
      <div className="mt-4 surface-solid hairline rounded-3xl overflow-hidden">
        {loading && (
          <p className="p-6 text-sm text-[#46536e]">Loading loans…</p>
        )}
        {error && (
          <div className="m-4 alert alert-error" role="alert">
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div className="p-4">
            <EmptyState
              message={
                loans.length === 0
                  ? 'No outstanding loans.'
                  : 'No loans match these filters.'
              }
            />
          </div>
        )}

        {/* Table — tablet and desktop */}
        {!loading && !error && visible.length > 0 && (
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
                    Expected return date
                  </th>
                  <th scope="col" className="px-5 py-3 font-bold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map(({ loan, status }) => (
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
                      {fmtDate(loan.expected_date)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cards — phones */}
        {!loading && !error && visible.length > 0 && (
          <ul className="md:hidden flex flex-col gap-2 p-3">
            {visible.map(({ loan, status }) => (
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
                    <StatusBadge status={status} />
                  </span>
                  <span className="block text-sm text-[#46536e] mt-1">
                    {loan.borrower_name} • due {fmtDate(loan.expected_date)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}
