import { useEffect, useState } from 'react'
import { useStore } from '../app/StoreProvider'
import { fmtDate, loanStatus, type Loan } from '../lib/loans'
import AppShell from '../components/AppShell'
import { Icon, ICONS, StatusBadge } from '../components/ui'

type Props = {
  loanId: string
  onEdit: (loan: Loan) => void
  onBack: () => void
  onDashboard: () => void
  onHistory: () => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-slate-200/70 last:border-none">
      <span className="text-sm text-[#5b6a86]">{label}</span>
      <span className="text-sm font-bold text-right text-[#16224a]">
        {value}
      </span>
    </div>
  )
}

export default function LoanDetailsPage({
  loanId,
  onEdit,
  onBack,
  onDashboard,
  onHistory,
}: Props) {
  const { getLoan, markReturned } = useStore()
  const [loan, setLoan] = useState<Loan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getLoan(loanId)
      .then(setLoan)
      .catch(() => setError('Something went wrong. Please try again.'))
      .finally(() => setLoading(false))
  }, [loanId, getLoan])

  async function onMarkReturned() {
    if (!loan) return
    if (!window.confirm('Mark this tool as returned?')) return
    setBusy(true)
    try {
      const updated = await markReturned(loan)
      setLoan(updated)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  const status = loan ? loanStatus(loan) : null

  return (
    <AppShell
      nav={status === 'Returned' ? 'history' : 'dashboard'}
      title="Loan Details"
      subtitle="The full record for this loan."
      onDashboard={onDashboard}
      onHistory={onHistory}
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-bold text-[#2456e2] hover:underline underline-offset-4 mb-3"
      >
        <Icon d={ICONS.back} /> Back
      </button>

      {loading && <p className="text-sm text-[#46536e]">Loading loan…</p>}
      {error && (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      )}
      {loan && status && (
        <div className="rise">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#16224a]">
              {loan.tool_name}
            </h2>
            <StatusBadge status={status} />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="glass hairline rounded-3xl p-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b6a86]">
                Borrower
              </h3>
              <Row label="Name" value={loan.borrower_name} />
              <Row label="Phone" value={loan.phone} />
            </div>
            <div className="glass hairline rounded-3xl p-5">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b6a86]">
                Dates
              </h3>
              <Row label="Borrowing date" value={fmtDate(loan.borrow_date)} />
              <Row
                label="Expected return"
                value={fmtDate(loan.expected_date)}
              />
              {loan.return_date && (
                <Row label="Return date" value={fmtDate(loan.return_date)} />
              )}
            </div>
          </div>

          {status !== 'Returned' && (
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                type="button"
                onClick={() => onEdit(loan)}
                className="btn btn-soft-lock w-full sm:w-auto sm:px-8 border-[#2456e2]/40 text-[#2456e2] active:scale-[0.98]"
              >
                Edit Loan
              </button>
              <button
                type="button"
                onClick={() => void onMarkReturned()}
                disabled={busy}
                className="btn btn-primary-lock w-full sm:w-auto sm:px-8 active:scale-[0.98]"
              >
                {busy ? 'Saving…' : 'Mark Returned'}
              </button>
            </div>
          )}
        </div>
      )}
    </AppShell>
  )
}
