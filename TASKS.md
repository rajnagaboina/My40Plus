# My40+ Implementation Task List

This plan turns the product requirements in `README.md` into testable increments. No Azure resources will be created until the deployment-readiness review is complete and the owner explicitly approves the Azure plan.

## Phase 1 — Local guest experience (MVP)

- [x] 1. Review the PRD and repository; preserve existing user changes.
- [x] 2. Scaffold Next.js 15, React 19, TypeScript, Tailwind CSS, linting, and unit/E2E test tooling.
- [x] 3. Create the luxury-purple design system, responsive app shell, navigation, and reusable accessible components.
- [x] 4. Build the invitation home screen, countdown, event summary, quick actions, animation, confetti, and music controls.
- [x] 5. Build RSVP form and confirmation flow with validation and local persistence; verify attending/maybe/not-attending use cases.
- [x] 6. Build life-journey timeline, media cards, gallery/lightbox, and slideshow behavior.
- [x] 7. Build schedule/calendar views, downloadable ICS file, directions, and add-to-calendar flow.
- [x] 8. Build the event-assistant UI with a grounded local knowledge adapter and required fallback response.
- [x] 9. Build birthday wishes wall, reactions, and locally persisted photo/video metadata.
- [x] 10. Build shared gallery, upload validation, albums, and moderation states using a local storage adapter.
- [x] 11. Build personalized invitation links and guest QR check-in flow.
- [x] 12. Build live-event mode, family tree, event details, and English/Telugu localization foundation.
- [x] 13. Add the PWA manifest, icons, install guidance, service worker, offline page, and safe notification opt-in UX.

## Phase 2 — Local organizer experience

- [x] 14. Build an admin shell and role guard suitable for replacement by Entra External ID.
- [x] 15. Build RSVP dashboard, search, attendance summary, analytics, and CSV export.
- [x] 16. Build local content-management screens for invitation, timeline, schedule, family tree, gallery moderation, and AI knowledge.
- [x] 17. Build check-in dashboard, invitation-link management, and local analytics dashboard.

## Phase 3 — Quality and readiness

- [x] 18. Add unit/integration tests for validation, adapters, calendar generation, localization, assistant grounding, and permissions.
- [x] 19. Add end-to-end guest and admin use cases for mobile and desktop viewports.
- [x] 20. Run lint, type-check, tests, production build, accessibility checks, and PWA verification; resolve failures.
- [x] 21. Document local setup, configuration, architecture decisions, data contracts, privacy/security considerations, and operating procedures.

## Phase 4 — Azure integration (requires explicit approval)

- [ ] 22. Present the proposed subscription, regions, resource names, resource groups, environments, SKUs/budget, domain/DNS, identity providers, secrets, data retention, and notification sender details for owner approval.
- [ ] 23. After approval, create infrastructure-as-code for Azure Static Web Apps, Functions, Cosmos DB, Blob Storage, AI Search, Azure OpenAI, Communication Services, monitoring, and Entra External ID.
- [ ] 24. Replace local adapters with Azure implementations and run integration/security tests.
- [ ] 25. Configure CI/CD and a staging environment; obtain release approval before production deployment.
- [ ] 26. Deploy production, run smoke tests, and provide the runbook and resource inventory.

## Deferred/optional product work

- [ ] AI-generated memory-highlight MP4 pipeline and shareable output.
- [ ] Rich social/print invitation-card rendering variants.
- [ ] Production web-push provider integration (browser/platform support permitting).

## Working rules

- Complete tasks in order unless a dependency requires a small adjacent change.
- Every feature must include representative local use cases and verification.
- Use local/mock adapters before cloud provisioning so the app remains runnable without Azure credentials.
- Never create, change, or delete Azure resources without explicit owner approval of the deployment details.
- Never commit secrets or personal guest data.
