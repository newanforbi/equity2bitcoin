import { SITE } from '../config/site'

/**
 * The site-wide disclaimer, rendered in the footer on every route.
 *
 * Business plan §X.E requires this language on all public-facing materials. It is not
 * decoration — keep it visible and keep it plain.
 */
export function Disclaimer() {
  return (
    <div className="notice tiny">
      <p>
        <strong>For educational purposes only.</strong> {SITE.legalEntity} is not a
        registered investment adviser, broker-dealer, mortgage broker, mortgage loan
        originator, bank, lender, or money transmitter, and is not licensed as any of
        these. Nothing on this site is investment advice, tax advice, legal advice, a
        recommendation to buy or sell any asset, an offer of credit, or a commitment to
        lend.
      </p>
      <p>
        {SITE.name} does not take custody of, hold, transmit, or manage client funds,
        loan proceeds, or digital assets at any time. Clients apply to licensed
        third-party lenders independently and execute all digital asset transactions
        themselves.
      </p>
      <p>
        Borrowing against your home places your property at risk. Bitcoin is highly
        volatile and has declined more than 80% in past market cycles. You could owe the
        full loan balance while your Bitcoin position is worth substantially less than
        you paid. Consult your own attorney, accountant, and licensed financial
        professional before acting. Any figures shown are illustrative estimates, not
        quotes, offers, or projections.
      </p>
    </div>
  )
}
