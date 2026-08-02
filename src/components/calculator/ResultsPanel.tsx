import { Link } from 'react-router-dom'
import type { EquityResult } from '../../lib/equity'
import { formatBtc, formatUsd, formatUsdPrecise, formatPercent } from '../../lib/format'
import { BTC_REFERENCE, CALCULATOR_DEFAULTS } from '../../config/site'

interface Props {
  result: EquityResult
  aprPercent: number
}

export function ResultsPanel({ result, aprPercent }: Props) {
  if (result.hasNoTappableEquity) {
    return (
      <div className="calc__results">
        <div className="card calc__empty">
          <h2>No tappable equity at these numbers</h2>
          <p className="lede">
            At a {formatPercent(result.feeRate === 0 ? 0 : 0.8)} loan-to-value cap, what
            you owe already meets or exceeds what a lender would let you borrow against
            this home.
          </p>
          <p className="muted">
            You have {formatUsd(result.rawEquity)} of equity on paper, but lenders
            require you to keep a cushion — which is why the borrowable figure is lower
            than the difference between value and balance. If your home has appreciated
            or your balance has come down since you last checked, adjust the inputs.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="calc__results">
      {/* The headline number is what a lender might advance — not what reaches Bitcoin. */}
      <div className="card card--accent calc__headline">
        <span className="eyebrow">Potentially borrowable</span>
        <p className="calc__big">{formatUsd(result.tappableEquity)}</p>
        <p className="tiny muted calc__headline-note">
          Equity on paper is {formatUsd(result.rawEquity)}. Lenders cap total borrowing
          at a share of your home’s value, so the borrowable figure is lower.
        </p>
      </div>

      {/* The subtraction. This is the part most presentations of this strategy omit. */}
      <div className="card calc__flow">
        <h3 className="calc__flow-title">Where that money actually goes</h3>
        <dl className="calc__ledger">
          <div className="calc__row">
            <dt>Amount drawn from your lender</dt>
            <dd>{formatUsd(result.tappableEquity)}</dd>
          </div>
          <div className="calc__row calc__row--debit">
            <dt>
              Equity2Bitcoin milestone fee
              <span className="calc__row-note">
                {formatPercent(result.feeRate)}, charged once at funding
              </span>
            </dt>
            <dd>−{formatUsd(result.milestoneFee)}</dd>
          </div>
          <div className="calc__row calc__row--total">
            <dt>Reaches Bitcoin</dt>
            <dd>{formatUsd(result.netToBitcoin)}</dd>
          </div>
          <div className="calc__row calc__row--sub">
            <dt>
              Roughly
              <span className="calc__row-note">
                at {formatUsd(BTC_REFERENCE.priceUsd)} per BTC, {BTC_REFERENCE.asOf} —
                illustrative reference price, not a live quote or a forecast
              </span>
            </dt>
            <dd>{formatBtc(result.illustrativeBtc)}</dd>
          </div>
        </dl>
      </div>

      {/* Cost of carry. A calculator that shows only the upside is a sales tool. */}
      <div className="card calc__carry">
        <h3 className="calc__flow-title">What it costs to carry</h3>
        <div className="grid grid--2">
          <div className="calc__stat">
            <span className="calc__stat-label">Interest-only, monthly</span>
            <span className="calc__stat-value">
              {formatUsdPrecise(result.monthlyInterestOnly)}
            </span>
            <span className="tiny muted">
              Typical of a HELOC draw period. Pays nothing toward principal.
            </span>
          </div>
          <div className="calc__stat">
            <span className="calc__stat-label">
              Fully amortizing over {CALCULATOR_DEFAULTS.amortizationYears} years
            </span>
            <span className="calc__stat-value">
              {formatUsdPrecise(result.monthlyAmortizing)}
            </span>
            <span className="tiny muted">
              {formatUsd(result.totalInterestOverTerm)} of interest over the full term.
            </span>
          </div>
        </div>
      </div>

      {/* Plain-language restatement. */}
      <div className="notice notice--warn calc__meaning">
        <h3 className="calc__meaning-title">What this means</h3>
        <p>
          You would owe your lender <strong>{formatUsd(result.tappableEquity)}</strong>,
          secured against your home, and hold roughly{' '}
          <strong>{formatUsd(result.netToBitcoin)}</strong> of Bitcoin — because{' '}
          {formatUsd(result.milestoneFee)} went to the milestone fee. You start{' '}
          {formatPercent(result.feeRate)} behind on day one, before Bitcoin moves at all.
        </p>
        <p>
          At {aprPercent.toFixed(2)}% that is{' '}
          <strong>{formatUsdPrecise(result.monthlyInterestOnly)} a month</strong> just in
          interest, due every month regardless of what Bitcoin does. Bitcoin has fallen
          more than 50% many times and more than 80% in every cycle so far. If a decline
          like that would leave you unable to make this payment out of ordinary income,
          this strategy is not appropriate for you.
        </p>
      </div>

      <div className="btn-row calc__cta">
        <Link to="/book" className="btn btn--primary">
          Talk through these numbers
        </Link>
        <Link to="/is-this-for-you" className="btn btn--secondary">
          Is this actually for me?
        </Link>
      </div>

      <p className="tiny muted calc__legal">
        <strong>Estimate only.</strong> These figures are illustrations generated from
        the values you entered. They are not a loan offer, a commitment to lend, a
        pre-qualification, a quote, or investment advice. Actual borrowing limits, rates,
        fees, and terms are set solely by your lender following underwriting, and will
        differ. The Bitcoin reference price is a fixed historical figure for illustration
        and is not a live market price or a prediction of future value.
      </p>
    </div>
  )
}
