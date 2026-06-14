import type { Module } from "./types";

/**
 * Valura Atlas curriculum.
 *
 * Voice: plain, direct, India-first. Short sentences. Real numbers.
 * We explain, we don't sell. Nothing here is investment advice.
 */
export const MODULES: Module[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "why-go-global",
    index: 1,
    title: "Why go global",
    tagline: "The case for looking past India",
    summary:
      "Your salary, your home, your savings — all in rupees, all tied to one economy. Here's why the rest of the world belongs in your plan too.",
    accent: "green",
    lessons: [
      {
        slug: "the-3-percent-problem",
        title: "The 3% problem",
        hook: "India is home. It is also a sliver of the world's stock market.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "India feels enormous from the inside — and it is. But if you zoom out to the whole world's stock market, every Indian company added together is worth only about **3%** of it.",
          },
          { kind: "diagram", id: "world-share", caption: "Approximate share of global stock-market value." },
          {
            kind: "paragraph",
            text: "That single chart is the whole argument. When you invest only in India, you are betting your future on 3% of the world's companies — and skipping the businesses you already use every day. The phone in your hand, the software at your office, the chip inside almost everything: most of it is owned abroad.",
          },
          {
            kind: "stats",
            items: [
              { value: "~3%", label: "India's share of world stocks", accent: "amber" },
              { value: "~63%", label: "United States' share", accent: "green" },
              { value: "1", label: "economy your savings ride on today", accent: "rose" },
            ],
          },
          {
            kind: "callout",
            variant: "key",
            title: "The point",
            text: "Going global isn't about leaving India behind. It's about not putting 100% of your financial life on 3% of the map.",
          },
          { kind: "heading", text: "Why this matters now" },
          {
            kind: "paragraph",
            text: "A generation ago, investing abroad meant paperwork, agents, and patience. Today an Indian resident can do it from a phone in an afternoon — legally, within clear limits. The hard part was never access. It's understanding *what* you're doing. That's what the rest of Atlas is for.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Roughly what share of the world's stock-market value do Indian companies make up?",
            choices: [
              { id: "a", text: "About 3%" },
              { id: "b", text: "About 25%" },
              { id: "c", text: "About 50%" },
            ],
            correctId: "a",
            explain:
              "India is around 3% of global stock-market value. Big at home, small on the world map — which is exactly why diversifying beyond it matters.",
          },
          {
            id: "q2",
            prompt: "What's the main risk of investing only in India?",
            choices: [
              { id: "a", text: "Indian companies are badly run" },
              { id: "b", text: "Your whole financial life rides on one economy and currency" },
              { id: "c", text: "It is illegal to over-invest in India" },
            ],
            correctId: "b",
            explain:
              "Concentration is the risk. Your job, home and savings are already rupee-and-India linked. Global investing spreads that bet.",
          },
          {
            id: "q3",
            prompt: "Is investing abroad legal and accessible for Indian residents today?",
            choices: [
              { id: "a", text: "No, it's banned" },
              { id: "b", text: "Yes — within defined limits set by the RBI" },
              { id: "c", text: "Only for companies, not individuals" },
            ],
            correctId: "b",
            explain:
              "Yes. The RBI's Liberalised Remittance Scheme lets every resident invest abroad within an annual limit. We cover it in Module 2.",
          },
        ],
      },
      {
        slug: "the-rupee-never-sits-still",
        title: "The rupee never sits still",
        hook: "Over time the rupee tends to weaken — and that quietly changes the maths.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Here's a fact most people feel but never name: the rupee has slowly lost value against the dollar for decades. Not in a crash — in a steady drift.",
          },
          { kind: "diagram", id: "rupee-drift", caption: "₹ needed to buy $1, over time." },
          {
            kind: "paragraph",
            text: "Think about what that means. If you hold an asset priced in dollars and the rupee weakens by ~3% in a year, that asset is worth ~3% more in rupee terms — *before* it has gone up a single cent on its own. Your home currency falling becomes a tailwind for money held abroad.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "The flip side",
            text: "Currency cuts both ways. If the rupee strengthens, dollar assets are worth less in rupees. Over long stretches the drift has favoured the dollar — but it is never guaranteed in any single year.",
          },
          {
            kind: "paragraph",
            text: "This is also why holding *some* of your wealth in another currency is a kind of insurance. The day your rupee buys less, your global holdings are doing the opposite.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "If the rupee weakens against the dollar, what happens to a US asset you hold?",
            choices: [
              { id: "a", text: "It is worth more in rupee terms" },
              { id: "b", text: "It is worth less in rupee terms" },
              { id: "c", text: "Nothing changes" },
            ],
            correctId: "a",
            explain:
              "A weaker rupee means each dollar converts to more rupees — so your dollar-priced asset is worth more in rupees, even before any price move.",
          },
          {
            id: "q2",
            prompt: "Is the rupee guaranteed to weaken every single year?",
            choices: [
              { id: "a", text: "Yes, always" },
              { id: "b", text: "No — the long-term drift has favoured the dollar, but any year can go either way" },
            ],
            correctId: "b",
            explain:
              "The long-run trend has been a weakening rupee, but currencies move both ways year to year. Treat it as a long-term tailwind, not a promise.",
          },
        ],
      },
      {
        slug: "diversification-properly",
        title: "Diversification, properly",
        hook: "Owning twenty Indian stocks is not the same as being diversified.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Most people think diversification means \"own a lot of different stocks.\" That's half of it. If all twenty of your stocks live in the same economy, share the same currency, and react to the same interest-rate decision — they tend to fall together on a bad day.",
          },
          { kind: "diagram", id: "concentration", caption: "More stocks ≠ more diversification if they share one economy." },
          {
            kind: "paragraph",
            text: "Real diversification spreads you across things that *don't* move in lockstep: different economies, different currencies, different rate cycles. When one zigs, another zags. The whole portfolio gets steadier without you giving up growth.",
          },
          {
            kind: "list",
            items: [
              "**Across countries** — India, the US, and beyond don't boom and bust on the same calendar.",
              "**Across currencies** — rupee, dollar, and others rarely fall at once.",
              "**Across sectors** — global tech, healthcare and energy that India is light on.",
            ],
          },
          {
            kind: "callout",
            variant: "key",
            title: "Rule of thumb",
            text: "Diversification works when your holdings have different reasons to go up and down. Same country, same currency, same story = not diversified, just longer.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "You own 25 Indian stocks across many sectors. Are you globally diversified?",
            choices: [
              { id: "a", text: "Yes — 25 is plenty" },
              { id: "b", text: "No — they still share one economy and currency" },
            ],
            correctId: "b",
            explain:
              "Sector spread helps, but they all ride the Indian economy and the rupee. Global diversification adds different economies and currencies.",
          },
          {
            id: "q2",
            prompt: "What makes diversification actually work?",
            choices: [
              { id: "a", text: "Holdings that move for different reasons" },
              { id: "b", text: "Holding as many stocks as possible" },
              { id: "c", text: "Only buying the biggest companies" },
            ],
            correctId: "a",
            explain:
              "Diversification is about low correlation — assets that don't all rise and fall together. Quantity alone doesn't give you that.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "the-routes",
    index: 2,
    title: "The routes",
    tagline: "How money actually gets out",
    summary:
      "There isn't one way to invest globally — there are several, each with its own trade-offs. Learn the map before you pick a road.",
    accent: "sky",
    lessons: [
      {
        slug: "five-doors-to-the-world",
        title: "Five doors to the world",
        hook: "All roads reach global markets. They just charge different tolls.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "When people ask \"how do I invest in US stocks?\", they imagine one answer. There are really five common routes — and the right one depends on how hands-on you want to be, how much you're investing, and how you feel about tax paperwork.",
          },
          { kind: "diagram", id: "five-routes", caption: "Five common routes from India to global markets." },
          {
            kind: "compare",
            columns: ["Route", "How it works", "Best when"],
            rows: [
              { label: "Domestic funds & ETFs", cells: ["Buy an India-listed fund/ETF in ₹ that holds global assets", "You want simplicity and no forex"] },
              { label: "Direct US stocks (LRS)", cells: ["Open a global broker, remit dollars, buy shares yourself", "You want to pick specific companies"] },
              { label: "Global / UCITS funds", cells: ["Pooled funds (often via GIFT/feeder) managed for you", "You prefer a manager to a DIY portfolio"] },
              { label: "GIFT City", cells: ["Invest through India's IFSC zone into global assets", "You want global access under Indian rules"] },
              { label: "Curated baskets", cells: ["Ready-made themed portfolios you buy in one click", "You want diversification without research"] },
            ],
          },
          {
            kind: "callout",
            variant: "note",
            title: "No single winner",
            text: "A simple domestic ETF and a direct US brokerage account are both valid. The next two lessons unpack the two routes most people end up using: LRS and GIFT City.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Which route lets you buy global exposure in rupees, with no forex conversion?",
            choices: [
              { id: "a", text: "Direct US stocks via LRS" },
              { id: "b", text: "Domestic funds & ETFs listed in India" },
              { id: "c", text: "Opening a US bank account" },
            ],
            correctId: "b",
            explain:
              "India-listed funds and ETFs that hold global assets let you invest in rupees — the fund handles the global side for you.",
          },
          {
            id: "q2",
            prompt: "If you want to pick individual US companies yourself, which fits best?",
            choices: [
              { id: "a", text: "A curated basket" },
              { id: "b", text: "A direct US brokerage account (LRS route)" },
              { id: "c", text: "A domestic mutual fund" },
            ],
            correctId: "b",
            explain:
              "Direct brokerage access (funded under LRS) gives you the controls to buy specific shares. Funds and baskets decide the holdings for you.",
          },
          {
            id: "q3",
            prompt: "Is there one 'correct' route for everyone?",
            choices: [
              { id: "a", text: "Yes, always go direct" },
              { id: "b", text: "No — it depends on your goals, amount and appetite for paperwork" },
            ],
            correctId: "b",
            explain:
              "Each route trades off control, cost and convenience. The best one is the one that matches how you actually want to invest.",
          },
        ],
      },
      {
        slug: "lrs-your-passport",
        title: "LRS — your $250,000 passport",
        hook: "Every resident can send money abroad. Here's the rulebook, in plain terms.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "The Liberalised Remittance Scheme (LRS) is the RBI's rule that lets every resident Indian send money abroad — for travel, education, gifts, or **investing** — up to a set amount each year. It's the legal pipe most global investing flows through.",
          },
          { kind: "diagram", id: "lrs-bucket", caption: "The LRS allowance and the TCS threshold." },
          { kind: "heading", text: "How money actually moves" },
          {
            kind: "steps",
            items: [
              { title: "You start in rupees", text: "Money sits in your Indian bank account." },
              { title: "The bank reports it under LRS", text: "Every remittance is tracked against your yearly limit." },
              { title: "Rupees convert to dollars", text: "Your bank or platform converts at the going rate, plus a small spread." },
              { title: "Dollars reach your broker", text: "Now you can buy US stocks, ETFs or funds." },
            ],
          },
          {
            kind: "callout",
            variant: "caution",
            title: "About that 20% TCS",
            text: "Send more than ₹10 lakh abroad in a year for investing and the bank collects 20% TCS at source. It feels like a tax — it isn't lost. TCS is a *prepayment*: you adjust it against your total tax, or get it refunded when you file your ITR.",
          },
          {
            kind: "paragraph",
            text: "So the headline number — **$250,000 per person, per year** — is far more than most people will ever use. The limit is rarely the constraint. Understanding the TCS step is what saves you a surprise.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "How much can an individual resident send abroad each year under LRS?",
            choices: [
              { id: "a", text: "$25,000" },
              { id: "b", text: "$250,000" },
              { id: "c", text: "There is no limit" },
            ],
            correctId: "b",
            explain:
              "Up to $250,000 per person, per financial year — covering travel, education, gifts and investments combined.",
          },
          {
            id: "q2",
            prompt: "You invest ₹14 lakh abroad this year. What happens with TCS?",
            choices: [
              { id: "a", text: "Nothing — TCS never applies to investing" },
              { id: "b", text: "20% TCS is collected on the amount above ₹10 lakh, and you claim it back via your ITR" },
              { id: "c", text: "The remittance is blocked" },
            ],
            correctId: "b",
            explain:
              "Above the ₹10 lakh threshold, 20% TCS is collected at source on the excess. It's a prepayment you reconcile when filing taxes — not money gone.",
          },
          {
            id: "q3",
            prompt: "Is TCS a permanent tax you lose?",
            choices: [
              { id: "a", text: "No — it's adjusted against your tax or refunded" },
              { id: "b", text: "Yes, it's gone forever" },
            ],
            correctId: "a",
            explain:
              "TCS is collected upfront but credited back against your tax liability (or refunded). Cash-flow timing, not a real cost — if you file.",
          },
        ],
      },
      {
        slug: "gift-city-the-new-doorway",
        title: "GIFT City — the new doorway",
        hook: "A patch of India built to feel like the rest of the world.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "GIFT City is India's International Financial Services Centre (IFSC) in Gujarat. Think of it as a special zone that sits *inside* India but plays by international financial rules — a doorway to global markets that's still watched over by Indian regulators.",
          },
          { kind: "diagram", id: "gift-city", caption: "GIFT City bridges Indian investors to global assets." },
          {
            kind: "paragraph",
            text: "Through GIFT City you can reach US stocks and ETFs — sometimes straight into your Indian demat account — and invest in GIFT-based global funds. A growing number of platforms now offer this route, and it's becoming a real alternative to a direct overseas broker.",
          },
          {
            kind: "callout",
            variant: "key",
            title: "Why people like it",
            text: "The tax and reporting are often handled at the fund level, and you stay within an Indian-regulated environment. Less paperwork, familiar oversight — with a global reach.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What is GIFT City, in one line?",
            choices: [
              { id: "a", text: "A foreign country you remit to" },
              { id: "b", text: "India's IFSC zone that gives global access under Indian regulation" },
              { id: "c", text: "A type of US ETF" },
            ],
            correctId: "b",
            explain:
              "GIFT City is India's International Financial Services Centre — inside India, but built for global financial activity and overseen by IFSCA.",
          },
          {
            id: "q2",
            prompt: "A common appeal of the GIFT City route is…",
            choices: [
              { id: "a", text: "It avoids all taxes" },
              { id: "b", text: "Tax/reporting often handled at fund level, within Indian oversight" },
              { id: "c", text: "It removes market risk" },
            ],
            correctId: "b",
            explain:
              "It doesn't remove tax or risk. The draw is simpler handling and staying inside a familiar, Indian-regulated setup while reaching global assets.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "moving-money",
    index: 3,
    title: "Moving money",
    tagline: "Currency, costs, and your real return",
    summary:
      "Your return isn't just whether the stock went up. Currency and costs ride along for the journey. Here's how to see all three.",
    accent: "rose",
    lessons: [
      {
        slug: "what-happens-to-100-rupees",
        title: "What happens to ₹100",
        hook: "Follow a hundred rupees from your account to a US share.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "When you invest globally, your money takes a short journey — and a little leaks out at each stop. Knowing where helps you keep more of it.",
          },
          { kind: "diagram", id: "money-journey", caption: "₹100 from your account to a US asset." },
          {
            kind: "paragraph",
            text: "Two quiet costs show up almost every time. First, **currency conversion**: turning rupees into dollars carries a spread — the gap between the real rate and the rate you're given. Second, **platform and brokerage fees**: small per-trade or per-remittance charges. Neither is dramatic, but on small or frequent transfers they add up.",
          },
          {
            kind: "stats",
            items: [
              { value: "Asset", label: "did the investment itself rise?", accent: "green" },
              { value: "Currency", label: "did the rupee move for or against you?", accent: "amber" },
              { value: "Costs", label: "what did the journey charge you?", accent: "rose" },
            ],
          },
          {
            kind: "callout",
            variant: "key",
            title: "The real-return formula",
            text: "Your true return = asset performance ± currency move − costs. Two investors can buy the same stock and end up in different places because of the other two.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Which three things together decide your real return on a global investment?",
            choices: [
              { id: "a", text: "Asset performance, currency move, and costs" },
              { id: "b", text: "Only the share price" },
              { id: "c", text: "Interest rates and gold" },
            ],
            correctId: "a",
            explain:
              "Asset performance ± currency ± costs. Ignore the last two and your real-world result can surprise you.",
          },
          {
            id: "q2",
            prompt: "What is a 'forex spread'?",
            choices: [
              { id: "a", text: "A government tax on dollars" },
              { id: "b", text: "The gap between the true exchange rate and the rate you actually get" },
              { id: "c", text: "A type of US fund" },
            ],
            correctId: "b",
            explain:
              "The spread is the small margin built into currency conversion. It's why frequent small transfers can quietly cost more.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "us-markets",
    index: 4,
    title: "Understanding US markets",
    tagline: "What you're actually buying",
    summary:
      "The S&P 500, the Nasdaq, 'owning a share' — the words get thrown around a lot. Let's make them concrete.",
    accent: "violet",
    lessons: [
      {
        slug: "what-you-actually-own",
        title: "What you actually own",
        hook: "A share is a slice. An index is a basket of slices.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Strip away the jargon and a share is simple: it's a small piece of ownership in a real company. Own one share and you own a tiny slice of its profits, its growth, and its future.",
          },
          { kind: "diagram", id: "us-ownership", caption: "One share vs an index of many companies." },
          { kind: "heading", text: "Indices: baskets with names" },
          {
            kind: "paragraph",
            text: "You'll hear two names constantly. The **S&P 500** tracks about 500 of the largest US companies across every sector — a broad read on the US economy. The **Nasdaq** leans heavily toward technology. An index isn't something you can hold directly; you buy it through a fund or ETF that owns the basket for you.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "Why beginners like indices",
            text: "Buying one index fund spreads you across hundreds of companies at once. You stop trying to pick the single winner and simply own the whole field.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What does owning one share represent?",
            choices: [
              { id: "a", text: "A loan to the company" },
              { id: "b", text: "A small ownership slice of the company" },
              { id: "c", text: "A guarantee of profit" },
            ],
            correctId: "b",
            explain:
              "A share is part-ownership — a slice of the company's profits and growth. Not a loan, and never a guarantee.",
          },
          {
            id: "q2",
            prompt: "The S&P 500 is best described as…",
            choices: [
              { id: "a", text: "A single tech company" },
              { id: "b", text: "An index of ~500 large US companies across sectors" },
              { id: "c", text: "A type of currency" },
            ],
            correctId: "b",
            explain:
              "It's a broad basket of about 500 large US companies — a common one-line proxy for 'the US market'.",
          },
          {
            id: "q3",
            prompt: "How do you actually invest in an index like the S&P 500?",
            choices: [
              { id: "a", text: "Buy the index directly" },
              { id: "b", text: "Through a fund or ETF that holds the basket" },
            ],
            correctId: "b",
            explain:
              "You can't buy an index itself — you buy a fund or ETF built to track it, which holds the underlying companies.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "tax-and-rules",
    index: 5,
    title: "Tax & rules",
    tagline: "The part everyone avoids — made simple",
    summary:
      "Two taxes, a handful of regulators. Get these straight once and global investing stops feeling scary.",
    accent: "amber",
    lessons: [
      {
        slug: "the-two-taxes-that-matter",
        title: "The two taxes that matter",
        hook: "Dividends and capital gains. That's most of the story.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "Tax is where most people freeze. It's simpler than it looks. For US investments held by an Indian resident, two taxes do almost all the work.",
          },
          { kind: "diagram", id: "tax-flow", caption: "How dividends and capital gains are taxed." },
          { kind: "heading", text: "1. Dividends" },
          {
            kind: "paragraph",
            text: "When a US company pays you a dividend, the US withholds **25%** before it reaches you — the rate set by the India–US tax treaty (DTAA). The good news: that 25% becomes a **credit** you claim in India, so the same income isn't taxed twice.",
          },
          { kind: "heading", text: "2. Capital gains" },
          {
            kind: "paragraph",
            text: "When you sell for a profit, the US does **not** tax your gains as a non-resident — you pay in India. Hold for 24 months or more and it's long-term (taxed at 12.5% beyond the exemption); sell sooner and it's short-term, taxed at your income-slab rate.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "One more thing: reporting",
            text: "Foreign holdings must be declared in your Indian tax return (the Schedule FA / foreign-assets section). It's a disclosure, not an extra tax — but skipping it causes real trouble. When in doubt, use a tax advisor.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "How much does the US withhold on dividends paid to an Indian investor?",
            choices: [
              { id: "a", text: "0%" },
              { id: "b", text: "25% (the DTAA treaty rate)" },
              { id: "c", text: "50%" },
            ],
            correctId: "b",
            explain:
              "25% is withheld in the US under the India–US treaty — and you claim it as a credit in India to avoid being taxed twice.",
          },
          {
            id: "q2",
            prompt: "Where do you pay capital-gains tax on US shares you sell?",
            choices: [
              { id: "a", text: "In the US" },
              { id: "b", text: "In India" },
              { id: "c", text: "Both, in full" },
            ],
            correctId: "b",
            explain:
              "The US doesn't tax non-residents' capital gains. You pay in India — long-term (24m+) or short-term, depending on holding period.",
          },
          {
            id: "q3",
            prompt: "Do you need to declare foreign holdings in your Indian tax return?",
            choices: [
              { id: "a", text: "Yes — in the foreign-assets schedule" },
              { id: "b", text: "No, never" },
            ],
            correctId: "a",
            explain:
              "Yes. Foreign assets go in Schedule FA. It's a disclosure, not a new tax — but leaving it out can mean penalties.",
          },
        ],
      },
      {
        slug: "who-watches-over-it",
        title: "Who watches over it",
        hook: "Five names. Knowing who does what kills half the anxiety.",
        minutes: 3,
        blocks: [
          {
            kind: "paragraph",
            text: "Global investing isn't a free-for-all. A handful of regulators sit on both sides of the trade — some Indian, some American. You don't need to memorise them, but knowing who guards what makes the whole thing feel a lot less mysterious.",
          },
          { kind: "diagram", id: "regulators", caption: "Who oversees what, on each side." },
          {
            kind: "callout",
            variant: "key",
            title: "The short version",
            text: "India's RBI controls money leaving the country; SEBI and IFSCA watch the markets and GIFT City. In the US, the SEC and FINRA oversee companies and brokers. Layers of oversight — working for you.",
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Which Indian regulator controls money leaving the country under LRS?",
            choices: [
              { id: "a", text: "SEBI" },
              { id: "b", text: "RBI" },
              { id: "c", text: "SEC" },
            ],
            correctId: "b",
            explain:
              "The RBI runs the Liberalised Remittance Scheme and oversees outbound money. SEBI handles markets; the SEC is American.",
          },
          {
            id: "q2",
            prompt: "Which body oversees activity in GIFT City?",
            choices: [
              { id: "a", text: "IFSCA" },
              { id: "b", text: "FINRA" },
              { id: "c", text: "RBI" },
            ],
            correctId: "a",
            explain:
              "IFSCA is the dedicated regulator for India's IFSC at GIFT City.",
          },
        ],
      },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === lessonSlug);
  if (!mod || !lesson) return undefined;
  return { module: mod, lesson };
}

/** A flat, ordered list of every lesson with its module + global position. */
export function allLessonsFlat() {
  const out: {
    moduleSlug: string;
    lessonSlug: string;
    title: string;
    moduleTitle: string;
    accent: Module["accent"];
  }[] = [];
  for (const m of MODULES) {
    for (const l of m.lessons) {
      out.push({
        moduleSlug: m.slug,
        lessonSlug: l.slug,
        title: l.title,
        moduleTitle: m.title,
        accent: m.accent,
      });
    }
  }
  return out;
}

/** The lesson immediately after the given one, across module boundaries. */
export function nextLesson(moduleSlug: string, lessonSlug: string) {
  const flat = allLessonsFlat();
  const i = flat.findIndex((x) => x.moduleSlug === moduleSlug && x.lessonSlug === lessonSlug);
  if (i === -1 || i === flat.length - 1) return undefined;
  return flat[i + 1];
}

export const TOTAL_LESSONS = allLessonsFlat().length;
export const TOTAL_MINUTES = MODULES.reduce(
  (sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0),
  0,
);

/** Stable lesson id used for progress tracking. */
export function lessonId(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}/${lessonSlug}`;
}
