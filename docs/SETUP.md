# Local Setup & Configuration

My40+ currently runs entirely in local/guest-mode: there is no backend, database, or
cloud account required to develop or demo the app. Everything a guest or organizer
does is stored in the browser (`localStorage`/`sessionStorage`).

## Prerequisites

- Node.js 20+ and npm
- A Chromium-, WebKit-, or Firefox-based browser for manual testing
- No `.env` file, API keys, or Azure credentials are required at this stage

## Install

```bash
npm install
```

## Everyday commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server at http://localhost:3000 |
| `npm run build` | Production build (also type-checks and lints via Next's build step) |
| `npm run start` | Serve the production build (`npm run build` first) |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`), zero warnings allowed |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Unit/integration tests (Vitest + Testing Library, jsdom) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright end-to-end suite (desktop + mobile/WebKit projects) |

## Running the E2E suite

`playwright.config.ts` builds and starts a production server (`npm run build && npm run
start`) on `127.0.0.1:3000` before running tests, then runs every spec against two
projects: `desktop` (Desktop Chrome) and `mobile` (iPhone 13 / WebKit). First run needs
browser binaries:

```bash
npx playwright install --with-deps
```

The suite includes:

- `e2e/home.spec.ts`, `e2e/mobile.spec.ts` — original smoke tests
- `e2e/guest-journey.spec.ts` — RSVP variants, wishes, gallery upload, family tree,
  live mode, localization, and the full invite → RSVP → check-in flow
- `e2e/admin-management.spec.ts` — content/knowledge drafts, moderation approval,
  analytics, CSV export
- `e2e/accessibility.spec.ts` — `@axe-core/playwright` scans (WCAG 2 A/AA) of every
  guest page and the organizer portal

`e2e/fixtures.ts` wraps `page.goto` to wait for `networkidle` before returning control
to a test. This was added because WebKit occasionally accepts the first `fill()` on a
page before hydration finishes, silently dropping the keystrokes — waiting for
`networkidle` avoids that class of flake without slowing down Chromium runs
meaningfully.

## Local "adapters" instead of cloud services

Every feature that will eventually call an Azure service is implemented today against
a local adapter, so the app is fully runnable offline and with no credentials:

- RSVPs, wishes, gallery uploads, guest invitations/check-ins, admin content drafts,
  and analytics events all read/write `localStorage`.
- The organizer portal uses a `sessionStorage`-backed "local preview" session
  (`src/features/admin/auth.ts`) instead of real authentication.
- The AI assistant (`src/features/assistant/knowledge.ts`) answers from a small
  in-memory keyword-matched knowledge base, with a fixed fallback string when nothing
  matches, instead of calling an LLM/RAG pipeline.
- File uploads (wishes, gallery) validate and store **metadata only** (name, MIME
  type, size); no binary bytes are persisted anywhere, local or remote.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the data contracts these adapters
expose, and [`OPERATIONS.md`](./OPERATIONS.md) for what that means for privacy today
and after the Azure cutover.

## Editing event content

Static event details (date, venue placeholder, dress code, invitation copy) live in
[`src/config/event.ts`](../src/config/event.ts). The AI assistant's grounded answers
live in [`src/features/assistant/knowledge.ts`](../src/features/assistant/knowledge.ts).
Both are plain TypeScript objects — no build step or admin action is required to
change them, though the admin **Content management** and **AI knowledge** screens let
an organizer draft replacements locally (drafts are stored under
`my40plus:content-drafts` and are not yet wired back into the live pages — see
Architecture Decision 4).
