import type { Module } from "./types";

/**
 * Valura Atlas curriculum.
 *
 * Voice: plain, direct, India-first. Short sentences. Real numbers.
 * We explain, we don't sell. Nothing here is investment advice.
 */
export const MODULES: Module[] = [
  // ═══════════════════════════════════════════════════════════════════════════
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
            kind: "definition",
            term: "Market value (market cap)",
            text: "What the stock market thinks a company — or a whole country's companies — is worth right now. Add up every listed company and you get the size of a market.",
          },
          {
            kind: "paragraph",
            text: "That single chart is the whole argument. When you invest only in India, you are betting your future on 3% of the world's companies — and skipping the businesses you already use every day.",
          },
          { kind: "diagram", id: "brands-you-use", caption: "Products in your daily life, owned by companies listed abroad." },
          {
            kind: "paragraph",
            text: "The phone in your hand, the software at your office, the card that taps at the store, the show you watched last night — most of those companies are listed in the US, not India. You're already a customer. Going global just lets you be an owner too.",
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
          {
            kind: "keytakeaways",
            items: [
              "Indian companies are ~3% of global stock value — big at home, small worldwide.",
              "You already *use* the world's biggest companies; you just don't *own* them.",
              "Investing abroad is legal for residents and easier than ever — the gap is knowledge, not access.",
            ],
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
            kind: "definition",
            term: "Currency exposure",
            text: "Which currency your money is held in. Rupees rise and fall against the dollar; holding some dollars means part of your wealth moves the opposite way to the rupee.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "The flip side",
            text: "Currency cuts both ways. If the rupee strengthens, dollar assets are worth less in rupees. Over long stretches the drift has favoured the dollar — but it is never guaranteed in any single year.",
          },
          {
            kind: "paragraph",
            text: "This is also why holding *some* of your wealth in another currency is a kind of insurance. The day your rupee buys less — on a foreign holiday, an overseas course, an imported gadget — your global holdings are doing the opposite.",
          },
          {
            kind: "keytakeaways",
            items: [
              "The rupee has trended weaker vs the dollar — roughly 3–4% a year on average.",
              "A weaker rupee lifts the rupee-value of dollar assets, even before they grow.",
              "Holding some global assets is a hedge against your own currency slipping.",
            ],
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
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "Most people think diversification means \"own a lot of different stocks.\" That's half of it. If all twenty of your stocks live in the same economy, share the same currency, and react to the same interest-rate decision — they tend to fall together on a bad day.",
          },
          { kind: "diagram", id: "concentration", caption: "More stocks ≠ more diversification if they share one economy." },
          {
            kind: "definition",
            term: "Correlation",
            text: "How much two investments move together. If they rise and fall in step, they're highly correlated — and owning both barely lowers your risk.",
          },
          {
            kind: "paragraph",
            text: "Real diversification spreads you across things that *don't* move in lockstep: different economies, different currencies, different rate cycles. When one zigs, another zags. The whole portfolio gets steadier without you giving up growth.",
          },
          {
            kind: "list",
            items: [
              "**Across countries** — India, the US, and beyond don't boom and bust on the same calendar.",
              "**Across currencies** — rupee, dollar, and others rarely fall at once.",
              "**Across sectors** — global tech, healthcare and semiconductors that India is light on.",
            ],
          },
          { kind: "heading", text: "So what does a mix look like?" },
          {
            kind: "paragraph",
            text: "There's no single right answer — it depends on your goals, age and nerves. But the shape of a globally-balanced portfolio is easy to picture: a strong home base, a meaningful slice of the world's largest market, and a little spread further out.",
          },
          { kind: "diagram", id: "allocation", caption: "One illustrative shape — not a recommendation." },
          {
            kind: "callout",
            variant: "key",
            title: "Rule of thumb",
            text: "Diversification works when your holdings have different reasons to go up and down. Same country, same currency, same story = not diversified, just longer.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Diversification is about low correlation, not the number of stocks.",
              "Spreading across countries, currencies and sectors is what actually steadies a portfolio.",
              "A globally-balanced mix keeps a home base and adds the world — proportions are personal.",
            ],
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
      {
        slug: "the-cost-of-waiting",
        title: "The cost of waiting",
        hook: "The best day to start was years ago. The second best is today.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "There's a quiet force behind every long-term portfolio: **compounding**. Your returns earn returns. Small at first, then — given enough years — almost unfair.",
          },
          {
            kind: "definition",
            term: "Compounding",
            text: "When your gains start producing gains of their own. ₹100 that grows 12% becomes ₹112; next year that 12% is earned on ₹112, not ₹100. The snowball builds on itself.",
          },
          { kind: "diagram", id: "compounding", caption: "Illustrative growth of ₹1,00,000 over time." },
          {
            kind: "paragraph",
            text: "Notice the shape of that curve. For the first decade it looks almost flat — easy to feel like nothing is happening. The real growth shows up in the *final* years. That's why **time in the market** matters far more than trying to pick the perfect moment to enter.",
          },
          {
            kind: "callout",
            variant: "example",
            title: "Two friends",
            text: "Riya starts at 25 and stops adding money at 35. Arjun starts at 35 and invests for 30 years straight. Because Riya's money compounded for longer, she can still end up ahead — despite investing for fewer years. Time does the heavy lifting.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "An honest caveat",
            text: "Markets don't move in a straight line. Some years are negative. Compounding rewards those who stay invested through the dips — not those who panic-sell at the bottom.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Compounding means returns earn returns — the effect is small early and large late.",
              "Most long-term growth arrives in the final years, so starting early beats timing.",
              "Staying invested through downturns is what lets compounding actually work.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Why does starting early matter so much for compounding?",
            choices: [
              { id: "a", text: "Early investments are taxed less" },
              { id: "b", text: "Most of the growth comes in the later years, so more time = far more growth" },
              { id: "c", text: "Markets only rise when you're young" },
            ],
            correctId: "b",
            explain:
              "The compounding curve is flat early and steep late. Extra years at the start give your money the runway to reach the steep part.",
          },
          {
            id: "q2",
            prompt: "What does 'time in the market beats timing the market' mean?",
            choices: [
              { id: "a", text: "Staying invested for the long run usually beats trying to guess the perfect entry day" },
              { id: "b", text: "You should trade every day" },
            ],
            correctId: "a",
            explain:
              "Predicting short-term moves is near-impossible. Staying invested lets compounding run — that's the reliable edge.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
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
            text: "A simple domestic ETF and a direct US brokerage account are both valid. The next lessons unpack the routes most people actually use: domestic funds, LRS, GIFT City, and going direct.",
          },
          {
            kind: "keytakeaways",
            items: [
              "There are ~five common routes abroad, not one.",
              "They trade off control, cost, convenience and paperwork.",
              "The best route is the one that fits how you actually want to invest.",
            ],
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
        slug: "the-easy-door-funds-and-etfs",
        title: "The easy door: funds & ETFs from India",
        hook: "Global exposure, bought in rupees, with zero forex on your side.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "For a lot of people, the simplest way to go global never leaves the Indian system. You buy an India-listed fund or ETF, in rupees, through the same demat account you already use — and the fund does the international work behind the scenes.",
          },
          { kind: "diagram", id: "feeder-fund", caption: "How a feeder fund passes your rupees through to global assets." },
          {
            kind: "definition",
            term: "Feeder fund (fund of funds)",
            text: "An Indian mutual fund that doesn't buy stocks directly — it puts your money into a larger global fund that does. You hold the Indian fund; it holds the world.",
          },
          { kind: "paragraph", text: "There are a few flavours of this door:" },
          {
            kind: "list",
            items: [
              "**Feeder funds / funds of funds** — an Indian fund that invests into a global one (e.g., a US-focused fund).",
              "**India-listed international ETFs** — ETFs on the NSE/BSE that track a global index like the S&P 500 or Nasdaq 100.",
              "**Domestic funds with some global exposure** — Indian funds that keep a slice abroad.",
            ],
          },
          {
            kind: "callout",
            variant: "caution",
            title: "Two things to watch",
            text: "First, **cost**: each extra layer (your fund → the global fund) can add a small fee. Second, **price gaps**: an India-listed global ETF can sometimes trade a little above or below the value of what it holds, because demand here doesn't always match the asset abroad.",
          },
          {
            kind: "paragraph",
            text: "None of that makes this route bad — for hands-off investors it's often the cleanest. You just want to know the fund's expense ratio and whether you're paying a premium before you buy.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Funds & ETFs let you go global in rupees, inside your existing demat account.",
              "A feeder fund holds a bigger global fund on your behalf — convenient, slightly layered.",
              "Check the expense ratio, and whether an India-listed global ETF is trading at a premium.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What is a feeder fund?",
            choices: [
              { id: "a", text: "A fund that lends money to companies" },
              { id: "b", text: "An Indian fund that invests your money into a larger global fund" },
              { id: "c", text: "A US bank account for Indians" },
            ],
            correctId: "b",
            explain:
              "A feeder (fund of funds) passes your rupees into an underlying global fund. You hold the Indian wrapper; it holds the world.",
          },
          {
            id: "q2",
            prompt: "A downside of the funds-&-ETFs route to watch for is…",
            choices: [
              { id: "a", text: "It's illegal" },
              { id: "b", text: "Extra fee layers and possible premium/discount on India-listed global ETFs" },
              { id: "c", text: "You must visit the US" },
            ],
            correctId: "b",
            explain:
              "Layers can add cost, and India-listed global ETFs sometimes trade away from the value of what they hold. Check both before buying.",
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
          {
            kind: "definition",
            term: "TCS — Tax Collected at Source",
            text: "A slice the bank collects upfront when you remit above a threshold. It is not an extra tax — it's a prepayment you set off against your total tax, or get refunded when you file your return.",
          },
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
            text: "Send more than ₹10 lakh abroad in a year for investing and the bank collects 20% TCS at source. It feels like a tax — it isn't lost. You adjust it against your total tax, or get it refunded when you file your ITR.",
          },
          {
            kind: "paragraph",
            text: "So the headline number — **$250,000 per person, per year** — is far more than most people will ever use. The limit is rarely the constraint. Understanding the TCS step is what saves you a surprise.",
          },
          {
            kind: "keytakeaways",
            items: [
              "LRS lets each resident send up to $250,000 abroad per financial year.",
              "Above ₹10 lakh of investment remittance, 20% TCS is collected upfront.",
              "TCS is a prepayment — you reconcile or refund it when you file your ITR.",
            ],
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
            kind: "definition",
            term: "IFSC",
            text: "International Financial Services Centre — a zone (GIFT City) where financial business is done in foreign currency under a dedicated regulator (IFSCA), separate from India's domestic rules.",
          },
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
          {
            kind: "keytakeaways",
            items: [
              "GIFT City is India's IFSC — global access under Indian (IFSCA) regulation.",
              "It can route US stocks, ETFs and global funds, sometimes into your demat.",
              "The draw is simpler handling and familiar oversight — not zero tax or zero risk.",
            ],
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
      {
        slug: "doing-it-yourself",
        title: "Doing it yourself: a US brokerage",
        hook: "Want the steering wheel? Here's what the direct route really involves.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "If you want to choose exactly what you own, you open an account with a broker that gives Indian residents access to US markets, fund it through LRS, and buy shares yourself. More control — and a little more responsibility.",
          },
          {
            kind: "definition",
            term: "Fractional shares",
            text: "A slice of a single share. If one share costs $200, you can buy ₹500 worth — about 0.0003 of a share. It means price-per-share never blocks you from owning a company.",
          },
          {
            kind: "paragraph",
            text: "The direct route has real advantages: you can buy *any* listed company, often in fractions, and you see exactly what you hold. The trade-off is that the tax and reporting are now **yours** to handle — there's no fund quietly doing it for you.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "Worth checking before you pick a broker",
            text: "Is it a regulated, reputable platform? How do they hold your shares (custody)? What are the forex and brokerage charges? And how do they help at tax time — statements, dividend records, the documents you'll need for Schedule FA?",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "The responsibility that comes with control",
            text: "Direct holdings mean you report foreign assets yourself and handle dividend/capital-gains tax in India. We cover all of that in Module 5 — don't go direct without reading it.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Going direct = open a US-access broker, fund via LRS, pick your own shares.",
              "Fractional shares mean even pricey companies are within reach of small amounts.",
              "You gain full control but own the tax and reporting work yourself.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What do fractional shares let you do?",
            choices: [
              { id: "a", text: "Own a slice of a share, so a high price-per-share never blocks you" },
              { id: "b", text: "Avoid all taxes" },
              { id: "c", text: "Trade only whole companies" },
            ],
            correctId: "a",
            explain:
              "Fractional shares let you put in a fixed rupee amount and own part of a share — handy when one share costs hundreds of dollars.",
          },
          {
            id: "q2",
            prompt: "The main trade-off of the direct brokerage route is…",
            choices: [
              { id: "a", text: "You can't pick your own stocks" },
              { id: "b", text: "More control, but the tax and reporting are now yours to handle" },
            ],
            correctId: "b",
            explain:
              "Direct access gives full control, but no fund is handling tax/reporting for you — that responsibility shifts to you (see Module 5).",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
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
            kind: "definition",
            term: "Forex spread",
            text: "The small gap between the true market exchange rate and the rate you're actually given. It's how currency conversion quietly earns a margin on every transfer.",
          },
          {
            kind: "paragraph",
            text: "Two quiet costs show up almost every time. First, **currency conversion**: turning rupees into dollars carries a spread. Second, **platform and brokerage fees**: small per-trade or per-remittance charges. Neither is dramatic, but on small or frequent transfers they add up.",
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
          {
            kind: "keytakeaways",
            items: [
              "Real return = asset performance ± currency move − costs.",
              "Currency conversion carries a spread; platforms charge fees — both small, both real.",
              "Costs bite hardest on small, frequent transfers.",
            ],
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
      {
        slug: "fees-and-the-real-cost",
        title: "Fees, spreads, and the real cost",
        hook: "A ₹99 flat fee is nothing on ₹5 lakh — and brutal on ₹2,000.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Costs sound boring until you see how they scale. The trick is knowing *which kind* of cost you're paying, because flat fees and percentage fees behave very differently.",
          },
          {
            kind: "compare",
            columns: ["Cost type", "What it is", "Hurts most when…"],
            rows: [
              { label: "Flat fee", cells: ["A fixed charge per transfer or trade (e.g., a set ₹ amount)", "you invest small amounts often"] },
              { label: "Percentage fee", cells: ["A % of the amount (forex spread, expense ratio)", "you invest large amounts or hold for years"] },
              { label: "Expense ratio", cells: ["Annual % a fund charges to manage your money", "it compounds quietly over a long horizon"] },
            ],
          },
          {
            kind: "definition",
            term: "Expense ratio",
            text: "The yearly fee a fund charges, shown as a percentage. A 0.5% ratio takes ₹500 a year from every ₹1,00,000 — small-sounding, but it compounds against you over decades.",
          },
          {
            kind: "callout",
            variant: "example",
            title: "Why small + frequent is the trap",
            text: "A ₹100 flat fee on a ₹2,000 transfer is 5% gone before you start. The same ₹100 on a ₹2,00,000 transfer is 0.05% — basically nothing. Fewer, larger transfers usually beat many tiny ones.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "Don't ignore the annual drag",
            text: "A one-time fee you can shrug off. An expense ratio runs every year, against your whole balance, for as long as you hold — so over 20+ years even 0.5% vs 1% matters a lot.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Flat fees punish small, frequent transfers; percentage fees scale with size.",
              "Expense ratios are small yearly %s that compound against you over time.",
              "Fewer, larger transfers and lower-cost funds keep more of your return.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "A fixed ₹100 fee hurts the most when you…",
            choices: [
              { id: "a", text: "Transfer a large amount once" },
              { id: "b", text: "Transfer tiny amounts frequently" },
            ],
            correctId: "b",
            explain:
              "A flat fee is a bigger *percentage* of a small transfer. ₹100 on ₹2,000 is 5%; on ₹2,00,000 it's 0.05%.",
          },
          {
            id: "q2",
            prompt: "Why does a fund's expense ratio matter over the long run?",
            choices: [
              { id: "a", text: "It's a one-time charge" },
              { id: "b", text: "It's charged every year on your whole balance, so it compounds against you" },
            ],
            correctId: "b",
            explain:
              "Even 0.5% a year, taken on your entire balance over decades, quietly eats into compounding. Lower ratios keep more for you.",
          },
        ],
      },
      {
        slug: "currency-friend-or-foe",
        title: "Currency: friend or foe?",
        hook: "When you hold dollars, the exchange rate becomes part of your return.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "We saw in Module 1 that the rupee tends to drift weaker over time. For a global investor that's usually a quiet tailwind — but it's worth understanding the full picture, both ways.",
          },
          { kind: "diagram", id: "rupee-drift", caption: "The long-run direction has favoured the dollar — but never every year." },
          {
            kind: "definition",
            term: "Hedging",
            text: "Paying a small cost to cancel out currency movement, so your return depends only on the asset — not on whether the rupee rose or fell. Useful for short horizons, less so for long ones.",
          },
          {
            kind: "paragraph",
            text: "Should you hedge the currency? For most long-term investors, **no** — the rupee's long drift tends to work in your favour, and hedging costs money every year. Hedging makes more sense when you'll need the money soon and can't afford a short-term swing.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "Two ways currency shows up",
            text: "When you *invest*, a weaker rupee lifts your rupee returns. When you *spend abroad* — fees, travel, courses — a weaker rupee costs you more. Global holdings quietly offset that second one.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Holding dollars makes the exchange rate part of your return — up or down.",
              "Long-term, the rupee's drift has favoured global holdings; short-term it's noisy.",
              "Most long-horizon investors don't hedge; hedging suits money you'll need soon.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "For a long-term investor, currency movement is usually…",
            choices: [
              { id: "a", text: "A quiet tailwind, given the rupee's long-run drift" },
              { id: "b", text: "A guaranteed loss" },
              { id: "c", text: "Completely irrelevant" },
            ],
            correctId: "a",
            explain:
              "Over long periods the rupee has tended to weaken, which lifts the rupee-value of dollar assets. It's noisy year to year, helpful over decades.",
          },
          {
            id: "q2",
            prompt: "When does hedging currency make the most sense?",
            choices: [
              { id: "a", text: "When you'll need the money soon and can't risk a short-term swing" },
              { id: "b", text: "Always, for everyone" },
            ],
            correctId: "a",
            explain:
              "Hedging costs money each year, so it suits short horizons where a sudden currency move would hurt — not decades-long investing.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
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
          {
            kind: "definition",
            term: "Share (stock)",
            text: "A unit of ownership in a company. Own shares and you own a proportional piece of the business — not a loan to it, and never a guarantee of profit.",
          },
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
          {
            kind: "keytakeaways",
            items: [
              "A share is part-ownership of a company — not a loan, not a guarantee.",
              "An index (like the S&P 500) is a named basket of many companies.",
              "You own an index through a fund or ETF that holds the basket for you.",
            ],
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
      {
        slug: "index-etf-or-single-stock",
        title: "Index, ETF, or single stock?",
        hook: "Three ways to buy the same market — with very different effort.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "Once you know what a share and an index are, the real choice is *how* you buy in. Three options cover almost everyone — and they sit on a spectrum from hands-on to hands-off.",
          },
          { kind: "diagram", id: "index-etf-stock", caption: "Effort and diversification across the three." },
          {
            kind: "definition",
            term: "ETF — Exchange-Traded Fund",
            text: "A basket of investments that trades like a single stock on an exchange. You get instant diversification, and you can buy or sell any time the market is open.",
          },
          {
            kind: "list",
            items: [
              "**Single stock** — you pick one company. Highest potential reward, highest risk, most homework. One bad call hurts.",
              "**ETF** — a basket you buy and sell live, like a stock. Diversified and flexible, with a small annual fee.",
              "**Index fund** — a basket you buy at end-of-day price, set-and-forget. The simplest way to own a whole market.",
            ],
          },
          {
            kind: "callout",
            variant: "key",
            title: "The honest starting point",
            text: "For most beginners, a low-cost index fund or broad ETF is the calmest first step. You own hundreds of companies at once, so no single one can sink you. Single stocks are a choice you can add later, with money you can afford to be wrong on.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Single stock = most control, most risk, most homework.",
              "An ETF is a diversified basket that trades live like a share.",
              "A broad index fund or ETF is the simplest, steadiest way to start.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What is an ETF?",
            choices: [
              { id: "a", text: "A single company's share" },
              { id: "b", text: "A basket of investments that trades like a stock on an exchange" },
              { id: "c", text: "A type of bank deposit" },
            ],
            correctId: "b",
            explain:
              "An ETF holds many investments but trades like one stock — instant diversification with the flexibility to buy or sell live.",
          },
          {
            id: "q2",
            prompt: "Which is generally the calmest starting point for a beginner?",
            choices: [
              { id: "a", text: "A single hot stock" },
              { id: "b", text: "A low-cost broad index fund or ETF" },
            ],
            correctId: "b",
            explain:
              "A broad index fund/ETF spreads you across hundreds of companies, so no single one can sink you — a steadier first step.",
          },
        ],
      },
      {
        slug: "how-to-read-a-us-stock",
        title: "How to read a US stock",
        hook: "Ticker, market cap, P/E — three numbers, demystified.",
        minutes: 5,
        blocks: [
          {
            kind: "paragraph",
            text: "Open any US stock page and you'll see a wall of numbers. You don't need most of them. Three terms unlock the basics — and none of this is a buy or sell signal, just literacy.",
          },
          {
            kind: "definition",
            term: "Ticker",
            text: "A company's short code on the exchange — like AAPL for Apple or MSFT for Microsoft. It's just the name the market uses to trade it.",
          },
          {
            kind: "definition",
            term: "Market cap",
            text: "The company's total market value: share price × number of shares. It tells you the *size* of the company — large, mid or small — which hints at how steady or volatile it tends to be.",
          },
          {
            kind: "definition",
            term: "P/E ratio (price-to-earnings)",
            text: "Price per share ÷ earnings per share. A rough gauge of how much investors pay for each unit of profit. A high P/E means the market expects strong growth; a low one means modest expectations. Context matters — it's not 'cheap vs expensive' on its own.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "What these numbers are *not*",
            text: "None of these tell you whether a stock will go up. A low P/E isn't automatically a bargain; a big market cap isn't automatically safe. They're vocabulary for understanding a company — not a formula for picking one.",
          },
          {
            kind: "paragraph",
            text: "Read enough stock pages and the words stop being intimidating. You'll know a $3-trillion-cap, low-growth giant from a small, fast-growing, high-P/E newcomer — and why they behave differently.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Ticker = the trading code; market cap = the company's total size.",
              "P/E roughly shows how much investors pay per unit of profit — context-dependent.",
              "These are literacy tools, not buy/sell signals.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "What does 'market cap' measure?",
            choices: [
              { id: "a", text: "The company's total market value (price × shares)" },
              { id: "b", text: "The company's bank balance" },
              { id: "c", text: "The dividend it pays" },
            ],
            correctId: "a",
            explain: "Market cap = share price × number of shares — the market's view of the whole company's size.",
          },
          {
            id: "q2",
            prompt: "A high P/E ratio usually signals that…",
            choices: [
              { id: "a", text: "The stock is definitely overpriced" },
              { id: "b", text: "Investors expect strong future growth — context still matters" },
            ],
            correctId: "b",
            explain:
              "A high P/E means the market is paying a lot per unit of current profit, usually expecting growth. It's not automatically 'too expensive'.",
          },
        ],
      },
      {
        slug: "dividends-splits-and-volatility",
        title: "Dividends, splits & what to expect",
        hook: "What actually lands in your account — and what's just noise.",
        minutes: 4,
        blocks: [
          {
            kind: "definition",
            term: "Dividend",
            text: "A share of profits a company pays out to shareholders, usually every quarter in the US. Not every company pays one — many growth companies reinvest instead.",
          },
          {
            kind: "paragraph",
            text: "Dividends are real cash that shows up in your account. You can spend them or **reinvest** them to buy more shares — which feeds straight back into compounding. (Remember from Module 5: US dividends have 25% withheld, and you claim that credit in India.)",
          },
          {
            kind: "definition",
            term: "Stock split",
            text: "A company divides each share into more shares at a lower price — e.g., one $1,000 share becomes ten $100 shares. Your total value doesn't change; the price-per-share just gets more accessible.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "A split is not free money",
            text: "If a stock splits 10-for-1, you own 10× the shares at 1/10th the price. Same pie, more slices. Headlines make splits sound exciting — they're mostly cosmetic.",
          },
          { kind: "heading", text: "What to expect from the ride" },
          {
            kind: "paragraph",
            text: "Markets don't move in straight lines. A 10–20% drop in a year is normal, not a crisis. The investors who do well aren't the ones who avoid every dip — they're the ones who keep contributing and don't sell in a panic. Expect volatility, and it stops scaring you.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Dividends are cash payouts; reinvesting them powers compounding.",
              "A stock split changes the share count and price, not your total value.",
              "Sharp ups and downs are normal — staying invested is the real skill.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "After a 10-for-1 stock split, what happens to your holding?",
            choices: [
              { id: "a", text: "You own 10× the shares at 1/10th the price — same total value" },
              { id: "b", text: "Your money grows 10×" },
              { id: "c", text: "You lose 90%" },
            ],
            correctId: "a",
            explain: "A split just slices the pie into more pieces. More shares, lower price each, identical total value.",
          },
          {
            id: "q2",
            prompt: "A 15% drop in a single year is best seen as…",
            choices: [
              { id: "a", text: "A normal part of investing" },
              { id: "b", text: "A guaranteed sign to sell everything" },
            ],
            correctId: "a",
            explain:
              "Double-digit dips happen regularly. Staying invested and continuing to contribute beats panic-selling at the bottom.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "tax-and-rules",
    index: 5,
    title: "Tax & rules",
    tagline: "The part everyone avoids — made simple",
    summary:
      "Two taxes, a disclosure, an estate-tax gotcha, and a handful of regulators. Get these straight once and global investing stops feeling scary.",
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
          {
            kind: "definition",
            term: "DTAA — Double Taxation Avoidance Agreement",
            text: "A treaty between India and the US so the same income isn't fully taxed twice. Tax paid in one country becomes a credit in the other.",
          },
          { kind: "heading", text: "1. Dividends" },
          {
            kind: "paragraph",
            text: "When a US company pays you a dividend, the US withholds **25%** before it reaches you — the rate set by the India–US treaty (DTAA). The good news: that 25% becomes a **credit** you claim in India, so the same income isn't taxed twice.",
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
            text: "Foreign holdings must be declared in your Indian tax return (Schedule FA). It's a disclosure, not an extra tax — but skipping it causes real trouble. The next lesson covers it.",
          },
          {
            kind: "keytakeaways",
            items: [
              "US dividends: 25% withheld there, claimed as a credit here (thanks to the DTAA).",
              "Capital gains: not taxed by the US for you — paid in India (LTCG 12.5% after 24m, else slab).",
              "You also have to *report* foreign holdings — see the next lesson.",
            ],
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
            prompt: "What does the DTAA do?",
            choices: [
              { id: "a", text: "Lets the same income be taxed twice, fully" },
              { id: "b", text: "Prevents full double taxation — tax in one country credits against the other" },
            ],
            correctId: "b",
            explain:
              "The India–US DTAA ensures you aren't taxed in full by both countries on the same income. The US withholding becomes a credit in India.",
          },
        ],
      },
      {
        slug: "reporting-schedule-fa",
        title: "Reporting: Schedule FA",
        hook: "The disclosure that keeps your global investing clean.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Here's the rule people most often miss: if you're a resident Indian and you hold assets abroad — US shares, ETFs, a foreign brokerage balance — you must **declare** them in your income-tax return, even if you didn't sell anything and earned nothing.",
          },
          {
            kind: "definition",
            term: "Schedule FA",
            text: "The 'Foreign Assets' section of the Indian income-tax return where residents disclose overseas holdings — shares, funds, accounts — held during the year.",
          },
          {
            kind: "callout",
            variant: "key",
            title: "Disclosure, not double tax",
            text: "Schedule FA doesn't add a tax. It's transparency: you're telling the tax department what you hold abroad. The tax itself is the dividend/capital-gains tax from the previous lesson.",
          },
          {
            kind: "paragraph",
            text: "Why take it seriously? Non-disclosure of foreign assets falls under strict rules and can mean significant penalties — far more painful than the tax ever would have been. The fix is simple: keep your broker's year-end statements, and report.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "When in doubt, get help",
            text: "Foreign-asset reporting has details — currency conversion dates, peak balances, account info. A qualified CA who has done it before is worth it the first year. After that, it's routine.",
          },
          {
            kind: "keytakeaways",
            items: [
              "Residents must declare foreign holdings in Schedule FA — even with no sale or income.",
              "It's a disclosure, not an extra tax.",
              "Skipping it risks heavy penalties; keep broker statements and report (a CA helps year one).",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Do you need to report US shares you hold but didn't sell this year?",
            choices: [
              { id: "a", text: "No — only if you sold them" },
              { id: "b", text: "Yes — holdings are disclosed in Schedule FA regardless of selling" },
            ],
            correctId: "b",
            explain:
              "Schedule FA is about *holding* foreign assets, not just selling. Residents disclose them even with no transaction.",
          },
          {
            id: "q2",
            prompt: "Schedule FA is best described as…",
            choices: [
              { id: "a", text: "An extra tax on foreign assets" },
              { id: "b", text: "A disclosure of foreign assets — transparency, not a new tax" },
            ],
            correctId: "b",
            explain:
              "It's a reporting requirement. The actual tax is the dividend/capital-gains tax; Schedule FA just discloses what you hold.",
          },
        ],
      },
      {
        slug: "the-estate-tax-gotcha",
        title: "The estate-tax gotcha",
        hook: "The rule almost nobody mentions — and you should know.",
        minutes: 4,
        blocks: [
          {
            kind: "paragraph",
            text: "Here's one the brochures skip. If you hold US assets *directly* and the holder passes away, the **US** can levy an estate tax on those assets — even for non-resident Indians who never set foot there.",
          },
          { kind: "diagram", id: "estate-tax", caption: "The threshold and why it matters." },
          {
            kind: "definition",
            term: "US estate tax (for non-residents)",
            text: "A tax the US can charge on US-situated assets (like directly-held US stocks) when the owner dies. For non-residents the exemption is small — around $60,000 — and rates above it can climb steeply.",
          },
          {
            kind: "paragraph",
            text: "This isn't a reason to avoid global investing — it's a reason to *plan* once your US holdings get sizeable. Many investors simply never learn this until it's relevant, and that's the problem we're fixing here.",
          },
          {
            kind: "callout",
            variant: "note",
            title: "Ways people manage it",
            text: "Holding US exposure through funds or GIFT-City structures (instead of direct US shares), joint holding, nominations, and term insurance to cover any liability are common approaches. The right one depends on your situation — this is exactly where professional advice earns its fee.",
          },
          {
            kind: "callout",
            variant: "caution",
            title: "Not advice",
            text: "Estate tax is genuinely technical and personal. Treat this as awareness, then talk to a cross-border tax/estate advisor before your US holdings grow large.",
          },
          {
            kind: "keytakeaways",
            items: [
              "The US can tax directly-held US assets on the owner's death — even for non-residents.",
              "The non-resident exemption is small (~$60,000); above it, rates climb.",
              "Funds/GIFT structures, joint holding and insurance are common ways to plan — get advice.",
            ],
          },
        ],
        quiz: [
          {
            id: "q1",
            prompt: "Can US estate tax affect a non-resident Indian's directly-held US stocks?",
            choices: [
              { id: "a", text: "No, never" },
              { id: "b", text: "Yes — US-situated assets can be subject to it, with a small (~$60k) exemption" },
            ],
            correctId: "b",
            explain:
              "Directly-held US assets are US-situated, so US estate tax can apply on the owner's death — with only a small exemption for non-residents.",
          },
          {
            id: "q2",
            prompt: "A common way investors reduce this exposure is…",
            choices: [
              { id: "a", text: "Holding US exposure via funds/GIFT structures rather than direct shares" },
              { id: "b", text: "Never telling anyone they invest" },
            ],
            correctId: "a",
            explain:
              "Owning US exposure through a fund or GIFT-City structure (vs direct US shares), plus joint holding and insurance, are common approaches — with advice.",
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
          {
            kind: "keytakeaways",
            items: [
              "RBI controls money leaving India (LRS); SEBI regulates markets; IFSCA oversees GIFT City.",
              "In the US, the SEC oversees companies and FINRA oversees brokers.",
              "Multiple regulators on both sides exist to protect you — not to block you.",
            ],
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
            explain: "IFSCA is the dedicated regulator for India's IFSC at GIFT City.",
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
