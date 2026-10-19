# interleaf — agent brief
Local-first markdown notes app that runs entirely in the browser; for agents changing this repo.

## The Project
Core promise: open straight into writing and have notes persist locally with no account, backend, or sync; export (txt / Markdown / ZIP) is the backup path.
Non-goals: no accounts, cloud sync, collaboration, server-side storage, or AI features; no folders or long-lived knowledge management.
Status: dormant — no feature work since Aug 2026. Name collision: the git repo is `note-app`, while the product, package, PWA manifest, DB, and release component are all `interleaf`. Do not rename either side without owner sign-off.

## How I Work Here
- Quality gate: `verify` — run before handoff (`bun run verify` = typecheck + typecheck:node + biome lint + format check). There is no test suite; `verify` plus `bun run build` is the whole gate.
- Commits: Conventional Commits; types live in commitlint.config.js. Header <=72 chars, no trailing period; Husky enforces via commit-msg, CI enforces PR titles. Squash merges; never commit to main.
- Package manager is Bun (pin in .bun-version, Node pin in .node-version); scripts live in package.json, there is no separate task runner.
- Storage is best-effort: when IndexedDB is unavailable the app falls back to in-memory notes and sets `storageError`; never assume a write persisted, and keep the warning banner working (src/stores/notes.ts).
- All rendered markdown must pass through src/utils/markdown.ts (HTML-escaped, URL allowlist http/https/mailto); never render raw `marked` output.
- `dayKey` is a local-time `YYYY-MM-DD` and drives sidebar grouping ("Today"); do not switch it to UTC.

## Sources of Truth
| Fact | Where |
|---|---|
| Product intent | § The Project (this file) |
| Runtime behavior | code (no test suite) |
| Commands & deps | package.json |
| Commit rules | commitlint.config.js |
Code is the authority; this file never overrides executable truth.

## Getting Around
- src/components/ — SolidJS UI: AppShell (orchestration, keybindings, overlays), Sidebar, Editor, SearchOverlay, modals.
- src/editor/ — CodeMirror 6 assembly (index.ts) plus Bear-style markdown decorations in decorations/ and the theme/syntax.
- src/stores/ — global Solid stores: notes (persistence + storage fallback) and ui (theme, active note, overlays).
- src/db/ — IndexedDB access via idb, including schema/upgrade logic.
- src/utils/ — pure helpers: markdown render/sanitize, export filenames and ZIP dedupe, deriveTitle/deriveSlug, dayKey.
- src/pages/ + about|features|privacy|changelog|keyboard-shortcuts/ — static marketing pages; each directory holds the Vite entry HTML fed by src/<page>.tsx into src/pages/<Page>.tsx.
- src/types/ — shared types (NoteRecord).
- vite.config.ts + public/ — multi-entry build, `@` → src alias, and PWA manifest/icons.
