# AGENTS.md — ToolLocker working rules

These rules apply to every agent working in this repo. Follow them always.

1. Never touch `.env`
   - Never create, read, edit, or delete `.env`.
   - Only `.env.example` may be created or edited, and only with variable names, never values.

2. daisyUI ("Devign") components are approved for use
   - Any component from the daisyUI component library may be used.
   - Verify class names against the installed daisyUI version before using them.
   - Do not invent custom components as substitutes without approval.

3. Never let type errors block the build
   - `npm run build` runs `vite build` only (no `tsc`) and must succeed even with type errors present.
   - Never add `tsc` back into the `build` script.
   - Always check for type errors separately with `npm run typecheck` (`tsc --noEmit`) on every change and report the result, but do not hold the build or deploy hostage to them.
   - Fix type errors separately.

4. One thing at a time
   - Do a single task per turn. Finish it, verify it, then stop.
   - Do not bundle extra refactors, features, or cleanups.

5. Ask before installing anything new
   - Never run installs (npm packages, tools, plugins) without explicit approval first.
   - State the package name, version, and why it is needed, then wait.
