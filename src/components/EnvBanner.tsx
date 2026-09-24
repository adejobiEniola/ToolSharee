import { supabase, supabaseMissingVars } from '../lib/supabaseClient'

export default function EnvBanner() {
  if (supabase) return null

  return (
    <div className="alert alert-warning rounded-none" role="alert">
      <span>
        Not connected to the database yet (missing{' '}
        {supabaseMissingVars.join(', ')}). Copy <code>.env.example</code> to{' '}
        <code>.env</code>, fill in those values, and restart the app. What
        you see is a preview only.
      </span>
    </div>
  )
}
