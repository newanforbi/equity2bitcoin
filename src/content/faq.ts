/**
 * FAQ built from the business plan §IV.C (compliance boundaries) and §VII (risk factors).
 *
 * The hard questions are answered first and answered plainly. A prospect who finds the
 * uncomfortable answer here rather than on a call is a better-qualified prospect.
 */

export interface FaqItem {
  question: string
  answer: string
  group: 'The offer' | 'The fee' | 'Risk' | 'What we are not'
}

export const FAQ: FaqItem[] = [
  {
    group: 'The offer',
    question: 'What exactly am I paying for?',
    answer:
      'Education, documentation support, and milestone verification across five phases: understanding your equity position, preparing a lender-ready application package, verifying your funding, learning self-custody, and closing out with a documented record. You are not paying for a loan, for Bitcoin, or for advice about whether to buy it.',
  },
  {
    group: 'The offer',
    question: 'Do you handle my money or my Bitcoin?',
    answer:
      'No. Never, at any point. You apply to a licensed lender directly and they fund you directly. You open your own exchange account and buy Bitcoin yourself. You set up your own wallet and hold your own keys. Nothing passes through us, which is exactly why we can operate as an educational consultancy rather than a regulated custodian.',
  },
  {
    group: 'The offer',
    question: 'Do you arrange the loan for me?',
    answer:
      'No. We are not mortgage brokers or loan originators and we are not licensed as either. We teach you what lenders look for and help you assemble a complete package. Choosing the lender, submitting the application, and accepting the terms are all yours.',
  },
  {
    group: 'The offer',
    question: 'What if my loan is denied?',
    answer:
      'Then there is no fee. The milestone fee triggers only on verified loan approval and funding. Milestones 1 and 2 are free, so a denial costs you nothing but time.',
  },
  {
    group: 'The fee',
    question: 'How much is the fee, and when do I pay it?',
    answer:
      'The fee is 30% of the equity you extract, charged once, at Milestone 3 — after your lender approves and funds your draw. Milestones 1, 2, 4, and 5 carry no fee. On a $200,000 draw the fee is $60,000.',
  },
  {
    group: 'The fee',
    question: 'So less than I borrow actually reaches Bitcoin?',
    answer:
      'Correct, and this is the most important thing to understand before going further. If you draw $200,000, the fee is $60,000 and $140,000 reaches Bitcoin — but you owe payments on the full $200,000, because that is what your lender advanced you. The calculator on this site shows that subtraction explicitly. Anyone presenting this strategy without showing you the net figure is not being straight with you.',
  },
  {
    group: 'The fee',
    question: 'Why is the fee a share of the loan rather than a flat rate?',
    answer:
      'It scales the fee to the size of the engagement. It is also the fairest structure we can offer under the constraint that the fee cannot be tied to investment performance — a performance-based fee would make this an advisory relationship, which carries licensing requirements we do not hold and do not want. The fee is tied to a verified service milestone, never to what Bitcoin does afterward.',
  },
  {
    group: 'The fee',
    question: 'Can I negotiate it, or pay it from something other than the draw?',
    answer:
      'Fee terms are set out in the milestone agreement before you sign, and you will see the full schedule during the free orientation call. How you fund the fee is your decision. Bring the question to the call — it is a normal thing to ask.',
  },
  {
    group: 'Risk',
    question: 'What happens if Bitcoin falls after I buy?',
    answer:
      'You still owe your lender every dollar, on schedule, and your home is the collateral securing it. Bitcoin has fallen more than 50% many times and more than 80% in every cycle so far. This strategy is only appropriate if you can service the loan out of income regardless of what Bitcoin does. If the payment depends on Bitcoin rising, this is not for you and we will tell you so.',
  },
  {
    group: 'Risk',
    question: 'Could I lose my home?',
    answer:
      'A HELOC or cash-out refinance is secured by your home. If you cannot make the payments, the lender has recourse against the property, up to and including foreclosure. That is true of any home equity borrowing, but it deserves stating plainly here because the proceeds are going into a volatile asset rather than a kitchen renovation.',
  },
  {
    group: 'Risk',
    question: 'Are the returns you show guaranteed, or projected?',
    answer:
      'Neither — we do not publish return projections at all. The material on this site describing Bitcoin covers what has happened historically. Past performance says nothing reliable about the future, and any consultant showing you a price target for Bitcoin is guessing.',
  },
  {
    group: 'What we are not',
    question: 'Are you a registered investment adviser?',
    answer:
      'No. We do not hold ourselves out as investment advisers, we do not manage assets, and we do not make personalized recommendations about whether Bitcoin belongs in your portfolio. Our services are educational. If you want a recommendation tailored to your full financial picture, you should speak with a licensed fiduciary adviser, and we will say the same on the call.',
  },
  {
    group: 'What we are not',
    question: 'Are you a bank, lender, or money transmitter?',
    answer:
      'No. We do not lend, originate, broker, hold, or transmit funds or digital assets. We work alongside licensed lenders and established custody platforms; we are not one.',
  },
  {
    group: 'What we are not',
    question: 'Should I talk to my own accountant or attorney?',
    answer:
      'Yes, and we recommend it. Borrowing against your home to acquire a volatile asset has tax and legal implications specific to your situation. Interest deductibility, in particular, depends on how the proceeds are used, and the treatment for this use is not the same as for home improvement. Bring your own professionals in early.',
  },
]

export const FAQ_GROUPS = ['The offer', 'The fee', 'Risk', 'What we are not'] as const
