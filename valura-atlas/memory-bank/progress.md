# Valura UAE — Progress

## What Works
### Phase 1 — Foundation ✅ COMPLETE
- Next.js 14 App Router project with TypeScript (strict)
- All core dependencies installed
- Tailwind brand design tokens (navy/green/mint/cream/gold), custom keyframes
- `next-intl` locale routing: `/en/` and `/ar/` with RTL middleware
- Prisma v7 schema with full data model (User, Auth, GameProfile, World, QuizNode, Question, Option, Badge, Social, Tournament)
- Auth.js v5 configured (Google + Credentials, JWT strategy)
- Zustand `gameStore` with localStorage persist
- Google Fonts: Bricolage Grotesque, Manrope, Inter, IBM Plex Sans Arabic
- `QueryProvider` (TanStack Query v5)
- `Header` with `ContentTrackToggle` + `LocaleSwitcher`
- `Footer` with regulatory disclaimer ("Educational only, not financial advice")
- Landing page shell (`/[locale]`)
- Journey Map stub (`/[locale]/map`)
- `CoinDisplay` client component
- TypeScript clean, Prisma client generated
- `.env.local.example`, `.gitignore`, full `README.md`

## What's In Progress
- Nothing (Phase 1 complete, Phase 2 not started)

## What's Left to Build
### Phase 1 — Foundation ✅ DONE

### Phase 2 — Core Game Loop
- [ ] Level map SVG road (GSAP MotionPath)
- [ ] 15 world nodes data model + content
- [ ] Quiz node component + flow
- [ ] VAL COINS award logic
- [ ] Sanad mascot (Rive integration)
- [ ] Opening cinematic

### Phase 3 — Social Layer
- [ ] Private friend boards
- [ ] Family group quests
- [ ] Pair streaks
- [ ] Weekly tournaments

### Phase 4 — Content
- [ ] All 15 world quiz content
- [ ] Dual-track (Conventional/Islamic) copy
- [ ] Cast character introductions

### Phase 5 — Polish
- [ ] Lottie decorative animations
- [ ] Howler.js audio
- [ ] PostHog analytics
- [ ] Sentry error tracking
- [ ] Resend email flows
- [ ] Admin panel (shadcn/ui)

## Known Issues
- None yet (project not started)

## Milestone History
- 2026-04-28: Project kickoff, memory bank created
- 2026-04-28: Phase 1 complete — full foundation scaffolded, TypeScript clean
