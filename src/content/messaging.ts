/** Brand language from the business plan §V.A, §V.B, and §V.F. */

export const BRAND = {
  essence: 'Turning untapped home equity into sovereign opportunity.',
  principle: 'Educate first, advise never, empower always.',
  promise:
    'To help homeowners understand and act on their equity potential without confusion, risk, or dependency.',
} as const

/** §V.F — the four themes the whole site is written around. */
export const MESSAGING_THEMES = [
  {
    headline: 'Equity isn’t wealth until it moves.',
    body: 'Most American homeowners are sitting on the largest asset they will ever own, doing nothing. Equity is real, but it is inert until you decide to reposition it.',
  },
  {
    headline: 'You already earned the capital — the question is positioning.',
    body: 'This is not about taking a risk you haven’t earned the right to take. It is about understanding what your existing balance sheet can and cannot support.',
  },
  {
    headline: 'Own both sides of the hard-asset spectrum.',
    body: 'Real estate is scarcity you can stand in. Bitcoin is scarcity you can verify. Some homeowners want exposure to both, and want to understand the tradeoff before acting.',
  },
  {
    headline: 'Education first. Always.',
    body: 'We are not licensed investment advisers and we do not become one on your behalf. We teach the mechanics; every decision and every transaction stays yours.',
  },
] as const

/** The non-negotiables, shown as a trust bar under the hero. */
export const TRUST_POINTS = [
  {
    label: 'We never touch your money',
    detail: 'No custody of funds, Bitcoin, or loan proceeds at any point.',
  },
  {
    label: 'You choose your own lender',
    detail: 'You apply directly to licensed lenders. We do not originate or broker loans.',
  },
  {
    label: 'You hold your own keys',
    detail: 'Self-custody is taught, not provided. Your Bitcoin never passes through us.',
  },
  {
    label: 'One fee, disclosed up front',
    detail: 'Four of five milestones cost nothing. The fee is stated before you sign anything.',
  },
] as const

/** §II.B target segments, rewritten as honest self-qualification. */
export const GOOD_FIT = [
  'You own your home and have meaningful equity built up beyond the standard 20% lenders require you to keep.',
  'You can comfortably service an additional monthly payment out of current income — without counting on Bitcoin going up.',
  'You have a genuinely long horizon and will not need this money back within four to six years.',
  'You want to understand the mechanics yourself rather than hand decisions to someone else.',
  'You have read enough about Bitcoin to know it falls 50% routinely and you have decided that is a risk you can live with.',
]

/** The disqualifiers. Publishing these costs some leads and is worth it. */
export const POOR_FIT = [
  'You would need to sell Bitcoin to make the loan payment. This strategy adds a fixed obligation against a volatile asset — that combination has ruined people.',
  'Your income is unstable, or the new payment would stretch your monthly budget.',
  'You might need the equity for something else — a renovation, tuition, medical costs, retirement in the near term.',
  'You are behind on your mortgage, or your equity cushion is already thin.',
  'You are looking for someone to tell you Bitcoin will go up. We will not, because nobody honestly can.',
  'A 50–80% drawdown in the value of your position would cause you real financial or personal distress.',
]

/**
 * §I "Volatility Acknowledgment," published verbatim in substance.
 * This appears on the homepage, not buried in a legal page.
 */
export const VOLATILITY_STATEMENT =
  'Bitcoin is highly volatile. Drawdowns of 50% happen regularly. Declines of 80% or more have occurred in every market cycle to date. Any strategy that borrows against your home to acquire it places a fixed, secured obligation against an asset that can lose most of its value — and your home is the collateral. Nothing on this site should be read as a prediction that Bitcoin will rise.'
