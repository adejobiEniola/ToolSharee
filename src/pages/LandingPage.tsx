import { Backdrop, StatusBadge } from '../components/ui'

type Props = {
  onLogin: () => void
  onSignup: () => void
}

const steps = [
  {
    n: '1',
    title: 'Record a loan',
    body: 'Save the tool, the borrower, and the expected return date.',
  },
  {
    n: '2',
    title: 'Track its return',
    body: 'See Borrowed and Overdue loans sorted by due date.',
  },
  {
    n: '3',
    title: 'Mark it returned',
    body: 'Confirm the return and find it later in history.',
  },
]

/** Original workshop illustration in light strokes for the navy stage. */
function WorkshopArtLight() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Illustration of workshop tools hanging on a pegboard"
    >
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={44 + c * 21}
            cy={30 + r * 26}
            r="2.2"
            fill="#7c8fd6"
            opacity="0.55"
          />
        )),
      )}
      <g>
        <rect x="86" y="46" width="10" height="86" rx="5" fill="#9db9ee" />
        <rect x="66" y="32" width="50" height="22" rx="8" fill="#e8efff" />
      </g>
      <g>
        <circle cx="170" cy="46" r="15" fill="none" stroke="#9db9ee" strokeWidth="10" />
        <rect x="164" y="56" width="12" height="78" rx="6" fill="#9db9ee" />
      </g>
      <g>
        <rect x="218" y="36" width="12" height="26" rx="4" fill="#e8efff" />
        <path d="M214 62h22l-4 72h-14z" fill="#5b7fe8" />
      </g>
    </svg>
  )
}

function SampleCard({
  tag,
  tool,
  status,
  line,
  className = '',
}: {
  tag: string
  tool: string
  status: string
  line: string
  className?: string
}) {
  return (
    <div
      className={`hairline rounded-2xl border border-white/25 bg-white/85 p-4 shadow-xl shadow-indigo-950/20 backdrop-blur-md ${className}`}
    >
      <span className="text-[10px] font-bold tracking-[0.2em] text-[#5b6a86]">
        {tag}
      </span>
      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="font-bold text-[#16224a]">{tool}</span>
        <StatusBadge status={status} />
      </div>
      <p className="text-sm text-[#46536e] mt-1">{line}</p>
    </div>
  )
}

export default function LandingPage({ onLogin, onSignup }: Props) {
  return (
    <div className="min-h-dvh">
      <Backdrop />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-10 w-full">
        <header className="rise flex items-center justify-between py-4">
          <span className="text-[#16224a] font-extrabold tracking-[0.18em] text-sm">
            ToolLocker
          </span>
          <nav className="flex gap-2" aria-label="Account">
            <button
              type="button"
              onClick={onLogin}
              className="btn btn-sm btn-soft-lock active:scale-[0.98]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onSignup}
              className="btn btn-sm btn-primary-lock active:scale-[0.98]"
            >
              Get Started
            </button>
          </nav>
        </header>

        <main
          className="rise mt-1 md:mt-3 grid grid-cols-1 md:grid-cols-[1.02fr_1fr] gap-4 items-stretch"
          style={{ animationDelay: '90ms' }}
        >
          {/* Left: headline + actions */}
          <section className="glass hairline rounded-3xl p-6 md:p-9 flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#2456e2]">
              TOOL LENDING TRACKER
            </p>
            <h1 className="text-4xl md:text-[3.4rem] font-extrabold tracking-tight text-[#16224a] mt-3 leading-[1.04]">
              Know who has <span className="text-gradient">your tools.</span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#46536e] max-w-[42ch]">
              ToolLocker is the simple loan ledger for busy workshops. Record
              every borrowed tool, see who is holding it, and mark it
              returned — so nothing goes missing.
            </p>
            <div className="mt-6 flex gap-2 max-w-sm">
              <button
                type="button"
                onClick={onSignup}
                className="btn btn-primary-lock flex-1 justify-center active:scale-[0.98]"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={onLogin}
                className="btn btn-soft-lock flex-1 justify-center active:scale-[0.98]"
              >
                Log in
              </button>
            </div>
          </section>

          {/* Right: dark navy visual stage */}
          <section
            className="hairline relative overflow-hidden rounded-3xl p-6 md:p-7 flex flex-col justify-center"
            style={{
              background:
                'linear-gradient(150deg, #101c44 0%, #1a2c66 60%, #2a3f8f 100%)',
              border: '1px solid rgba(255,255,255,0.16)',
              boxShadow: '0 28px 56px -24px rgba(16,28,68,0.55)',
            }}
            aria-label="Workshop illustration with sample loan cards"
          >
            <div className="glow-spot h-56 w-56 bg-cyan-400/30 -top-10 -right-10" />
            <div className="glow-spot h-64 w-64 bg-violet-500/30 bottom-0 -left-16" />
            <div className="relative">
              <WorkshopArtLight />
            </div>
            <div className="relative mt-2 ml-0 sm:ml-8">
              <SampleCard
                tag="SAMPLE LOAN CARD"
                tool="Angle Grinder 1"
                status="Overdue"
                line="Tunde Bakare • due 26 Sep 2026"
              />
              <SampleCard
                tag="SAMPLE LOAN CARD"
                tool="Makita Drill Pro"
                status="Borrowed"
                line="Adaeze Okafor • due 3 Oct 2026"
                className="-mt-3 ml-6 sm:ml-14 -rotate-1"
              />
            </div>
          </section>
        </main>

        <section
          className="rise mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
          style={{ animationDelay: '180ms' }}
          aria-label="How it works"
        >
          {steps.map((s) => (
            <div key={s.n} className="glass hairline rounded-3xl px-5 py-4">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#2456e2] text-white text-[13px] font-extrabold">
                {s.n}
              </span>
              <h2 className="font-bold text-[15px] text-[#16224a] mt-2">
                {s.title}
              </h2>
              <p className="text-[13px] text-[#46536e] mt-0.5 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
