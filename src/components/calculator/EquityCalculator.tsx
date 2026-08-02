import { useMemo, useState } from 'react'
import { calculateEquity } from '../../lib/equity'
import { formatUsd, parseCurrencyInput } from '../../lib/format'
import { CALCULATOR_DEFAULTS } from '../../config/site'
import { ResultsPanel } from './ResultsPanel'
import './EquityCalculator.css'

export function EquityCalculator() {
  const [homeValue, setHomeValue] = useState<number>(CALCULATOR_DEFAULTS.homeValue)
  const [mortgageBalance, setMortgageBalance] = useState<number>(
    CALCULATOR_DEFAULTS.mortgageBalance,
  )
  const [maxLtv, setMaxLtv] = useState<number>(CALCULATOR_DEFAULTS.maxLtv)
  const [aprPercent, setAprPercent] = useState<number>(CALCULATOR_DEFAULTS.aprPercent)

  const result = useMemo(
    () =>
      calculateEquity({
        homeValue,
        mortgageBalance,
        maxLtv,
        aprPercent,
        amortizationYears: CALCULATOR_DEFAULTS.amortizationYears,
      }),
    [homeValue, mortgageBalance, maxLtv, aprPercent],
  )

  return (
    <div className="calc">
      <form className="calc__inputs card" onSubmit={(e) => e.preventDefault()}>
        <h2 className="calc__inputs-title">Your numbers</h2>

        <label className="calc__field">
          <span className="calc__label">What is your home worth today?</span>
          <span className="calc__hint">
            Your best estimate of current market value.
          </span>
          <input
            type="text"
            inputMode="numeric"
            className="calc__input"
            value={formatUsd(homeValue)}
            onChange={(e) => setHomeValue(parseCurrencyInput(e.target.value))}
            aria-describedby="home-value-hint"
          />
        </label>

        <label className="calc__field">
          <span className="calc__label">What do you still owe on it?</span>
          <span className="calc__hint">
            Combined balance of all mortgages and existing equity lines.
          </span>
          <input
            type="text"
            inputMode="numeric"
            className="calc__input"
            value={formatUsd(mortgageBalance)}
            onChange={(e) => setMortgageBalance(parseCurrencyInput(e.target.value))}
          />
        </label>

        <label className="calc__field">
          <span className="calc__label">
            Lender loan-to-value cap
            <span className="calc__value-badge">{Math.round(maxLtv * 100)}%</span>
          </span>
          <span className="calc__hint">
            Most lenders cap total borrowing near 80% of the home’s value. Yours will set
            the real number.
          </span>
          <input
            type="range"
            className="calc__range"
            min={CALCULATOR_DEFAULTS.ltvMin * 100}
            max={CALCULATOR_DEFAULTS.ltvMax * 100}
            step={1}
            value={maxLtv * 100}
            onChange={(e) => setMaxLtv(Number(e.target.value) / 100)}
          />
        </label>

        <label className="calc__field">
          <span className="calc__label">
            Estimated rate on the new line
            <span className="calc__value-badge">{aprPercent.toFixed(2)}%</span>
          </span>
          <span className="calc__hint">
            Illustrative only. Confirm the actual APR with your own lender.
          </span>
          <input
            type="range"
            className="calc__range"
            min={4}
            max={15}
            step={0.25}
            value={aprPercent}
            onChange={(e) => setAprPercent(Number(e.target.value))}
          />
        </label>

        <p className="tiny muted calc__reset-note" id="home-value-hint">
          Nothing you type here is sent anywhere. This calculator runs entirely in your
          browser.
        </p>
      </form>

      <ResultsPanel result={result} aprPercent={aprPercent} />
    </div>
  )
}
