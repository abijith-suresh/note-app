# note-app — agent brief
Local-first markdown notes that live in the browser; for agents changing this repo.

## The Project
interleaf is a calm scratchpad for short-lived work notes: it opens straight into writing, keeps everything in the browser with no account, backend, or sync, and treats export (txt, Markdown, ZIP) as the backup path. Notes are disposable by design — no folders, backlinks, or long-lived knowledge management. The product name is `interleaf` while the repo is `note-app`; both are intentional, and renaming either is an owner decision.
Status: dormant — no feature work since Aug 2026.

## How I Work Here
- Commits: Conventional Commits, defined by `commitlint.config.js`; one logical change per PR. Squash merges only; never commit to main.
- PRs: Conventional Commit titles, focused scope, and merge left to the owner.
- Verification: run `verify` before handoff; CI owns the full check. Keep any tests you add focused on what you touched.
- User markdown is untrusted input: keep rendering escaped and URL-allowlisted; never bypass the sanitizer.
- Storage failure is handled by design: notes fall back to memory with a warning banner. That degradation is intentional, not a bug to "fix" by blocking the editor.
- `dayKey` is local time on purpose; do not switch it to UTC.

## Sources of Truth
| Fact | Where |
|---|---|
| Product intent | § The Project (this file) |
| Runtime behavior | code (no test suite) |
| Commands & deps | package.json |
| Commit rules | commitlint.config.js |
Code is the authority; this file never overrides executable truth.
