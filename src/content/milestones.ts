/**
 * The five milestone phases, from the business plan §III.B.
 *
 * Only Milestone 3 carries a fee. That asymmetry is the offer, so it is stated on
 * every milestone rather than buried in a pricing footnote.
 */

export interface Milestone {
  number: number
  title: string
  objective: string
  activities: string[]
  deliverable: string
  trigger: string
  /** null means no fee at this phase. */
  fee: string | null
}

export const MILESTONES: Milestone[] = [
  {
    number: 1,
    title: 'Equity Profile Review & Education',
    objective:
      'Understand how much equity you actually have access to, and what repositioning it would mean for your balance sheet.',
    activities: [
      'Equity Profile Review using public home value and loan data',
      'Feasibility workbook covering loan-to-value ratios, cash-out options, and timing',
      'Education on the reasoning behind pairing home equity with a long-horizon asset',
    ],
    deliverable: 'A written Equity-to-Bitcoin Readiness Report built around your numbers.',
    trigger: 'Education session completed and report delivered.',
    fee: null,
  },
  {
    number: 2,
    title: 'Loan Preparation & Documentation',
    objective:
      'Get your paperwork in order so you can approach a licensed lender prepared rather than guessing.',
    activities: [
      'Review of documentation required for a HELOC, refinance, or portfolio line of credit',
      'Education on underwriting criteria, credit considerations, and supporting documents',
      'Checklists and workflow templates for submission',
      'Procedural questions answered — without personalized loan advice',
    ],
    deliverable: 'A complete application package, ready for you to submit to your chosen lender.',
    trigger: 'Preparatory documents complete and you are ready to submit.',
    fee: null,
  },
  {
    number: 3,
    title: 'Loan Approval & Funding',
    objective:
      'You apply to a licensed lender of your choosing. They underwrite, approve, and fund. We never touch the money.',
    activities: [
      'Coordination of timelines against your submitted application',
      'Verification of your loan approval and draw authorization',
      'Compliance and documentation readiness check',
    ],
    deliverable: 'Loan approval and funds received directly from your lender.',
    trigger: 'Verified loan approval or draw.',
    fee: '30% of the equity you extract',
  },
  {
    number: 4,
    title: 'Bitcoin Integration & Custody Education',
    objective:
      'Learn to acquire and secure Bitcoin yourself, on platforms you control, with keys you hold.',
    activities: [
      'Instruction on regulated exchanges and self-custody platforms',
      'Private key management, hardware wallet use, and security practice',
      'How dollar-cost averaging and lump-sum timing differ — without a recommendation on which to use',
    ],
    deliverable:
      'A Bitcoin Integration Plan documenting the custody model you selected, plus a risk education acknowledgment.',
    trigger: 'You sign the Bitcoin education acknowledgment.',
    fee: null,
  },
  {
    number: 5,
    title: 'Verification & Documentation',
    objective:
      'Close out the engagement with independent verification and a complete record of everything delivered.',
    activities: [
      'Collection of third-party proof: closing statement, purchase receipt, wallet confirmation',
      'Final Milestone Completion Packet summarizing every service rendered',
      'Written acknowledgment of the non-custodial, education-only relationship',
    ],
    deliverable: 'Final Milestone Completion Packet with verification of all five phases.',
    trigger: 'Verification complete and acknowledged.',
    fee: null,
  },
]
