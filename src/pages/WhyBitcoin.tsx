import { PageHeader } from '../components/PageHeader'
import { CTA } from '../components/CTA'
import { VOLATILITY_STATEMENT } from '../content/messaging'

/**
 * Historical record only.
 *
 * The business plan contains forward-looking price projections (p.2). Those are
 * investor-facing material and are deliberately not published here — forecasting an
 * asset price to a retail audience considering borrowing against their home is the
 * single highest-risk thing this site could do. Cycle data below is descriptive of
 * what happened, framed as such, and paired with the drawdown record.
 */

const CYCLES = [
  {
    halving: 'November 2012',
    reward: '50 → 25 BTC',
    peak: 'Late 2013',
    move: 'Roughly $12 to roughly $1,100',
    drawdown: 'Followed by an ~85% decline into 2015',
  },
  {
    halving: 'July 2016',
    reward: '25 → 12.5 BTC',
    peak: 'December 2017',
    move: 'Roughly $650 to nearly $20,000',
    drawdown: 'Followed by an ~84% decline into 2018',
  },
  {
    halving: 'May 2020',
    reward: '12.5 → 6.25 BTC',
    peak: 'November 2021',
    move: 'Roughly $8,500 to above $67,000',
    drawdown: 'Followed by a ~77% decline into 2022',
  },
  {
    halving: 'April 2024',
    reward: '6.25 → 3.125 BTC',
    peak: 'Ongoing',
    move: 'Outcome not yet known',
    drawdown: 'Unknown — the cycle has not completed',
  },
]

export function WhyBitcoin() {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Why some homeowners look at Bitcoin"
        lede="This page describes what has happened. It does not predict what will happen, and you should be sceptical of anyone who claims to."
      />

      <section className="section">
        <div className="shell prose">
          <h2>Fixed supply</h2>
          <p>
            Bitcoin’s issuance schedule is fixed in software: 21 million units, ever. New
            supply enters through mining, and roughly every four years — every 210,000
            blocks — the rate at which new coins are issued is cut in half. This is the
            “halving.” Current annual supply growth sits below 1%, trending toward zero
            over the coming century.
          </p>
          <p>
            The argument homeowners find interesting is a symmetry one: real estate is
            scarce because land is finite and building is slow. Bitcoin is scarce because
            the protocol says so and the network enforces it. Both are hard assets in the
            sense that neither can be created on demand by decree.
          </p>
          <p className="muted">
            That is an argument, not a guarantee. Scarcity establishes that supply cannot
            expand. It says nothing about whether demand will exist at any particular
            price.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell">
          <h2>The four-year cycle, as it actually played out</h2>
          <p className="lede">
            Every completed cycle so far has had the same shape: a halving, a run to a new
            high roughly 12 to 18 months later, then a severe decline. Both halves of that
            pattern are shown below, because both are the record.
          </p>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Halving</th>
                  <th>Block reward</th>
                  <th>Subsequent peak</th>
                  <th>Approximate move</th>
                  <th>What came next</th>
                </tr>
              </thead>
              <tbody>
                {CYCLES.map((c) => (
                  <tr key={c.halving}>
                    <td>{c.halving}</td>
                    <td>{c.reward}</td>
                    <td>{c.peak}</td>
                    <td>{c.move}</td>
                    <td>{c.drawdown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="tiny muted">
            Figures are approximate and rounded, drawn from public price history for
            illustration. Three completed cycles is a small sample. A pattern that has
            repeated three times is not a law of nature, and there is no mechanism that
            requires it to repeat again.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="notice notice--warn prose">
            <h2 style={{ fontSize: '1.25rem' }}>The part that matters most to you</h2>
            <p>{VOLATILITY_STATEMENT}</p>
            <p>
              Notice what the table above shows: in every completed cycle, someone who
              bought near the peak waited years and endured a decline of roughly 80%
              before recovering. If that person was also making monthly payments on a
              loan secured by their home, those years were considerably harder.
            </p>
            <p>
              This is why we ask you to be able to service the loan from ordinary income,
              independent of what Bitcoin does. It is the difference between an
              uncomfortable few years and losing your house.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell prose">
          <h2>What we do not claim</h2>
          <ul>
            <li>
              We publish no price targets, forecasts, or expected returns. Not on this
              site, not on a call, not in your readiness report.
            </li>
            <li>
              We do not claim the four-year cycle will continue. It may not. Halvings have
              a diminishing effect on supply growth with each iteration.
            </li>
            <li>
              We do not claim Bitcoin is a hedge against any particular economic
              condition. Its correlation to other assets has shifted over time.
            </li>
            <li>
              We do not claim this strategy is suitable for you. That determination
              depends on your full financial picture, which is exactly what a licensed
              fiduciary adviser is for.
            </li>
          </ul>
        </div>
      </section>

      <CTA
        heading="Still curious, and clear-eyed about the risk?"
        body="The orientation call is the right next step. Bring your questions and your scepticism — both are useful."
      />
    </>
  )
}
