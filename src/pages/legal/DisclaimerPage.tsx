import { PageHeader } from '../../components/PageHeader'
import { SITE } from '../../config/site'
import './legal.css'

export function DisclaimerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Disclaimer"
        lede="Read this in full before engaging our services."
      />

      <section className="section">
        <div className="shell legal prose">
          <div className="notice notice--warn">
            <p style={{ marginBottom: 0 }}>
              <strong>
                All materials and services provided by {SITE.legalEntity} are for
                educational purposes only.
              </strong>{' '}
              Nothing on this site or delivered in the course of an engagement
              constitutes investment advice, tax advice, legal advice, a recommendation
              to buy or sell any security or digital asset, an offer of credit, or a
              commitment to lend.
            </p>
          </div>

          <h2>What we are not</h2>
          <p>
            {SITE.legalEntity} is not, and does not hold itself out as, any of the
            following:
          </p>
          <ul>
            <li>A registered investment adviser or investment adviser representative</li>
            <li>A broker-dealer</li>
            <li>A mortgage broker, mortgage lender, or mortgage loan originator</li>
            <li>A bank, credit union, or other depository institution</li>
            <li>A money services business or money transmitter</li>
            <li>A digital asset custodian, exchange, or wallet provider</li>
            <li>A certified public accountant, tax preparer, or attorney</li>
          </ul>
          <p>
            We hold no licence in any of these capacities and provide no service
            requiring one. If you require personalized investment, tax, or legal advice,
            engage a professional licensed to provide it.
          </p>

          <h2>No custody</h2>
          <p>
            {SITE.name} does not at any time take possession, custody, or control of
            client funds, loan proceeds, or digital assets. Clients apply to licensed
            third-party lenders of their own choosing, receive funds directly from those
            lenders, open their own accounts with digital asset platforms, execute all
            purchases themselves, and retain sole control of their own private keys.
          </p>

          <h2>Risk of loss</h2>
          <p>
            Borrowing against residential real property places that property at risk. A
            home equity line of credit or cash-out refinance is secured by your home. If
            you fail to make required payments, your lender may pursue remedies including
            foreclosure. You remain obligated to repay the full loan balance regardless of
            the performance of any asset you purchase with the proceeds.
          </p>
          <p>
            Bitcoin and other digital assets are highly volatile and speculative. Bitcoin
            has experienced declines exceeding 80% from prior highs in every completed
            market cycle to date. You could lose a substantial portion or all of any
            amount you allocate to it while remaining fully liable for the underlying
            loan. Past performance is not indicative of and provides no assurance of
            future results.
          </p>

          <h2>No projections or guarantees</h2>
          <p>
            We publish no price targets, return forecasts, or performance projections for
            Bitcoin or any other asset, and we make no representation that any historical
            pattern will recur. Any historical information presented on this site is
            descriptive, approximate, and provided for general education only.
          </p>

          <h2>Illustrative figures</h2>
          <p>
            Any calculator output, worked example, or figure shown on this site is an
            illustration generated from assumptions and from values you supply. Such
            figures are not quotes, offers, pre-qualifications, appraisals, or
            commitments. Actual borrowing capacity, interest rates, fees, and terms are
            determined solely by your lender following its own underwriting and will
            differ from any figure shown here. Bitcoin reference prices used in
            illustrations are static historical values, not live market quotes.
          </p>

          <h2>Fees</h2>
          <p>
            Our milestone success fee is charged for services rendered and verified. It
            is not contingent on the performance of Bitcoin or any other asset, and no
            portion of our compensation varies with your investment results.
          </p>

          <h2>Independent professional advice</h2>
          <p>
            You should consult your own attorney, certified public accountant, and
            licensed financial professional regarding your specific circumstances before
            borrowing against your home or acquiring digital assets. Tax treatment of
            interest on funds borrowed against a residence depends on the use of the
            proceeds and may differ materially from treatment of funds used for home
            improvement.
          </p>

          <p className="muted small">
            Questions about anything on this page: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
