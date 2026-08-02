import { Link } from "react-router-dom";
import { BookingPanel } from "../components/BookingPanel";
import { loadLeadDraft } from "../lib/leads";

export function BookPage() {
  const draft = loadLeadDraft();

  return (
    <main className="section booking" style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <div className="container booking-grid">
        <div>
          <p className="eyebrow">Free orientation</p>
          <h1 className="section-title">Let’s map your equity-to-Bitcoin path.</h1>
          <p className="section-lede">
            Thirty focused minutes on feasibility, compliance boundaries, and whether a milestone agreement makes sense.
            If we think this is wrong for you, we will say so on the call.
          </p>
          {draft.quizBand && (
            <div className="score-pill" style={{ marginTop: "1.25rem" }}>
              Equity IQ synced · {draft.quizBand}
              {draft.quizScore != null ? ` (${draft.quizScore})` : ""}
            </div>
          )}
          <ul style={{ margin: "1.25rem 0 0", paddingLeft: "1.2rem", color: "var(--cream-muted)" }}>
            <li style={{ marginBottom: "0.5rem" }}>Your equity position and what a lender might realistically advance</li>
            <li style={{ marginBottom: "0.5rem" }}>The five milestones and where the single fee falls</li>
            <li style={{ marginBottom: "0.5rem" }}>What the monthly obligation would actually be</li>
            <li style={{ marginBottom: "0.5rem" }}>Risks stated plainly — including the ones that end the conversation</li>
            <li style={{ marginBottom: "0.5rem" }}>Whether you should be talking to a licensed fiduciary instead</li>
          </ul>
          <p className="compliance-strip">
            Come prepared if you can: approximate home value and mortgage balance. The{" "}
            <Link to="/calculator">calculator</Link> takes two minutes and stays in your browser.
          </p>
        </div>
        <BookingPanel />
      </div>
    </main>
  );
}
