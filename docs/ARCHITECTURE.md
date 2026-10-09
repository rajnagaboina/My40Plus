# Architecture

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, hand-rolled "luxury purple" design tokens
  (`tailwind.config.ts`), Framer Motion for animation
- **Forms/validation**: `react-hook-form` + `zod`
- **Testing**: Vitest + Testing Library (unit/integration), Playwright + axe-core
  (end-to-end and accessibility)
- **PWA**: hand-written `public/sw.js` service worker, `src/app/manifest.ts` route,
  `src/components/pwa/pwa-client.tsx` for install-prompt/notification UX

## Route map

```
src/app/
├── page.tsx              guest home / invitation
├── rsvp/                 RSVP form + confirmation
├── timeline/              life-journey timeline & gallery/slideshow
├── calendar/              schedule, ICS export, directions
├── assistant/             grounded event assistant
├── wishes/                birthday wishes wall
├── gallery/                shared guest gallery + upload
├── family/                family tree
├── live/                   live event mode
├── details/                 event details
├── installation/           PWA install guidance
├── invitations/             general invitation info
├── invite/[token]/          personalized invitation + QR check-in pass
├── check-in/[token]/        guest self check-in
├── offline/                  service-worker offline fallback
└── admin/                   organizer portal (guarded by AdminGuard)
    ├── rsvps/  content/  knowledge/  invitations/  check-in/  moderation/  analytics/
```

Each route is a thin server component that renders a client component from
`src/features/<domain>/`. Domain code (storage, validation, business logic) lives in
`src/features/<domain>/*.ts`, UI in `*.tsx`, colocated `*.test.ts(x)` files.

## Key architecture decisions

1. **Local-first adapters, Azure-shaped seams.** Every feature that will need a
   backend (RSVPs, gallery, wishes, guest invitations, admin auth, analytics, AI
   assistant) is built today behind a small module with a narrow read/write API
   (e.g. `readRsvps()`/`saveRsvp()`), backed by `localStorage`/`sessionStorage`. The
   goal is that swapping the local adapter for an Azure Functions + Cosmos DB
   implementation (Phase 4) means replacing the inside of these modules, not the
   React components that call them. Every storage function accepts an injectable
   `storage` parameter (defaulting to `window.localStorage`) purely so unit tests can
   pass an in-memory fake instead of touching real browser storage.

2. **No client secrets, no network calls, by design.** Because nothing calls a real
   backend yet, there is nothing to authenticate to and no API key surface to leak.
   This was a deliberate simplification for Phase 1–3: it keeps the app runnable by
   anyone with no setup, and it means there is currently no attack surface for
   credential leakage. See `OPERATIONS.md` for what changes once Azure is approved.

