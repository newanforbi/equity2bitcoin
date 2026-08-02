import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { CTA } from '../components/CTA'
import { MILESTONES } from '../content/milestones'
import { calculateEquity } from '../lib/equity'
import { formatUsd, formatUsdPrecise, formatPercent } from '../lib/format'
import { CALCULATOR_DEFAULTS, MILESTONE_FEE_RATE } from '../config/site'
import './Pricing.css'

/**
 * The worked example runs through the same calculateEquity() the calculator uses, so
 * the two pages can never disagree about the arithmetic.
 */
const EXAMPLE_INPUTS = {
  homeValue: 700_000,
  mortgageBalance: 300_000,
  maxLtv: CALCULATOR_DEFAULTS.maxLtv,
  aprPercent: CALCULATOR_DEFAULTS.aprPercent,
  amortizationYears: CALCULATOR_DEFAULTS.amortizationYears,
}

export function Pricing() {
  const example = calculateEquity(EXAMPLE_INPUTS)

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="One fee. Stated before you sign anything."
        lede="Four of the five milestones cost nothing. The fee triggers once — after a licensed lender has approved and funded your draw — and is 30% of the amount extracted."
      />

      <section className="section">
        <div className="shell">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '3rem' }}>#</th>
                  <th>Milestone</th>
                  <th>Completion trigger</th>
                  <th style={{ textAlign: 'right' }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES.map((m) => (
                  <tr key={m.number} className={m.fee ? 'pricing__fee-row' : ''}>
                    <td>{m.number}</td>
                    <td>
                      <strong>{m.title}</strong>
                    </td>
                    <td className="muted small">{m.trigger}</td>
                    <td style={{ textAlign: 'right' }}>
                      {m.fee ? (
                        <span className="pill pill--fee">{m.fee}</span>
                      ) : (
                        <span className="pill pill--free">$0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="notice">
            <p className="tiny">
              <strong>Why the fee is not tied to performance.</strong> The fee is
              triggered by a verified service milestone — your lender funding your draw —
              and never by what Bitcoin subsequently does. A fee contingent on investment
              outcomes would make this an advisory relationship requiring licences we do
              not hold. It also means our compensation does not depend on your Bitcoin
              going up, which we consider a feature: we have no incentive to talk you
              into optimism.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell">
          <span className="eyebrow">Worked example</span>
          <h2>What this looks like on real numbers</h2>
          <p className="lede">
            A homeowner with a {formatUsd(EXAMPLE_INPUTS.homeValue)} home and{' '}
            {formatUsd(EXAMPLE_INPUTS.mortgageBalance)} still owed, at a{' '}
            {formatPercent(EXAMPLE_INPUTS.maxLtv)} lender loan-to-value cap.
          </p>

          <div className="pricing__example">
            <div className="card">
              <h3 className="pricing__example-title">The money</h3>
              <dl className="pricing__ledger">
                <div className="pricing__row">
                  <dt>Equity on paper</dt>
                  <dd>{formatUsd(example.rawEquity)}</dd>
                </div>
                <div className="pricing__row">
                  <dt>
                    Actually borrowable
                    <span className="pricing__note">
                      lenders cap total borrowing at{' '}
                      {formatPercent(EXAMPLE_INPUTS.maxLtv)} of value, so this is lower
                      than paper equity
                    </span>
                  </dt>
                  <dd>{formatUsd(example.tappableEquity)}</dd>
                </div>
                <div className="pricing__row pricing__row--debit">
                  <dt>Milestone fee at {formatPercent(MILESTONE_FEE_RATE)}</dt>
                  <dd>−{formatUsd(example.milestoneFee)}</dd>
                </div>
                <div className="pricing__row pricing__row--total">
                  <dt>Reaches Bitcoin</dt>
                  <dd>{formatUsd(example.netToBitcoin)}</dd>
                </div>
              </dl>
            </div>

            <div className="card">
              <h3 className="pricing__example-title">The obligation</h3>
              <dl className="pricing__ledger">
                <div className="pricing__row">
                  <dt>Owed to the lender</dt>
                  <dd>{formatUsd(example.tappableEquity)}</dd>
                </div>
                <div className="pricing__row">
                  <dt>
                    Monthly, interest only
                    <span className="pricing__note">
                      at an illustrative {EXAMPLE_INPUTS.aprPercent}% APR
                    </span>
                  </dt>
                  <dd>{formatUsdPrecise(example.monthlyInterestOnly)}</dd>
                </div>
                <div className="pricing__row">
                  <dt>
                    Monthly, fully amortizing
                    <span className="pricing__note">
                      over {EXAMPLE_INPUTS.amortizationYears} years
                    </span>
                  </dt>
                  <dd>{formatUsdPrecise(example.monthlyAmortizing)}</dd>
                </div>
                <div className="pricing__row pricing__row--total">
                  <dt>Interest over the full term</dt>
                  <dd>{formatUsd(example.totalInterestOverTerm)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="notice notice--warn">
            <p>
              <strong>Read those two panels together.</strong> This homeowner ends up
              owing {formatUsd(example.tappableEquity)} secured against their house while
              holding {formatUsd(example.netToBitcoin)} of Bitcoin, and paying{' '}
              {formatUsdPrecise(example.monthlyInterestOnly)} a month for the privilege.
              They are {formatPercent(MILESTONE_FEE_RATE)} underwater on day one. Bitcoin
              would need to rise substantially just to return them to break-even against
              the loan — and it may not.
            </p>
            <p className="tiny" style={{ marginBottom: 0 }}>
              Illustrative figures only. Not a quote, offer, or projection. Your lender
              sets all actual terms.
            </p>
          </div>

          <div className="btn-row">
            <Link to="/calculator" className="btn btn--primary">
              Run your own numbers
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell prose">
          <span className="eyebrow">The agreement</span>
          <h2>What you sign, and when</h2>
          <p>
            Before Milestone 1 begins you receive a written milestone agreement. Nothing
            starts until it is signed, and signing it does not obligate you to borrow
            anything. It sets out:
          </p>
          <ol>
            <li>Your information and the property under discussion</li>
            <li>
              All five milestones, each with its deliverable and its completion trigger
            </li>
            <li>
              The fee schedule — {formatPercent(MILESTONE_FEE_RATE)} of extracted equity
              at Milestone 3, and $0 at every other phase
            </li>
            <li>
              Disclaimers and compliance statements confirming the education-only,
              non-custodial nature of the relationship
            </li>
            <li>Signatures and acknowledgments</li>
          </ol>
          <p className="muted">
            You can stop at any point before funding and owe nothing. If your lender
            declines your application, there is no fee.
          </p>
          <p className="muted">
            Have your own attorney review the agreement before you sign it. We will send
            it in advance specifically so that you can.
          </p>
        </div>
      </section>

      <CTA
        heading="Questions about the fee?"
        body="Ask them on the orientation call, before you commit to anything. It is free, and the fee structure is one of the things we walk through in detail."
      />
    </>
  )
}
