import { CALCULATOR_DEFAULTS, INTEREST_ONLY_RESERVE, MILESTONE_FEE_RATE } from "../config/site";
import { calculateEquity } from "../lib/equity";
import { formatPercent, formatUsd, formatUsdPrecise } from "../lib/format";

export const BRAND = {
  name: "Equity2Bitcoin",
  legalName: "Equity2Bitcoin Consulting LLC",
  tagline: "Turning untapped home equity into sovereign opportunity.",
  principle: "Educate first, advise never, and empower always.",
};

export const PHASES = [
  {
    index: "01",
    title: "Equity Profile Review & Education",
    body: "We map your home equity position, walk through HELOC and cash-out options in plain language, and deliver a readiness report so you understand what is actually available.",
    fee: "No fee",
    paid: false,
  },
  {
    index: "02",
    title: "Loan Preparation & Documentation",
    body: "Checklists, document workflows, and underwriting education so you can submit a complete application to a licensed lender — without us brokering or arranging the loan.",
    fee: "No fee",
    paid: false,
  },
  {
    index: "03",
    title: "Loan Approval & Funding",
    body: "When your lender approves and funds the extraction, the milestone is verified. This is the only paid milestone — tied to extraction, never to Bitcoin performance.",
    fee: "30% success fee",
    paid: true,
  },
  {
    index: "04",
    title: "Bitcoin Integration & Custody Education",
    body: "Exchange onboarding, self-custody hygiene, hardware wallet practices, and long-horizon holding education. You execute every transaction yourself.",
    fee: "No fee",
    paid: false,
  },
  {
    index: "05",
    title: "Verification & Documentation",
    body: "Closing packet with third-party verification artifacts and a clear acknowledgment that the engagement was educational and non-custodial.",
    fee: "No fee",
    paid: false,
  },
] as const;

/** Plan §I volatility acknowledgment — shown on the homepage, not only in legal pages. */
export const VOLATILITY_STATEMENT =
  "Bitcoin is highly volatile. Drawdowns of 50% happen regularly. Declines of 80% or more have occurred in every market cycle to date. Any strategy that borrows against your home to acquire it places a fixed, secured obligation against an asset that can lose most of its value — and your home is the collateral. Nothing on this site should be read as a prediction that Bitcoin will rise.";

export const GOOD_FIT = [
  "You own your home and have meaningful equity beyond the cushion lenders typically require you to keep.",
  "You can comfortably service an additional monthly payment out of current income — without counting on Bitcoin going up.",
  "You have a genuinely long horizon and will not need this money back within four to six years.",
  "You want to understand the mechanics yourself rather than hand decisions to someone else.",
  "You know Bitcoin falls 50% routinely and have decided that is a risk you can live with.",
];

export const POOR_FIT = [
  "You would need to sell Bitcoin to make the loan payment. That combination has ruined people.",
  "Your income is unstable, or the new payment would stretch your monthly budget.",
  "You might need the equity for something else soon — renovation, tuition, medical costs, near-term retirement.",
  "You are behind on your mortgage, or your equity cushion is already thin.",
  "You want someone to tell you Bitcoin will go up. We will not, because nobody honestly can.",
  "A 50–80% drawdown in the value of your position would cause real financial or personal distress.",
];

