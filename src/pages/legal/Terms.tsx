import { PageHeader } from '../../components/PageHeader'
import { SITE } from '../../config/site'
import './legal.css'

export function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of service" />

      <section className="section">
        <div className="shell legal prose">
          <div className="notice">
            <p style={{ marginBottom: 0 }}>
              <strong>Draft pending legal review.</strong> These terms are a working
              draft prepared alongside the site build and have not been reviewed by
              counsel. They must be reviewed and finalized by a qualified attorney before
              this site accepts any live traffic. See <code>LEGAL-REVIEW.md</code> in the
              project repository.
            </p>
          </div>

          <h2>1. Acceptance</h2>
          <p>
            By accessing {SITE.domain} you agree to these terms. If you do not agree, do
            not use the site.
          </p>

          <h2>2. Nature of services</h2>
          <p>
            {SITE.legalEntity} provides educational consulting, documentation support, and
            milestone verification services. We do not provide investment advice, tax
            advice, legal advice, lending services, brokerage services, custody services,
            or money transmission. See our <a href="/legal/disclaimer">Disclaimer</a>,
            which is incorporated into these terms by reference.
          </p>

          <h2>3. No client relationship from site use</h2>
          <p>
            Using this site, submitting a booking request, or attending an orientation
            call does not create a consulting engagement. An engagement begins only upon
            execution of a written milestone agreement by both parties.
          </p>

          <h2>4. Fees</h2>
          <p>
            Fee terms are governed exclusively by the executed milestone agreement, not by
            this site. Fees shown on this site are descriptive and subject to the terms of
            that agreement. Our milestone success fee is earned upon verified completion
            of the specified service milestone and is not contingent upon the performance
            of any asset.
          </p>

          <h2>5. Your responsibilities</h2>
          <p>
            You are solely responsible for your financial decisions, including whether to
            apply for credit, which lender to use, whether to accept any loan terms
            offered, whether to acquire any digital asset, in what amount, and how to
            secure it. You are responsible for the safekeeping of your own private keys.
            Loss of private keys results in permanent, irreversible loss of the associated
            digital assets, and no party can recover them.
          </p>

          <h2>6. Third parties</h2>
          <p>
            Any lender, exchange, custody platform, or other third party you engage is
            independent of us. We do not control, endorse, guarantee, or accept
            responsibility for their services, terms, security, or conduct. Your
            relationship with them is governed by their own agreements.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            Site content, educational materials, workbooks, reports, and the milestone
            framework are the property of {SITE.legalEntity} and are licensed to you for
            your own personal use in connection with an engagement. They may not be
            redistributed, resold, or used to provide services to others.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE.legalEntity} is not liable for
            indirect, incidental, consequential, special, or punitive damages, or for lost
            profits, lost investment value, or losses arising from movements in the price
            of any asset. Our aggregate liability arising out of or relating to an
            engagement shall not exceed the fees you actually paid to us.
          </p>
          <p className="muted small">
            Certain jurisdictions do not permit exclusion of some warranties or
            limitation of certain damages; those exclusions may not apply to you.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of the State of California, without
            regard to conflict-of-laws principles. Dispute resolution provisions
            applicable to an engagement are set out in the milestone agreement.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update these terms. Material changes will be reflected in the effective
            date below. Continued use of the site after changes constitutes acceptance.
          </p>

          <h2>11. Contact</h2>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>

          <p className="muted small">Effective date: pending legal review.</p>
        </div>
      </section>
    </>
  )
}
