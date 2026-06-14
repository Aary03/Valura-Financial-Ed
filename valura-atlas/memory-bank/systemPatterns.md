# Valura UAE — System Patterns

## Architecture Overview
```
app/
├── [locale]/                    # next-intl locale routing (en | ar)
│   ├── layout.tsx               # Root layout with font/theme providers
│   ├── page.tsx                 # Landing / cinematic opening
│   ├── (auth)/                  # Auth routes group
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (game)/                  # Core game routes group
│   │   ├── map/page.tsx         # Level map (SVG road)
│   │   ├── world/[id]/page.tsx  # World entry
│   │   └── node/[id]/page.tsx   # Quiz node
│   ├── profile/page.tsx
│   ├── leaderboard/page.tsx     # Private boards only
│   └── admin/                   # shadcn/ui admin panel
├── api/
│   ├── auth/[...nextauth]/
│   └── ...
components/
├── ui/                          # shadcn primitives + custom base
├── game/                        # Game-specific components
│   ├── LevelMap.tsx
│   ├── WorldNode.tsx
│   ├── QuizCard.tsx
│   └── SanadMascot.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx               # Always shows "Educational only" disclaimer
│   └── LocaleSwitcher.tsx
lib/
├── auth.ts                      # NextAuth config
├── db.ts                        # Prisma client singleton
├── store/                       # Zustand stores
│   └── gameStore.ts
├── hooks/                       # Custom React hooks
├── utils/                       # Pure helpers
└── validations/                 # Zod schemas
prisma/
├── schema.prisma
└── migrations/
messages/
├── en.json
└── ar.json
```

## Key Patterns

### Server vs Client Components
- Default to Server Components
- Use `"use client"` only for: animations, game interactivity, audio, Zustand reads, browser APIs
- Data fetching happens in Server Components via Prisma/fetch, passed as props

### RTL Safety
- All spacing uses Tailwind logical properties (ms-, me-, ps-, pe-, start-, end-)
- `dir` attribute set on `<html>` based on locale
- Framer Motion animations mirror on RTL (x values flipped)

### Game State (Zustand)
```ts
// gameStore.ts shape
{
  userId: string
  locale: 'en' | 'ar'
  contentTrack: 'conventional' | 'islamic'
  completedNodes: string[]
  valCoins: number
  badges: string[]
  currentWorld: string | null
  avatar: 'journey' | 'home' | 'garden'
}
```

### Content Track Toggle
- Global `contentTrack` in Zustand store
- Components read track and swap vocabulary/content accordingly
- Server-side: track passed as searchParam or cookie for SSR

### i18n Pattern
- All user-facing strings in `messages/en.json` and `messages/ar.json`
- Use `useTranslations` hook in client components
- Use `getTranslations` in server components
- Arabic locale sets `dir="rtl"` on `<html>`

### Quiz Node Flow
1. Server fetches node data (question, options, explainer)
2. Client QuizCard handles interaction + animation
3. On correct: award VAL COINS (Zustand), trigger Sanad celebration (Rive)
4. On complete: POST to API → Prisma records completion
5. Unlock next node

### Regulatory Compliance Pattern
- Every page layout includes `<EducationalDisclaimer />` in footer
- Content flagged as `isAdvice: false` in CMS/DB
- VAL COINS schema enforces cosmetics-only spending
