import { Link } from "react-router-dom";
import { GOOD_FIT, POOR_FIT } from "../data/content";

export function FitPage() {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <div className="container">
        <p className="eyebrow">Qualification</p>
        <h1 className="section-title">Is this for you? Often the answer is no.</h1>
        <p className="section-lede">
          We would rather lose a client here than have one discover halfway through that this was never a fit. Read
          both columns honestly. The second one matters more.
        </p>

        <div className="problem-grid" style={{ marginTop: "2.5rem" }}>
          <div className="booking-panel">
            <h2 className="section-title" style={{ fontSize: "1.75rem" }}>
              This may be worth exploring if…
            </h2>
            <ul style={{ margin: "1.25rem 0 0", paddingLeft: "1.2rem", color: "var(--cream-muted)" }}>
              {GOOD_FIT.map((item) => (
                <li key={item} style={{ marginBottom: "0.75rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="booking-panel">
            <h2 className="section-title" style={{ fontSize: "1.75rem" }}>
              This is not for you if…
            </h2>
            <ul style={{ margin: "1.25rem 0 0", paddingLeft: "1.2rem", color: "var(--cream-muted)" }}>
              {POOR_FIT.map((item) => (
                <li key={item} style={{ marginBottom: "0.75rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <p className="eyebrow">The test that matters</p>
          <h2 className="section-title">One question decides most of this</h2>
          <p className="section-lede">
            Could you make the loan payment every month for the next five years if your Bitcoin position fell 80% and
            stayed there?
          </p>
          <p className="compliance-strip">
            If the answer is yes — from income, without selling anything, without strain — you may be in the population
            this could suit. If the answer is no, “probably,” or “it depends on Bitcoin,” then the answer is no.
            Borrowing against your home creates a fixed obligation. Bitcoin provides no income to service it.
          </p>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <h2 className="section-title">Discuss with your own advisers first</h2>
          <ul style={{ margin: "1.25rem 0 0", paddingLeft: "1.2rem", color: "var(--cream-muted)", maxWidth: "42rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Tax treatment of the interest.</strong> Deductibility depends on how borrowed funds are used;
              investment use differs from home improvement. Ask a CPA.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Your existing first mortgage.</strong> A cash-out refinance replaces a low fixed rate; a HELOC as
              a second lien preserves it.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Rate structure.</strong> Most HELOCs are variable. Model what happens if rates move against you.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Draw period mechanics.</strong> Interest-only periods often step up sharply when amortization
              begins. Know your date.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Alternatives.</strong> Paying down higher-interest debt, funding retirement, or leaving equity
              alone are all real options with real merit.
            </li>
          </ul>
        </div>

        <div className="hero-actions" style={{ marginTop: "2.5rem" }}>
          <Link className="btn btn-primary" to="/book">
            Still a yes — book orientation
          </Link>
          <Link className="btn btn-ghost" to="/calculator">
            Run the calculator
          </Link>
        </div>
      </div>
    </main>
  );
}
