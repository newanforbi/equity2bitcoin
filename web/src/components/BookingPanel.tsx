import { useEffect, useMemo, useState, type FormEvent } from "react";
import { calendlyUrlWithPrefill, getCalendlyUrl, loadLeadDraft, submitLead } from "../lib/leads";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?: boolean }) => void;
    };
  }
}

function AcknowledgmentGate({
  acknowledged,
  onChange,
}: {
  acknowledged: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="compliance-strip" style={{ marginBottom: "1.25rem" }}>
      <p>
        <strong>Before you book, please acknowledge:</strong>
      </p>
      <ul style={{ margin: "0.75rem 0", paddingLeft: "1.2rem" }}>
        <li>This call is educational — not investment advice, not a recommendation, and not an offer of credit.</li>
        <li>
          Equity2Bitcoin Consulting LLC is not a registered investment adviser, mortgage broker, lender, or money
          transmitter, and will not take custody of your funds or digital assets.
        </li>
        <li>
          Borrowing against your home puts your property at risk. Bitcoin is highly volatile and has declined more than
          80% in past market cycles.
        </li>
        <li>You should consult your own attorney, accountant, and licensed financial professional before acting.</li>
      </ul>
      <label className="form-note" style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onChange(e.target.checked)}
          style={{ marginTop: "0.25rem" }}
        />
        <span>I have read and understand the above.</span>
      </label>
    </div>
  );
}

export function BookingPanel() {
  const draft = useMemo(() => loadLeadDraft(), []);
  const calendlyBase = getCalendlyUrl();
  const calendlyUrl = useMemo(() => calendlyUrlWithPrefill(calendlyBase, draft), [calendlyBase, draft]);

  const [acknowledged, setAcknowledged] = useState(false);
  const [name, setName] = useState(draft.name ?? "");
  const [email, setEmail] = useState(draft.email ?? "");
  const [phone, setPhone] = useState(draft.phone ?? "");
  const [notes, setNotes] = useState(draft.notes ?? "");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    if (!calendlyUrl || !acknowledged) return;

    const parent = document.getElementById("calendly-inline");
    if (!parent) return;

    const existing = document.querySelector('script[data-calendly="true"]') as HTMLScriptElement | null;

    const mount = () => {
      parent.innerHTML = "";
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: parent,
          resize: true,
        });
      }
    };

    if (existing && window.Calendly) {
      mount();
      return;
    }

    const script = existing ?? document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.dataset.calendly = "true";
    script.onload = mount;
    if (!existing) document.body.appendChild(script);

    return () => {
      parent.innerHTML = "";
    };
  }, [calendlyUrl, acknowledged]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const result = await submitLead({
        source: "orientation-form",
        name,
        email,
        phone,
        notes,
        quizAnswers: draft.quizAnswers,
        quizBand: draft.quizBand,
        quizScore: draft.quizScore,
        createdAt: new Date().toISOString(),
      });
      setStatus(result.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="booking-panel">
      <AcknowledgmentGate acknowledged={acknowledged} onChange={setAcknowledged} />

      {!acknowledged ? (
        <p className="form-note">Tick the acknowledgment above to load the scheduler.</p>
      ) : calendlyUrl ? (
        <div id="calendly-inline" className="calendly-embed" />
      ) : status === "done" ? (
        <div className="form-success">
          <h3>Request received</h3>
          <p>
            Thank you{name ? `, ${name.split(" ")[0]}` : ""}. We will follow up shortly to schedule your free
            orientation. If you already use Calendly, set <code>VITE_CALENDLY_URL</code> to embed booking directly.
          </p>
        </div>
      ) : (
        <div className="booking-fallback">
          <form onSubmit={onSubmit}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "0.35rem" }}>
              Request your orientation
            </h3>
            <p className="form-note">
              Calendly is not configured yet on this deploy, so this secure request form captures your details. Connect
              your Calendly link via <code>VITE_CALENDLY_URL</code> for instant self-serve booking.
            </p>
            {draft.quizBand && (
              <div className="score-pill">
                Equity IQ on file · {draft.quizBand}
                {draft.quizScore != null ? ` (${draft.quizScore})` : ""}
              </div>
            )}
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="notes">What are you hoping to understand?</label>
              <textarea id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <p className="form-note">
              By submitting, you acknowledge this is an educational consultation request — not loan processing or
              investment advice.
            </p>
            <button className="btn btn-primary btn-block" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Request free orientation"}
            </button>
            {status === "error" && (
              <p className="form-note" style={{ color: "var(--danger)" }}>
                Something went wrong sending your request. Please try again or email directly.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