export const FAQS = [
  {
    q: "What exactly am I paying for?",
    a: "Education, documentation support, and milestone verification across five phases. You are not paying for a loan, for Bitcoin, or for advice about whether to buy it.",
  },
  {
    q: "Do you handle my loan proceeds or Bitcoin?",
    a: "No. Equity2Bitcoin never takes custody of funds, Bitcoin, or loan instruments. You work with licensed lenders and execute Bitcoin purchases and custody decisions independently.",
  },
  {
    q: "Do you arrange the loan for me?",
    a: "No. We are not mortgage brokers or loan originators. We teach what lenders look for and help you assemble a complete package. Choosing the lender and accepting terms stays yours.",
  },
  {
    q: "When do I pay, and how much?",
    a: `Only after Phase 3 — verified loan approval or funding. The fee is ${formatPercent(MILESTONE_FEE_RATE)} of the equity extracted. Phases 1, 2, 4, and 5 carry no fee.`,
  },
  {
    q: "So less than I borrow actually reaches Bitcoin?",
    a: `Correct — and this is the most important thing to understand before going further. If you draw $200,000, the fee is $60,000 and $140,000 reaches Bitcoin — but you owe payments on the full $200,000. The calculator shows that subtraction explicitly.`,
  },
  {
    q: "Why is the fee a share of the loan rather than a flat rate?",
    a: "It scales with engagement size, and it cannot be tied to investment performance — a performance fee would make this an advisory relationship requiring licenses we do not hold. The fee is tied to a verified service milestone, never to what Bitcoin does afterward.",
  },
  {
    q: "What if my loan is denied?",
    a: "There is no success fee without verified extraction. You still keep the educational work product from earlier phases.",
  },
  {
    q: "What happens if Bitcoin falls after I buy?",
    a: "You still owe your lender every dollar, on schedule, and your home is the collateral. Bitcoin has fallen more than 50% many times and more than 80% in every cycle so far. If the payment depends on Bitcoin rising, this is not for you.",
  },
  {
    q: "Could I lose my home?",
    a: "A HELOC or cash-out refinance is secured by your home. If you cannot make the payments, the lender has recourse against the property, up to and including foreclosure. That is true of any home-equity borrowing — and especially worth stating when proceeds go into a volatile asset.",
  },
  {
    q: "Are you a registered investment adviser?",
    a: "No. We do not manage assets or make personalized recommendations about whether Bitcoin belongs in your portfolio. Our services are educational. For tailored advice, speak with a licensed fiduciary.",
  },
  {
    q: "Are you a bank, lender, or money transmitter?",
    a: "No. We do not lend, originate, broker, hold, or transmit funds or digital assets. We work alongside licensed lenders and established platforms; we are not one.",
  },
  {
    q: "Should I talk to my own accountant or attorney?",
    a: "Yes. Borrowing against your home to acquire a volatile asset has tax and legal implications specific to your situation. Interest deductibility, in particular, depends on how proceeds are used and is not the same as for home improvement.",
  },
] as const;

export const QUIZ_QUESTIONS = [
  {
    id: "equity",
    prompt: "Roughly how much tappable equity do you believe you have?",
    options: [
      { label: "Under $100,000", value: "under_100k", score: 1 },
      { label: "$100,000 – $250,000", value: "100_250k", score: 2 },
      { label: "$250,000 – $500,000", value: "250_500k", score: 3 },
      { label: "Over $500,000", value: "over_500k", score: 4 },
    ],
  },
  {
    id: "ownership",
    prompt: "How long have you owned your primary residence?",
    options: [
      { label: "Less than 2 years", value: "lt_2", score: 1 },
      { label: "2 – 5 years", value: "2_5", score: 2 },
      { label: "5 – 10 years", value: "5_10", score: 3 },
      { label: "10+ years", value: "10_plus", score: 4 },
    ],
  },
  {
    id: "goal",
    prompt: "What best describes your interest right now?",
    options: [
      { label: "Just curious — educating myself", value: "curious", score: 2 },
      { label: "Exploring HELOC / cash-out options", value: "heloc", score: 3 },
      { label: "Ready to build a Bitcoin position thoughtfully", value: "btc_ready", score: 4 },
      { label: "Comparing this to other wealth strategies", value: "compare", score: 3 },
    ],
  },
  {
    id: "btc",
    prompt: "How familiar are you with Bitcoin self-custody?",
    options: [
      { label: "New — I need the basics", value: "new", score: 2 },
      { label: "I have bought before, still learning custody", value: "some", score: 3 },
      { label: "Comfortable with exchanges and wallets", value: "comfortable", score: 4 },
      { label: "Advanced / multi-sig curious", value: "advanced", score: 4 },
    ],
  },
  {
    id: "capacity",
    prompt: "If Bitcoin fell 80% and stayed there, could you still make the loan payment from income alone?",
    options: [
      { label: "No — I would need the asset to recover", value: "depends_on_btc", score: 1 },
      { label: "Unsure / it would be a stretch", value: "stretch", score: 1 },
      { label: "Probably, with some budget changes", value: "probably", score: 2 },
      { label: "Yes — from ordinary income, without selling", value: "yes_income", score: 4 },
    ],
  },
  {
    id: "timeline",
    prompt: "When would you want to take a first concrete step?",
    options: [
      { label: "Just researching this year", value: "research", score: 1 },
      { label: "In the next 3 – 6 months", value: "3_6mo", score: 3 },
      { label: "In the next 30 – 90 days", value: "30_90", score: 4 },
      { label: "As soon as I understand the path", value: "asap", score: 4 },
    ],
  },
] as const;

