# Valura UAE — Active Context

## Current Focus
**Phase 2 — Core game loop**: Level map SVG road, quiz node component, VAL Coins flow, Sanad mascot, opening cinematic.

## Completed (Prompts 1–3)
### Prompt 1 — Project Init
- Tailwind v4 upgraded; CSS-first config via `@theme` in `globals.css` (no `tailwind.config.ts`)
- `@tailwindcss/postcss` PostCSS plugin wired in `postcss.config.mjs`
- Brand tokens (`--color-navy`, `--color-green`, `--color-mint`, `--color-cream`, `--color-gold`) in `@theme` block
- Dark-mode aware CSS variables: `:root` / `[data-theme="dark"]`
- Husky + lint-staged configured (`pre-commit` hook runs ESLint + Prettier)
- Prettier + `prettier-plugin-tailwindcss` + `eslint-config-prettier`
- Full folder structure: `(marketing)`, `(app)`, `components/levels`, `lib/db`, `lib/game`, `lib/i18n`, `public/audio`, `public/illustrations`, `public/rive`
- Radix UI primitives: Dialog, DropdownMenu, Tabs, Toast, Label, Separator, Switch, Avatar, Progress
- Twilio installed for Phone-OTP

### Prompt 2 — Prisma Schema (detailed)
- Enums: AvatarType (FIGURE/HOME/GARDEN), ContentTrack, UserContentTrack, TonePref, Role, NodeKind, QuestionKind, FriendshipStatus, PledgeStatus
- User model: phoneE164, displayName, avatarType, locale, contentTrack, tonePref, lifeStage, totalXP, valCoins, currentLevel, weeklyStreakCount, streakFreezeCount, role
- World → Node → Question → Choice hierarchy
- Attempt, Mastery (SM-2 spaced repetition), Badge, UserBadge, CoinTxn
- Friendship, FamilyGroup, FamilyMembership, Pledge, WeeklyTournament, TournamentEntry
- Proper indexes on all high-read paths

### Prompt 3 — Auth
- Auth.js v5: Email magic-link (Resend), Google, Apple, Phone-OTP (Twilio Verify)
- `lib/auth-helpers.ts`: `getSession()`, `requireAuth()`, `getCurrentUserId()`
- `<AuthProvider>` wrapper (NextAuth SessionProvider)
- `POST /api/auth/send-otp` — Twilio Verify endpoint
- Sign-in page (`/[locale]/(auth)/sign-in`) with 3 tabs:
  - Email: magic-link via Resend, success state
  - Phone: 2-step (phone → OTP) with UAE +971 default
  - Social: Google + Apple OAuth buttons
- `components/ui/`: Button (CVA variants), Input, Label
- CBUAE disclaimer at bottom of sign-in page

## Status
✅ Phase 1 complete — full foundation scaffolded.

## Completed (Phase 1)
1. ✅ Memory bank created
2. ✅ Next.js 14 + TypeScript + App Router initialised
3. ✅ All core dependencies installed
4. ✅ Tailwind brand tokens (navy, green, mint, cream, gold) + custom animations
5. ✅ next-intl EN/AR with RTL middleware
6. ✅ Prisma v7 schema — full data model (User, GameProfile, World, QuizNode, Question, Badge, Social)
7. ✅ Auth.js v5 with Google + Credentials providers
8. ✅ Zustand gameStore with persist middleware
9. ✅ Base layout shell: [locale]/layout.tsx with Google Fonts (Bricolage, Manrope, Inter, IBM Plex Arabic)
10. ✅ QueryProvider (TanStack Query v5)
11. ✅ Header, Footer (with disclaimer), LocaleSwitcher, ContentTrackToggle
12. ✅ Landing page (`/[locale]`) cinematic opening shell
13. ✅ Map page stub (`/[locale]/map`)
14. ✅ CoinDisplay client component
15. ✅ TypeScript passing, Prisma client generated

## Active Decisions
- Using `npm` as package manager (pnpm not available in env)
- Prisma v7 — `prisma.config.ts` holds datasource URL, schema has no `url` field
- App Router with locale segment `[locale]` at root (routing: `/en/...` and `/ar/...`)
- `ContentTrack` stored in Zustand (not URL param) for instant toggle
- Server components by default; `"use client"` only for animation/game/audio

## Next Steps (Phase 2)
- [ ] Animated SVG level-map road (GSAP MotionPathPlugin)
- [ ] 15 world data seed (prisma/seed.ts)
- [ ] WorldNode component with lock/unlock states
- [ ] QuizCard component (question → options → explainer → reward)
- [ ] Sanad mascot integration (Rive)
- [ ] Opening cinematic (GSAP timeline)
