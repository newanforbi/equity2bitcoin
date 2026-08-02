import { BTC_FUTURE_SCENARIO } from "../config/site";
import { BitcoinHistoryChart } from "./BitcoinHistoryChart";
import { BTC_CYCLE_ANNOTATIONS } from "../data/bitcoinCycles";
import { formatUsd } from "../lib/format";

export function BitcoinHistorySection() {
  return (
    <section className="section btc-history" id="bitcoin-history" aria-labelledby="bitcoin-history-title">
      <div className="container">
        <p className="eyebrow">Market literacy</p>
        <h2 className="section-title" id="bitcoin-history-title">
          Bitcoin’s history, not a promise
        </h2>
        <p className="section-lede">
          Solid line: the actual USD price path — log-scaled so early cycles and later ones are both readable. Dashed
          line: the same illustrative {formatUsd(BTC_FUTURE_SCENARIO.priceUsd)} ({BTC_FUTURE_SCENARIO.asOf}) scenario
          the calculator uses. Peaks, valleys, and that dashed extension are not a promise of where price goes next.
        </p>

        <p className="btc-history-overlay-note" role="note">
          −80%+ drawdowns happened in prior cycles
        </p>

        <BitcoinHistoryChart />

        <div className="btc-history-callouts">
          {BTC_CYCLE_ANNOTATIONS.map((cycle) => (
            <article key={cycle.id} className="btc-history-callout">
              <p className="eyebrow">
                {cycle.peakLabel} → {cycle.troughLabel}
              </p>
              <h3>{cycle.drawdownLabel}</h3>
              <p>{cycle.summary}</p>
            </article>
          ))}
        </div>

        <p className="compliance-strip btc-history-disclaimer">
          <strong>−80%+ drawdowns have happened in prior cycles.</strong> Bitcoin is highly volatile. Drawdowns of 50%
          happen regularly. Declines of 80% or more have occurred in every market cycle to date. Past peaks and valleys
          are not a prediction of future returns. The dashed 2027–2029 path to{" "}
          {formatUsd(BTC_FUTURE_SCENARIO.priceUsd)} is illustrative arithmetic only — the same fixed scenario shown in
          the calculator, not a forecast. If a decline like a prior-cycle drawdown would leave you unable to make a
          mortgage or HELOC payment from ordinary income, borrowing against your home to buy Bitcoin is not appropriate
          for you. This chart does not feed the calculator and is not investment advice.
        </p>
      </div>
    </section>
  );
}