export type QuizAnswers = Record<string, string>;

export function scoreQuiz(answers: QuizAnswers): {
  score: number;
  max: number;
  band: "explore" | "qualified" | "priority";
  label: string;
  summary: string;
} {
  let score = 0;
  let max = 0;
  for (const q of QUIZ_QUESTIONS) {
    max += 4;
    const selected = q.options.find((o) => o.value === answers[q.id]);
    if (selected) score += selected.score;
  }

  const capacity = answers.capacity;
  if (capacity === "depends_on_btc" || capacity === "stretch") {
    return {
      score,
      max,
      band: "explore",
      label: "Not a fit right now — and that is okay",
      summary:
        "If the loan payment depends on Bitcoin recovering, this path is the wrong risk for your household. Read “Is this for you,” keep learning, and revisit only if that answer changes.",
    };
  }

  if (score >= 20) {
    return {
      score,
      max,
      band: "priority",
      label: "Strong fit for an orientation",
      summary:
        "Your equity position, payment capacity, and timing suggest a high-signal conversation. Book a free orientation and we will walk the milestone path with clear compliance boundaries.",
    };
  }
  if (score >= 14) {
    return {
      score,
      max,
      band: "qualified",
      label: "Good candidate — start with education",
      summary:
        "You are in range for a productive orientation. We will focus on feasibility, lender pathways, and whether this model fits your household — with no pressure to proceed.",
    };
  }
  return {
    score,
    max,
    band: "explore",
    label: "Keep learning — then revisit",
    summary:
      "Equity access, Bitcoin literacy, or timing may still be early-stage. Use the calculator and fit checklist first; book an orientation when the payment-capacity test is a clear yes.",
  };
}

/**
 * Corrected worked example for the homepage.
 * Uses Appendix B-style inputs ($700k / $300k) so the LTV math is honest at 80%.
 * (Plan §III.F's $700k/$400k → $300k extractable conflates raw equity with tappable.)
 */
export const WORKED_EXAMPLE = calculateEquity({
  homeValue: 700_000,
  mortgageBalance: 300_000,
  maxLtv: CALCULATOR_DEFAULTS.maxLtv,
  aprPercent: CALCULATOR_DEFAULTS.aprPercent,
  amortizationYears: CALCULATOR_DEFAULTS.amortizationYears,
});

export const CASE_STEPS = [
  { label: "Home value", value: formatUsd(700_000) },
  { label: "Remaining mortgage", value: formatUsd(300_000) },
  { label: "Equity on paper", value: formatUsd(WORKED_EXAMPLE.rawEquity) },
  {
    label: `Actually borrowable (${formatPercent(CALCULATOR_DEFAULTS.maxLtv)} LTV)`,
    value: formatUsd(WORKED_EXAMPLE.tappableEquity),
  },
  { label: "Phases 1–2 education & prep", value: "$0" },
  {
    label: `Phase 3 success fee (${formatPercent(MILESTONE_FEE_RATE)})`,
    value: `−${formatUsd(WORKED_EXAMPLE.milestoneFee)}`,
  },
  {
    label: `Interest-only reserve (${INTEREST_ONLY_RESERVE.label}) — ${formatUsdPrecise(WORKED_EXAMPLE.monthlyInterestOnly)} × ${WORKED_EXAMPLE.interestOnlyMonths} mo`,
    value: `−${formatUsd(WORKED_EXAMPLE.interestOnlyReserve)}`,
  },
  { label: "Reaches Bitcoin", value: formatUsd(WORKED_EXAMPLE.netToBitcoin) },
  { label: "Phases 4–5 Bitcoin education & close", value: "$0" },
] as const;
