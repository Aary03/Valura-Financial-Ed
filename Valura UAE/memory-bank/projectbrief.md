# Valura UAE — Project Brief

## Overview
Valura UAE is a **gamified financial wellness web module** for UAE retail bank customers, ages 22–55. It is a B2B pitch to a UAE bank, targeting mass market — a mix of Emirati locals and expats from India, Pakistan, Philippines, Egypt, UK.

## Core Experience
- **Polished casual game journey**: Opening cinematic → animated SVG level-map road → 12+ themed worlds with 5–8 quiz nodes each
- **Virtual currency**: VAL COINS (cosmetics + charity only, never redeemable, never tied to financial products)
- Badges, private friend boards, weekly tournaments, family group quests, pair streaks
- Mastery review at 7/30/90 days

## Curriculum — 15 Levels
1. Marina Mile (money basics)
2. Skyline Heights (banking)
3. Souk of Savings (habits)
4. Dirham Desert (inflation)
5. Loan Lighthouse (loans)
6. Card Canyon (credit cards + AECB)
7. Oasis of Insurance
8. Asset Atlas (asset class basics, no picks)
9. Skyline Keys (real estate)
10. Halal Harbour (Islamic finance + Zakat)
11. Gratuity Garden (EOSB + retirement)
12. Family Majlis
13. Bridge of Borders (remittance)
14. Scam Sentinel
15. Goal Garden (capstone)

## Dual Content Track
- One-tap **Conventional / Islamic** toggle
- Swaps vocabulary: interest → profit/rental/fee
- Inserts Murabaha/Ijara/Sukuk/Takaful/Mudaraba/Musharaka explainers

## Cast
- **Mariam** (Emirati), **Raj** (Indian expat), **Faisal** (Egyptian expat), **Aisha** (Filipino expat)
- **Sanad**: stylised falcon mascot (Rive state machine)
- **Protagonist**: the user, with an abstract evolving avatar (journeying figure / home / garden — user picks)

## Hard Regulatory Rules
- Content must stay generic per CBUAE CPR Article 9.1.1.1
- Education must never read as advice — every page footers "Educational only, not financial advice"
- VAL COINS: never redeem to bank account, never tied to opening a product, never raffled
- No spin-wheels, loot boxes, prize draws, or named public leaderboards
- PDPL-compliant; production data residency: AWS me-central-1 Abu Dhabi

## Brand
- **Colors**: Navy `#00111B`, Green `#05A049`, Mint `#B4E3C8`, Cream `#FFFFFC`, Gold `#D4A95A`
- **Fonts**: Bricolage Grotesque (display), Manrope (headings), Inter (body), IBM Plex Sans Arabic (Arabic)
- **Voice**: direct, intelligent, anti-jargon but not dumbed down — closer to Monzo than Cleo

## Code Defaults
- TypeScript, server components where possible, client components only where required
- Tailwind logical properties for RTL safety
- Accessible ARIA on all interactive elements
