# Valura UAE

> Gamified financial wellness module for UAE retail bank customers.

A B2B white-label product for UAE banks — a polished, casual game journey teaching financial literacy to customers aged 22–55. Fully bilingual (English + Arabic/RTL), CBUAE CPR-compliant, and PDPL-ready.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + brand tokens |
| Animation | GSAP (MotionPath) + Framer Motion |
| Mascot | Rive state machine |
| State | Zustand (persist) |
| Server state | TanStack Query v5 |
| Database | PostgreSQL via Prisma v7 |
| Auth | Auth.js v5 (NextAuth) |
| i18n | next-intl (EN + AR, true RTL) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Analytics | PostHog |
| Errors | Sentry |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Fill in DATABASE_URL, AUTH_SECRET, etc.
```

### 3. Set up the database

```bash
# Push schema to your database
npm run db:push

# Or run migrations
npm run db:migrate
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # EN + AR locale routing
│   │   ├── layout.tsx     # Root layout with fonts, providers
│   │   ├── page.tsx       # Landing / cinematic opening
│   │   ├── (auth)/        # Login + Register
│   │   └── (game)/        # Map + World + Node
│   └── api/
│       └── auth/          # Auth.js handlers
├── components/
│   ├── game/              # Quiz, map, coins, mascot
│   ├── layout/            # Header, Footer, LocaleSwitcher
│   ├── providers/         # QueryProvider
│   └── ui/                # shadcn primitives
├── lib/
│   ├── auth.ts            # Auth.js config
│   ├── db.ts              # Prisma singleton
│   ├── store/             # Zustand game store
│   ├── utils.ts           # cn(), formatCoins(), localise()
│   └── validations/       # Zod schemas
├── i18n/                  # next-intl routing + request config
└── middleware.ts           # Locale routing middleware
messages/
├── en.json
└── ar.json
prisma/
├── schema.prisma          # Full data model
└── prisma.config.ts       # Prisma v7 config
memory-bank/               # AI memory bank (project docs)
```

---

## Brand

| Token | Value |
|---|---|
| Navy | `#00111B` |
| Green | `#05A049` |
| Mint | `#B4E3C8` |
| Cream | `#FFFFFC` |
| Gold | `#D4A95A` |

**Fonts:** Bricolage Grotesque (display) · Manrope (headings) · Inter (body) · IBM Plex Sans Arabic (AR)

---

## Regulatory Notes

- Every page footer shows: **"Educational only, not financial advice."**
- VAL Coins are cosmetics + charity only — never redeemable, never tied to bank products
- No spin wheels, loot boxes, prize draws, or named public leaderboards
- PDPL-compliant — production data residency: **AWS me-central-1 (Abu Dhabi)**
- Content complies with CBUAE CPR Article 9.1.1.1

---

## Curriculum — 15 Worlds

1. Marina Mile (money basics)
2. Skyline Heights (banking)
3. Souk of Savings (habits)
4. Dirham Desert (inflation)
5. Loan Lighthouse (loans)
6. Card Canyon (credit cards + AECB)
7. Oasis of Insurance
8. Asset Atlas (asset classes, no picks)
9. Skyline Keys (real estate)
10. Halal Harbour (Islamic finance + Zakat)
11. Gratuity Garden (EOSB + retirement)
12. Family Majlis
13. Bridge of Borders (remittance)
14. Scam Sentinel
15. Goal Garden (capstone)
