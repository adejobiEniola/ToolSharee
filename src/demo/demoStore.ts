import {
  lagosToday,
  loanStatus,
  type Loan,
  type LoanInput,
} from '../lib/loans'

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + days)
  return dt.toISOString().slice(0, 10)
}

/** Clearly labelled sample loans covering every status. */
export function seedDemoLoans(): Loan[] {
  const t = lagosToday()
  return [
    {
      id: 'demo-1',
      user_id: 'demo-user',
      tool_name: 'Angle Grinder 1',
      borrower_name: 'Tunde Bakare',
      phone: '0803 441 2098',
      borrow_date: addDays(t, -9),
      expected_date: addDays(t, -3),
      return_date: null, // Overdue
    },
    {
      id: 'demo-2',
      user_id: 'demo-user',
      tool_name: 'Makita Drill Pro',
      borrower_name: 'Adaeze Okafor',
      phone: '0812 009 3341',
      borrow_date: addDays(t, -2),
      expected_date: addDays(t, 4),
      return_date: null, // Borrowed
    },
    {
      id: 'demo-3',
      user_id: 'demo-user',
      tool_name: 'Circular Saw 500W',
      borrower_name: 'Emeka Nwosu',
      phone: '0805 772 1104',
      borrow_date: addDays(t, -1),
      expected_date: t, // Borrowed — due today
      return_date: null,
    },
    {
      id: 'demo-4',
      user_id: 'demo-user',
      tool_name: 'Welding Inverter',
      borrower_name: 'Ibrahim Musa',
      phone: '0703 118 9920',
      borrow_date: addDays(t, -10),
      expected_date: addDays(t, -5),
      return_date: addDays(t, -2), // Returned
    },
    {
      id: 'demo-5',
      user_id: 'demo-user',
      tool_name: 'Ladder 2m',
      borrower_name: 'Funke Adeleke',
      phone: '0816 204 7735',
      borrow_date: addDays(t, -20),
      expected_date: addDays(t, -15),
      return_date: addDays(t, -12), // Returned
    },
  ]
}

function notFound(): Error {
  return new Error('Something went wrong. Please try again.')
}

/** Temporary in-memory demo backend. Resets on refresh. */
export function createDemoStore() {
  let loans = seedDemoLoans()

  const outstanding = async (): Promise<Loan[]> =>
    loans
      .filter((l) => loanStatus(l) !== 'Returned')
      .sort((a, b) => (a.expected_date < b.expected_date ? -1 : 1))

  const returned = async (): Promise<Loan[]> =>
    loans
      .filter((l) => loanStatus(l) === 'Returned')
      .sort((a, b) => ((a.return_date ?? '') > (b.return_date ?? '') ? -1 : 1))

  return {
    reset: () => {
      loans = seedDemoLoans()
    },
    outstanding,
    returned,
    getLoan: async (id: string): Promise<Loan> => {
      const found = loans.find((l) => l.id === id)
      if (!found) throw notFound()
      return found
    },
    createLoan: async (input: LoanInput): Promise<Loan> => {
      const loan: Loan = {
        id: `demo-${Date.now()}`,
        user_id: 'demo-user',
        tool_name: input.tool_name.trim(),
        borrower_name: input.borrower_name.trim(),
        phone: input.phone.trim(),
        borrow_date: lagosToday(),
        expected_date: input.expected_date,
        return_date: null,
      }
      loans = [loan, ...loans]
      return loan
    },
    updateLoan: async (loan: Loan, input: LoanInput): Promise<Loan> => {
      if (loanStatus(loan) === 'Returned') {
        throw new Error('Returned loans cannot be edited.')
      }
      const updated: Loan = {
        ...loan,
        tool_name: input.tool_name.trim(),
        borrower_name: input.borrower_name.trim(),
        phone: input.phone.trim(),
        expected_date: input.expected_date,
      }
      loans = loans.map((l) => (l.id === loan.id ? updated : l))
      return updated
    },
    markReturned: async (loan: Loan): Promise<Loan> => {
      const updated: Loan = { ...loan, return_date: lagosToday() }
      loans = loans.map((l) => (l.id === loan.id ? updated : l))
      return updated
    },
  }
}

export type DemoStore = ReturnType<typeof createDemoStore>
