import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BTC_FUTURE_SCENARIO, BTC_REFERENCE, CALCULATOR_DEFAULTS } from "../config/site";
import { calculateEquity } from "../lib/equity";
import { formatBtc, formatPercent, formatUsd, formatUsdPrecise, parseCurrencyInput } from "../lib/format";

type EquityCalculatorProps = {
  /** Prefix form control ids when more than one calculator can exist in the DOM. */
  idPrefix?: string;
  /** Stacked, denser layout for the homepage hero. */
  variant?: "page" | "hero";
};

export function EquityCalculator({ idPrefix = "calc", variant = "page" }: EquityCalculatorProps) {
  const [homeValue, setHomeValue] = useState<number>(CALCULATOR_DEFAULTS.homeValue);
  const [mortgageBalance, setMortgageBalance] = useState<number>(CALCULATOR_DEFAULTS.mortgageBalance);
  const [maxLtv, setMaxLtv] = useState<number>(CALCULATOR_DEFAULTS.maxLtv);
  const [aprPercent, setAprPercent] = useState<number>(CALCULATOR_DEFAULTS.aprPercent);
  const isHero = variant === "hero";

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
  );

  return (
    <div className={`equity-calculator${isHero ? " equity-calculator--hero" : ""}`}>
      <div className={isHero ? "equity-calculator-stack" : "booking-grid"}>
        <form className="booking-panel booking-fallback" onSubmit={(e) => e.preventDefault()}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: isHero ? "1.45rem" : "1.8rem", marginBottom: "0.35rem" }}>
            Your numbers
          </h3>
          {!isHero && (
            <p className="form-note">Nothing you type here is sent anywhere. This calculator runs in your browser.</p>
          )}

          <div className="field">
            <label htmlFor={`${idPrefix}-home-value`}>What is your home worth today?</label>
            <input
              id={`${idPrefix}-home-value`}
              type="text"
              inputMode="numeric"
              value={formatUsd(homeValue)}
              onChange={(e) => setHomeValue(parseCurrencyInput(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor={`${idPrefix}-mortgage-balance`}>What do you still owe on it?</label>
            <input
              id={`${idPrefix}-mortgage-balance`}
              type="text"
              inputMode="numeric"
              value={formatUsd(mortgageBalance)}
              onChange={(e) => setMortgageBalance(parseCurrencyInput(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor={`${idPrefix}-max-ltv`}>Lender loan-to-value cap — {formatPercent(maxLtv)}</label>
            <input
              id={`${idPrefix}-max-ltv`}
              type="range"
              min={CALCULATOR_DEFAULTS.ltvMin * 100}
              max={CALCULATOR_DEFAULTS.ltvMax * 100}
              step={1}
              value={maxLtv * 100}
              onChange={(e) => setMaxLtv(Number(e.target.value) / 100)}
            />
            {!isHero && (
              <p className="form-note">Most lenders cap total borrowing near 80% of the home’s value.</p>
            )}
          </div>

          <div className="field">
            <label htmlFor={`${idPrefix}-apr`}>Estimated rate on the new line — {aprPercent.toFixed(2)}%</label>
            <input
              id={`${idPrefix}-apr`}
              type="range"
              min={4}
              max={15}
              step={0.25}
              value={aprPercent}
              onChange={(e) => setAprPercent(Number(e.target.value))}
            />
            {!isHero && (
              <p className="form-note">Illustrative only. Confirm the actual APR with your own lender.</p>
            )}
          </div>
        </form>

        <div className="booking-panel booking-fallback">
          {result.hasNoTappableEquity ? (
            <>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isHero ? "1.45rem" : "1.8rem",
                  marginBottom: "0.35rem",
                }}
              >
                No tappable equity at these numbers
              </h3>
              <p className="form-note">
                At a {formatPercent(maxLtv)} loan-to-value cap, what you owe already meets or exceeds what a lender
                would typically let you borrow. You have {formatUsd(result.rawEquity)} of equity on paper, but lenders
                require a cushion — which is why borrowable is lower than value minus balance.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">Potentially borrowable</p>
              <div className="fee-formula" style={{ marginBottom: "0.75rem" }}>
                {formatUsd(result.tappableEquity)}
              </div>
              <p className="form-note">
                Equity on paper is {formatUsd(result.rawEquity)}. Lenders cap total borrowing at a share of home value,
                so the borrowable figure is lower.
              </p>

              <div className="case-flow" style={{ marginTop: isHero ? "1rem" : "1.5rem" }}>
                <div className="case-row">
                  <span>Amount drawn from your lender</span>
                  <span>{formatUsd(result.tappableEquity)}</span>
                </div>
                <div className="case-row">
                  <span>Milestone fee ({formatPercent(result.feeRate)})</span>
                  <span>−{formatUsd(result.milestoneFee)}</span>
                </div>
                <div className="case-row">
                  <span>Reaches Bitcoin</span>
                  <span>{formatUsd(result.netToBitcoin)}</span>
                </div>
                <div className="case-row">
                  <span>
                    Roughly at {formatUsd(BTC_REFERENCE.priceUsd)}/BTC ({BTC_REFERENCE.asOf})
                  </span>
                  <span>{formatBtc(result.illustrativeBtc)}</span>
                </div>
                <div className="case-row">
                  <span>
                    That BTC at {formatUsd(BTC_FUTURE_SCENARIO.priceUsd)}/BTC ({BTC_FUTURE_SCENARIO.asOf})
                  </span>
                  <span>{formatUsd(result.illustrativeFutureValueUsd)}</span>
                </div>
                <div className="case-row">
                  <span>Interest-only, monthly (2026 – 2029)</span>
                  <span>{formatUsdPrecise(result.monthlyInterestOnly)}</span>
                </div>
                {!isHero && (
                  <div className="case-row">
                    <span>Fully amortizing over {CALCULATOR_DEFAULTS.amortizationYears} years</span>
                    <span>{formatUsdPrecise(result.monthlyAmortizing)}</span>
                  </div>
                )}
              </div>

              {!isHero && (
                <p className="compliance-strip" style={{ marginTop: "1.5rem" }}>
                  You would owe <strong>{formatUsd(result.tappableEquity)}</strong> secured against your home, and hold
                  roughly <strong>{formatUsd(result.netToBitcoin)}</strong> of Bitcoin — because{" "}
                  {formatUsd(result.milestoneFee)} went to the milestone fee. You start {formatPercent(result.feeRate)}{" "}
                  behind on day one. At {aprPercent.toFixed(2)}% that is{" "}
                  <strong>{formatUsdPrecise(result.monthlyInterestOnly)}/month</strong> in interest alone, due
                  regardless of what Bitcoin does.
                </p>
              )}

              <div className="hero-actions" style={{ marginTop: "1.25rem" }}>
                <Link className="btn btn-primary" to="/book">
                  Talk through these numbers
                </Link>
                {!isHero && (
                  <Link className="btn btn-ghost" to="/fit">
                    Is this actually for me?
                  </Link>
                )}
              </div>
            </>
          )}

          <p className="form-note" style={{ marginTop: "1.25rem" }}>
            <strong>Estimate only.</strong> Not a loan offer, pre-qualification, quote, or investment advice.
            {isHero
              ? " Illustrative Bitcoin prices — not forecasts."
              : " Actual limits, rates, and terms are set solely by your lender. Bitcoin price lines are fixed illustrative scenarios — not live quotes, and not predictions that any future price will occur."}
          </p>
        </div>
      </div>
    </div>
  );
}
