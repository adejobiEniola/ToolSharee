// ToolLocker domain: types, Africa/Lagos dates, statuses, validation.
// Rules mirror onePage.md exactly.

export type Loan = {
  id: string
  user_id: string
  tool_name: string
  borrower_name: string
  phone: string
  borrow_date: string // YYYY-MM-DD
  expected_date: string // YYYY-MM-DD
  return_date: string | null // YYYY-MM-DD
}

export type Status = 'Borrowed' | 'Overdue' | 'Returned'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/** Today's date in Africa/Lagos as YYYY-MM-DD. */
export function lagosToday(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

/** Display format: `24 Sep 2026`. Parses parts directly — no timezone shift. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/**
 * Borrowed = not returned and expected date has not passed.
 * Overdue = not returned and expected date has passed.
 * Due today stays Borrowed until tomorrow (Lagos time).
 */
export function loanStatus(loan: Loan, today: string = lagosToday()): Status {
  if (loan.return_date) return 'Returned'
  return loan.expected_date < today ? 'Overdue' : 'Borrowed'
}

export const MAX_TOOL = 100
export const MAX_BORROWER = 100
export const MAX_PHONE = 30

function required(value: string, label: string, max: number): string | null {
  if (!value.trim()) return `${label} is required.`
  if (value.length > max) return `${label} must be ${max} characters or fewer.`
  return null
}

export type LoanInput = {
  tool_name: string
  borrower_name: string
  phone: string
  expected_date: string
}

/** Validate shared fields. For new loans, expected date must be today or later. */
export function validateLoan(input: LoanInput, isNew: boolean): string | null {
  return (
    required(input.tool_name, 'Tool name', MAX_TOOL) ??
    required(input.borrower_name, 'Borrower name', MAX_BORROWER) ??
    required(input.phone, 'Phone number', MAX_PHONE) ??
    (!input.expected_date ? 'Expected return date is required.' : null) ??
    (isNew && input.expected_date < lagosToday()
      ? 'Expected return date must be today or later.'
      : null)
  )
}