3. **Admin "auth" is a local preview session, not real authentication.**
   `AdminGuard` (`src/features/admin/admin-guard.tsx`) gates `/admin/*` behind a
   button that writes a `sessionStorage` flag — anyone with the URL and a browser can
   click through it. This is intentional and documented in-product ("This is not
   production authentication") so the local demo can be shared without implying a
   security boundary that doesn't exist yet. It is a placeholder for Microsoft Entra
   External ID (Phase 4, task 23) and must not be treated as access control.

4. **Admin content/knowledge drafts are not yet wired to the live pages.** The
   Content management and AI knowledge editors save to `my40plus:content-drafts` so
   an organizer can rehearse the editing workflow, but the guest-facing pages
   (`src/config/event.ts`, `src/features/assistant/knowledge.ts`) still read from
   static TypeScript source. Connecting drafts to live content requires either a
   build-time content source or the Azure content API from Phase 4 — deferred so the
   local admin UI could ship without a half-built persistence layer.

5. **The AI assistant is a keyword-matched local knowledge base, not an LLM.**
   `answerEventQuestion()` scores fixed knowledge entries by keyword overlap and
   returns a single fallback string ("I could not find that information in the event
   details.") when nothing scores above zero. This directly implements the PRD's
   "answer using supplied event information only" requirement and its required
   fallback, without needing an Azure OpenAI / RAG deployment to demo the feature
   end-to-end. The real RAG pipeline (Azure AI Search + Azure OpenAI) is scoped to
   Phase 4.

6. **Media uploads store metadata only, never bytes.** `validateMedia()`
   (`src/features/gallery/validation.ts`) checks MIME type and size, and both the
   gallery and wishes wall persist `{ name, type, size }` alongside the guest's
   caption/contributor — never the file itself. This avoids ever putting guest photo
   or video bytes in `localStorage` (which has strict size limits and is not meant
   for binary blobs) and keeps the local build's storage footprint tiny. Azure Blob
   Storage upload is explicitly deferred to Phase 4 in both the PRD and the in-app
   copy shown to guests/organizers.

7. **QR check-in is a signed-nothing local token, not a capability grant.** Guest
   invitation tokens (`crypto.randomUUID()`-based, see `src/features/guests/storage.ts`)
   are opaque IDs used to look up a guest record in the *same browser's*
   `localStorage`. They are not signed or verifiable across devices today — a QR
   code scanned on a different device/browser than the one that created the
   invitation will show "Pass not found" because there is no shared backend yet. This
   is expected local-mode behavior, not a bug; it becomes a real cross-device flow
   once Cosmos DB-backed guest records exist (Phase 4).

8. **E2E tests run against a production build, not `next dev`.** `playwright.config.ts`
   points its `webServer` at `npm run build && npm run start` rather than `npm run
   dev`. Dev-mode's on-demand route compilation caused route-dependent first-hit
   latency that looked like flaky tests; testing the production server is also more
   representative of what guests will actually use.

## Data contracts (local storage)

All keys are namespaced `my40plus:*`. Values are JSON-serialized. None of this data
is sent anywhere; it lives only in the guest's or organizer's browser.

| Key | Storage | Shape | Written by |
| --- | --- | --- | --- |
| `my40plus:rsvps` | `localStorage` | `StoredRsvp[]` — `{ id, fullName, email, phone?, attendance: "attending"\|"maybe"\|"not-attending", guestCount, dietaryPreferences?, message?, submittedAt }` | `src/features/rsvp/storage.ts` |
| `my40plus:wishes` | `localStorage` | `Wish[]` — `{ id, author, message, media?: { name, type, size }, reactions, createdAt }` | `src/features/wishes/storage.ts` |
| `my40plus:gallery` | `localStorage` | `GalleryItem[]` — `{ id, name, mimeType, mediaType: "photo"\|"video", size, album, contributor, caption?, status: "pending"\|"approved"\|"rejected" }` | `src/features/gallery/storage.ts` |
| `my40plus:guest-invitations` | `localStorage` | `GuestInvitation[]` — `{ token, name, createdAt, checkedInAt? }` | `src/features/guests/storage.ts` |
| `my40plus:content-drafts` | `localStorage` | `Partial<Record<"invitation"\|"timeline"\|"schedule"\|"family"\|"knowledge", string>>` | `src/features/admin/content-store.ts` |
| `my40plus:analytics` | `localStorage` | `AnalyticsEvent[]` — `{ name: AnalyticsEventName, path, at }` (event names: `page_view`, `rsvp_submit`, `calendar_add`, `ai_question`, `media_upload`, `wish_post`, `guest_check_in`) | `src/features/analytics/storage.ts` |
| `my40plus:language` | `localStorage` | `"en" \| "te"` | `src/features/i18n/language-provider.tsx` |
| `my40plus:admin-session` | `sessionStorage` | `{ role: "admin", displayName, issuedAt }` | `src/features/admin/auth.ts` |

These shapes are the contract every local adapter honors today and the shape any
future Cosmos DB collection (Phase 4: Guests, RSVPs, Wishes, etc.) should be able to
round-trip without a UI-level rewrite.

## Localization

`src/features/i18n/translations.ts` holds parallel English/Telugu string tables keyed
by the same set of navigation labels; `LanguageProvider` (React context) exposes the
active language and a `setLanguage` toggle, persisted to `localStorage` and reflected
onto `<html lang>`. Adding a language means adding a new key to `translations` with
the same shape as `en`/`te` — `translations.test.ts` enforces the key sets stay in
sync.
