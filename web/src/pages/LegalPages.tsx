import { SITE } from "../config/site";
import { BRAND } from "../data/content";

export function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <p className="compliance-strip">Draft pending counsel review. Do not treat as final legal terms.</p>
        <h1>Terms of Service</h1>
        <p>Last updated: August 2, 2026</p>
        <p>
          These Terms govern your use of {BRAND.name} digital properties operated by {BRAND.legalName}. By accessing
          the site or requesting a consultation, you agree to these Terms.
        </p>
        <h2>Educational services only</h2>
        <p>
          Equity2Bitcoin provides educational consulting and milestone-based documentation support. We are not a bank,
          mortgage lender, mortgage broker, investment adviser, commodity trading adviser, broker-dealer, money
          transmitter, or Bitcoin custodian.
        </p>
        <h2>No guarantees</h2>
        <p>
          We do not guarantee loan approval, interest rates, Bitcoin purchase execution, Bitcoin performance, tax
          outcomes, or any financial result. Hypothetical examples on the site are illustrative only.
        </p>
        <h2>Client responsibility</h2>
        <p>
          You remain solely responsible for evaluating risks, selecting lenders and platforms, executing transactions,
          securing private keys, and complying with applicable law. You should consult independent legal, tax, and
          financial professionals as needed.
        </p>
        <h2>Fees</h2>
        <p>
          Success fees, if any, are defined in a written Milestone Agreement and are triggered only by verified
          milestones stated therein — typically verified equity extraction — not by investment performance.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these Terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> (confirm monitored address
          before launch).
        </p>
      </div>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <p className="compliance-strip">Draft pending counsel review. Update if analytics, CRM, or pixels are added.</p>
        <h1>Privacy Policy</h1>
        <p>Last updated: August 2, 2026</p>
        <p>
          {BRAND.legalName} respects your privacy. This Policy describes how we collect and use information when you
          use Equity2Bitcoin.com or request an orientation.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you submit (name, email, phone)</li>
          <li>Equity IQ quiz responses and readiness notes</li>
          <li>Scheduling metadata if you book via Calendly</li>
          <li>Optional lead-webhook payload if a webhook URL is configured</li>
        </ul>
        <p>
          The equity calculator runs entirely in your browser; calculator inputs are not transmitted to us unless you
          later choose to share them.
        </p>
        <h2>How we use information</h2>
        <ul>
          <li>To respond to consultation requests and operate the milestone workflow</li>
          <li>To improve educational content and site experience</li>
          <li>To meet legal, security, and compliance recordkeeping needs</li>
        </ul>
        <h2>Sharing</h2>
        <p>
          We do not sell personal information. We may use processors such as scheduling, CRM, and email tools under
          contractual safeguards. We never take custody of your loan proceeds or Bitcoin.
        </p>
        <h2>Retention & rights</h2>
        <p>
          We retain information as needed for the engagement and legitimate business records. Depending on your
          jurisdiction, you may request access, correction, or deletion by contacting{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </main>
  );
}

export function DisclosuresPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <h1>Important disclosures</h1>
        <p>
          Equity2Bitcoin operates an education-first, non-custodial consulting model. Please read these disclosures
          before booking.
        </p>

        <div className="compliance-strip">
          <strong>All materials and services are for educational purposes only.</strong> Nothing on this site or
          delivered in an engagement constitutes investment advice, tax advice, legal advice, a recommendation to buy
          or sell any asset, an offer of credit, or a commitment to lend.
        </div>

        <h2>What we are not</h2>
        <p>{BRAND.legalName} is not, and does not hold itself out as, any of the following:</p>
        <ul>
          <li>A registered investment adviser or investment adviser representative</li>
          <li>A broker-dealer</li>
          <li>A mortgage broker, mortgage lender, or mortgage loan originator</li>
          <li>A bank, credit union, or other depository institution</li>
          <li>A money services business or money transmitter</li>
          <li>A digital asset custodian, exchange, or wallet provider</li>
          <li>A certified public accountant, tax preparer, or attorney</li>
        </ul>

        <h2>No custody</h2>
        <p>
          We do not at any time take possession, custody, or control of client funds, loan proceeds, or digital assets.
          Clients apply to licensed third-party lenders of their own choosing, receive funds directly, open their own
          accounts, execute all purchases themselves, and retain sole control of their private keys.
        </p>

        <h2>Risk of loss</h2>
        <ul>
          <li>
            Borrowing against residential real property places that property at risk. Failure to make payments can lead
            to foreclosure.
          </li>
          <li>
            Bitcoin is highly volatile and speculative. Declines exceeding 80% from prior highs have occurred in every
            completed market cycle to date.
          </li>
          <li>You remain obligated to repay the full loan balance regardless of Bitcoin performance.</li>
          <li>Interest rates, fees, and underwriting criteria change and may make extraction impractical.</li>
          <li>Self-custody errors can result in irreversible loss of Bitcoin.</li>
        </ul>

        <h2>No projections or guarantees</h2>
        <p>
          We publish no price targets, return forecasts, or performance projections for Bitcoin. Historical information
          is descriptive and approximate. Past performance is not indicative of future results.
        </p>

        <h2>Illustrative figures</h2>
        <p>
          Calculator outputs and worked examples are illustrations from assumptions and values you supply. They are not
          quotes, offers, pre-qualifications, appraisals, or commitments. Actual borrowing capacity, rates, fees, and
          terms are determined solely by your lender. Bitcoin reference prices used in illustrations are static
          historical values, not live market quotes.
        </p>

        <h2>Fee trigger</h2>
        <p>
          Unless a Milestone Agreement states otherwise, the success fee is tied to verified equity extraction
          milestones, not to Bitcoin market performance. No portion of our compensation varies with your investment
          results.
        </p>

        <h2>Independent professional advice</h2>
        <p>
          Consult your own attorney, CPA, and licensed financial professional before borrowing against your home or
          acquiring digital assets. Tax treatment of interest depends on use of proceeds and may differ from home
          improvement treatment.
        </p>
      </div>
    </main>
  );
}
