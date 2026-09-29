import { useState, type FormEvent } from 'react'
import { useStore } from '../app/StoreProvider'
import {
  MAX_BORROWER,
  MAX_PHONE,
  MAX_TOOL,
  validateLoan,
  type Loan,
} from '../lib/loans'
import AppShell from '../components/AppShell'
import { Field } from '../components/ui'

type Props = {
  loan: Loan | null // null = add new
  onSaved: (loan: Loan) => void
  onCancel: () => void
  onDashboard: () => void
  onHistory: () => void
}

export default function LoanFormPage({
  loan,
  onSaved,
  onCancel,
  onDashboard,
  onHistory,
}: Props) {
  const { createLoan, updateLoan, userEmail } = useStore()
  const [tool, setTool] = useState(loan?.tool_name ?? '')
  const [borrower, setBorrower] = useState(loan?.borrower_name ?? '')
  const [phone, setPhone] = useState(loan?.phone ?? '')
  const [expected, setExpected] = useState(loan?.expected_date ?? '')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const input = {
      tool_name: tool,
      borrower_name: borrower,
      phone,
      expected_date: expected,
    }
    const invalid = validateLoan(input, loan === null)
    if (invalid) {
      setError(invalid)
      return
    }
    if (!userEmail) {
      setError('You are not logged in.')
      return
    }
    setBusy(true)
    try {
      const saved =
        loan === null
          ? await createLoan(input)
          : await updateLoan(loan, input)
      onSaved(saved)
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

  return (
    <AppShell
      nav="dashboard"
      title={loan === null ? 'Add Loan' : 'Edit Loan'}
      subtitle={
        loan === null
          ? 'Record who is taking the tool and when it is due back.'
          : 'Update the details of this unreturned loan.'
      }
      onDashboard={onDashboard}
      onHistory={onHistory}
    >
      <div className="glass hairline rounded-3xl shadow-xl max-w-xl">
        <form className="p-5 md:p-7" onSubmit={onSubmit} noValidate>
          {error && (
            <div className="alert alert-error mb-3" role="alert">
              <span>{error}</span>
            </div>
          )}
          <Field label="Tool name">
            <input
              className="input input-bordered w-full bg-white/85 field-lock"
              value={tool}
              maxLength={MAX_TOOL}
              onChange={(e) => setTool(e.target.value)}
              placeholder="Angle Grinder 1"
            />
          </Field>
          <Field label="Borrower name">
            <input
              className="input input-bordered w-full bg-white/85 field-lock"
              value={borrower}
              maxLength={MAX_BORROWER}
              onChange={(e) => setBorrower(e.target.value)}
            />
          </Field>
          <Field label="Phone number">
            <input
              className="input input-bordered w-full bg-white/85 field-lock"
              value={phone}
              maxLength={MAX_PHONE}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
            />
          </Field>
          <Field label="Expected return date">
            <input
              type="date"
              className="input input-bordered w-full bg-white/85 field-lock"
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
            />
          </Field>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-soft-lock flex-1 active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary-lock flex-1 active:scale-[0.98]"
            >
              {busy ? 'Saving…' : loan === null ? 'Save' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
