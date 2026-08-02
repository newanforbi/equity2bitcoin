import { EquityCalculator } from "../components/EquityCalculator";

export function CalculatorPage() {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <div className="container">
        <p className="eyebrow">Calculator</p>
        <h1 className="section-title">See what is actually borrowable — and what reaches Bitcoin.</h1>
        <p className="section-lede">
          Paper equity is not tappable equity. This tool applies a lender LTV cap, subtracts the milestone fee, and lets
          you toggle whether multi-year interest-only carry is reserved from the draw. Illustrative only.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          <EquityCalculator />
        </div>
      </div>
    </main>
  );
}
