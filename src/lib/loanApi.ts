import { supabase } from './supabaseClient'
import { lagosToday, loanStatus, type Loan, type LoanInput } from './loans'

function mustDb() {
  if (!supabase) throw new Error('Database is not connected yet.')
  return supabase
}

const COLS =
  'id, user_id, tool_name, borrower_name, phone, borrow_date, expected_date, return_date'

function rowToLoan(row: Record<string, string | null>): Loan {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    tool_name: (row.tool_name as string) ?? '',
    borrower_name: (row.borrower_name as string) ?? '',
    phone: (row.phone as string) ?? '',
    borrow_date: row.borrow_date as string,
    expected_date: row.expected_date as string,
    return_date: row.return_date,
  }
}

/** Outstanding = Borrowed + Overdue, sorted by expected date, earliest first. */
export async function fetchOutstanding(): Promise<Loan[]> {
  const { data, error } = await mustDb()
    .from('loans')
    .select(COLS)
    .is('return_date', null)
    .order('expected_date', { ascending: true })
  if (error) throw error
  return (data as unknown as Record<string, string | null>[]).map(rowToLoan)
}

/** Returned only, sorted by actual return date, newest first. */
export async function fetchReturned(): Promise<Loan[]> {
  const { data, error } = await mustDb()
    .from('loans')
    .select(COLS)
    .not('return_date', 'is', null)
    .order('return_date', { ascending: false })
  if (error) throw error
  return (data as unknown as Record<string, string | null>[]).map(rowToLoan)
}

export async function fetchLoan(id: string): Promise<Loan> {
  const { data, error } = await mustDb()
    .from('loans')
    .select(COLS)
    .eq('id', id)
    .single()
  if (error) throw error
  return rowToLoan(data as unknown as Record<string, string | null>)
}

/** New loan: borrowing date recorded automatically, expected must be today+. */
export async function createLoan(
  userId: string,
  input: LoanInput,
): Promise<Loan> {
  const { data, error } = await mustDb()
    .from('loans')
    .insert({
      user_id: userId,
      tool_name: input.tool_name.trim(),
      borrower_name: input.borrower_name.trim(),
      phone: input.phone.trim(),
      borrow_date: lagosToday(),
      expected_date: input.expected_date,
      return_date: null,
    })
    .select(COLS)
    .single()
  if (error) throw error
  return rowToLoan(data as unknown as Record<string, string | null>)
}

/** Edit unreturned loan. Expected date may move to the past (→ Overdue). */
export async function updateLoan(
  loan: Loan,
  input: LoanInput,
): Promise<Loan> {
  if (loanStatus(loan) === 'Returned') {
    throw new Error('Returned loans cannot be edited.')
  }
  const { data, error } = await mustDb()
    .from('loans')
    .update({
      tool_name: input.tool_name.trim(),
      borrower_name: input.borrower_name.trim(),
      phone: input.phone.trim(),
      expected_date: input.expected_date,
    })
    .eq('id', loan.id)
    .select(COLS)
    .single()
  if (error) throw error
  return rowToLoan(data as unknown as Record<string, string | null>)
}

/** Mark returned: today's Lagos date becomes the actual return date. */
export async function markReturned(loan: Loan): Promise<Loan> {
  const { data, error } = await mustDb()
    .from('loans')
    .update({ return_date: lagosToday() })
    .eq('id', loan.id)
    .select(COLS)
    .single()
  if (error) throw error
  return rowToLoan(data as unknown as Record<string, string | null>)
}
