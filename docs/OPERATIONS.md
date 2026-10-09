# Privacy, Security & Operating Procedures

## Current (local-mode) privacy posture

- **No network transmission of guest data.** RSVPs, wishes, gallery metadata, guest
  invitation records, and analytics events are written only to the visiting browser's
  `localStorage`/`sessionStorage` (see `ARCHITECTURE.md` → Data contracts). Nothing is
  POSTed to a server; there is currently no server to POST to.
- **No file bytes are ever stored.** Photo/video "uploads" in the wishes wall and
  gallery are validated (`src/features/gallery/validation.ts`) and only their
  metadata (name, MIME type, size) is persisted. This is stated in-product to
  guests/organizers on both the wishes and gallery forms.
- **Data is per-browser, not shared.** Because storage is local to a single browser
  profile, a guest's RSVP, an organizer's invitation list, and a QR check-in token
  only exist where they were created. This means:
  - QR check-in codes generated on one device will not resolve on another device's
    browser today ("Pass not found") — expected until Phase 4 provides a shared
    backend.
  - Clearing site data/cache in a browser deletes that browser's local records; there
    is no server copy to recover from.
- **Admin portal has no real authentication.** `/admin/*` is gated by a
  `sessionStorage` flag anyone can set by clicking "Enter local preview" — treat the
  local build as a **demo/rehearsal environment**, not a place to store real guest
  PII you care about protecting. Don't deploy this local build publicly with real
  guest data entered into it.
- **No secrets exist in the repo today.** There are no API keys, connection strings,
  or `.env` files checked in or required, because no external service is called yet.
  `.gitignore` already excludes typical env/secret file patterns.

## What changes at Azure cutover (Phase 4)

Per `TASKS.md`, no Azure resource is created without explicit owner approval of the
proposed subscription, regions, names, SKUs, identity providers, secrets handling, and
data retention (task 22). When that happens, this document should be updated to
reflect:

- Real authentication (Microsoft Entra External ID) replacing the local admin session
  and, if added, guest-facing login.
- Guest PII (name, email, phone, dietary notes) moving into Cosmos DB — encryption at
  rest, access-controlled by Entra roles, and a stated retention/deletion policy.
- Uploaded media moving into Azure Blob Storage with a defined access model (who can
  read guest uploads: organizer only? all guests? time-limited links?).
- Secrets (Cosmos/Blob connection strings, Communication Services keys, Azure OpenAI
  keys) stored in Azure configuration/Key Vault, never committed to the repo.
- A stated retention/deletion procedure for guest data after the event.

## Operating procedures (local mode)

### Running a rehearsal / demo

1. `npm install`, `npm run build`, `npm run start` (or `npm run dev` for iteration).
2. Each browser/device that opens the app has its own independent RSVP list, gallery,
   wishes wall, etc. To demo the full guest → check-in loop, do it in a single
   browser tab/session (see `e2e/guest-journey.spec.ts` for the exact flow).
3. To reset all local demo data in a browser: open DevTools → Application → Storage →
   clear site data for the app's origin (or use a private/incognito window per
   rehearsal).

### Before every merge / release candidate

Run the full local quality gate — all of these are required to pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test        # desktop + mobile/WebKit, includes accessibility scans
```

`e2e/accessibility.spec.ts` scans every guest page plus the organizer portal with
`@axe-core/playwright` against WCAG 2 A/AA tags and fails the build on any violation —
treat a new violation here as a release blocker, not a warning.

### Adding a new local feature

1. Build the UI against a local adapter in `src/features/<domain>/storage.ts`
   following the existing pattern: an injectable `storage` parameter defaulting to
   `window.localStorage`, JSON-serialized values, a `my40plus:*`-namespaced key.
2. Add unit tests for the adapter (validation, persistence, edge cases) — see
   existing `*.test.ts` files in each `features/` folder for the expected style.
3. Add at least one Playwright case exercising the guest or admin flow end-to-end,
   and confirm it's reachable from `e2e/accessibility.spec.ts`'s page list if it's a
   new top-level guest route.
4. Update `docs/ARCHITECTURE.md`'s data contract table with the new storage key/shape.
5. If the feature will eventually need a backend, note the intended Azure service in
   a comment or in this doc so Phase 4 planning stays accurate.

### Incident/bug triage (local mode)

Since there is no production deployment yet, "incidents" are local build regressions.
Triage order:
1. Reproduce with `npm run build && npm run start` (not `npm run dev` — dev-mode
   compile timing differs and can mask or mimic real bugs).
2. Check `npm run typecheck` and `npm run lint` first — most regressions in this
   codebase are typed/linted away before they reach runtime.
3. Re-run the relevant Playwright spec with `--trace on` and inspect via
   `npx playwright show-trace <trace.zip>` for UI/interaction bugs.
