# Contributing

## Working agreements

- Quality gate: run `bun run verify` before handoff. Keep any tests you add focused on what you touched; CI owns the full check.
- Commits: Conventional Commits — the allowed types live in `commitlint.config.js`. One logical change per PR.
- PRs: Conventional Commit titles, focused scope, and the merge left to the owner. Squash merge only; never commit to `main`.

## Traps

- User markdown is untrusted input: keep rendering escaped and URL-allowlisted; never bypass the sanitizer.
- Storage failure is handled by design: notes fall back to memory with a warning banner. That degradation is intentional, not a bug to "fix" by blocking the editor.
- `dayKey` is local time on purpose; do not switch it to UTC.
