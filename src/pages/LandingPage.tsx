type Props = {
  onLogin: () => void
  onSignup: () => void
}

const tiles = [
  {
    n: '01',
    title: 'Know who has what',
    body: 'Dashboard lists tool, borrower, due date, and status. Nothing else to lose track of.',
  },
  {
    n: '02',
    title: 'Overdue, automatically',
    body: 'Due today stays Borrowed. Tomorrow it turns Overdue. Lagos time, no guessing.',
  },
  {
    n: '03',
    title: 'History that stays',
    body: 'Returned loans go to read-only history. Log out, log back in — still there.',
  },
]

export default function LandingPage({ onLogin, onSignup }: Props) {
  return (
    <div className="min-h-dvh md:h-dvh w-full overflow-x-hidden md:overflow-hidden bg-[#050505] text-[#EDE8DC] flex flex-col p-4 md:p-4 gap-4 md:gap-3">
      <header
        className="tile-enter flex items-center justify-between rounded-2xl border border-[#D4AF37]/20 bg-[#0d0d0d] px-4 py-2.5 shrink-0"
        style={{ animationDelay: '0ms' }}
      >
        <span className="font-extrabold tracking-[0.22em] text-[13px]">
          TOOL<span className="text-[#D4AF37]">LOCKER</span>
        </span>
        <button
          type="button"
          onClick={onLogin}
          className="btn btn-sm bg-[#D4AF37] text-black border-none active:scale-[0.97]"
        >
          Log in
        </button>
      </header>

      <main className="bento-zone md:flex-1 md:min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3">
        <section
          className="tile-enter tile-glow md:col-span-7 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-6 md:p-8 flex flex-col justify-center md:min-h-0"
          style={{ animationDelay: '90ms' }}
        >
          <p className="text-[11px] tracking-[0.3em] text-[#D4AF37]">
            TOOL LENDING TRACKER
          </p>
          <h1 className="font-extrabold leading-[0.95] tracking-tight text-4xl md:text-6xl mt-3">
            LEND
            <br />
            <span className="font-drama font-medium text-[#D4AF37]">
              loudly.
            </span>{' '}
            GET IT BACK.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#c8c4b8] max-w-[38ch]">
            ToolLocker is the private loan ledger for busy workshops — record
            every borrowed tool, see who has it, and never lose a grinder
            again.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-2">
            <button
              type="button"
              onClick={onLogin}
              className="btn bg-[#D4AF37] text-black border-none w-full sm:w-auto justify-center active:scale-[0.97]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onSignup}
              className="btn btn-ghost border border-[#D4AF37]/40 text-[#EDE8DC] w-full sm:w-auto justify-center active:scale-[0.97]"
            >
              Create account
            </button>
          </div>
        </section>

        <div className="md:col-span-5 grid grid-cols-1 gap-4 md:gap-3">
          {tiles.map((t, i) => (
            <section
              key={t.n}
              data-feature-card={t.n}
              className="tile-enter tile-glow h-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 flex flex-col"
              style={{ animationDelay: `${180 + i * 90}ms` }}
            >
              <p className="text-[10px] tracking-[0.25em] text-[#D4AF37]">
                {t.n}
              </p>
              <h2 className="font-bold text-lg mt-1">{t.title}</h2>
              <p className="text-[13px] text-[#9a9a92] mt-1 leading-relaxed">
                {t.body}
              </p>
            </section>
          ))}
        </div>
      </main>

      <footer
        className="tile-enter shrink-0 rounded-2xl bg-[#D4AF37] text-black px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        style={{ animationDelay: '450ms' }}
      >
        <span className="text-[11px] font-bold tracking-[0.2em]">
          BORROWED • OVERDUE • RETURNED
        </span>
        <button
          type="button"
          onClick={onLogin}
          className="font-extrabold text-sm underline underline-offset-4 self-start md:self-auto active:scale-[0.97]"
        >
          Open ToolLocker →
        </button>
      </footer>
    </div>
  )
}
