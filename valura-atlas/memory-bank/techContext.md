# Valura UAE — Tech Context

## Core Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| UI | React 18 |
| Styling | Tailwind CSS v4 (logical properties) |
| Animation (path) | GSAP + MotionPathPlugin |
| Animation (UI) | Framer Motion |
| Mascot | Rive (state machine) |
| Decorative loops | Lottie |
| Game state | Zustand + persist middleware |
| Server state | TanStack Query v5 |
| Database ORM | Prisma |
| Database | PostgreSQL |
| Auth | NextAuth / Auth.js v5 |
| Audio | Howler.js |
| Icons | Lucide React |
| i18n | next-intl (EN + AR, true RTL) |
| Forms | React Hook Form + Zod |
| Analytics | PostHog |
| Error tracking | Sentry |
| Email | Resend |
| Admin UI | shadcn/ui |

## Tailwind v4 Notes
- Use **logical properties** throughout for RTL safety:
  - `ms-` / `me-` instead of `ml-` / `mr-`
  - `ps-` / `pe-` instead of `pl-` / `pr-`
  - `start-` / `end-` instead of `left-` / `right-`
  - `rounded-s-` / `rounded-e-` instead of `rounded-l-` / `rounded-r-`

## Brand Design Tokens
```css
--color-navy: #00111B;
--color-green: #05A049;
--color-mint: #B4E3C8;
--color-cream: #FFFFFC;
--color-gold: #D4A95A;
```

## Fonts
- **Bricolage Grotesque** — display (level names, hero text)
- **Manrope** — headings (H1–H3)
- **Inter** — body text
- **IBM Plex Sans Arabic** — Arabic locale

## Infrastructure
- Production data residency: **AWS me-central-1 (Abu Dhabi)**
- PDPL-compliant data handling
- Environment variables for all secrets (`.env.local`)

## Development Setup
```bash
# Install
pnpm install

# Dev server
pnpm dev

# DB migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate
```

## Key Constraints
- Server components by default; `"use client"` only when needed (interactivity, browser APIs, hooks)
- All interactive elements must have ARIA labels
- No spin wheels, loot boxes, prize draws, or named public leaderboards
- VAL COINS must never be redeemable or tied to bank products
- Every page footer: "Educational only, not financial advice"
