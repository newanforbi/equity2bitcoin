import { PageHeader } from '../components/PageHeader'
import { MilestoneStepper } from '../components/MilestoneStepper'
import { CTA } from '../components/CTA'

export function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="The engagement"
        title="Five milestones, start to finish"
        lede="Each phase has a defined deliverable and a defined completion trigger. You always know where you are, what you have received, and what it has cost. Four of the five cost nothing."
      />

      <section className="section">
        <div className="shell">
          <div className="notice prose">
            <p>
              <strong>What stays with you throughout:</strong> you choose the lender, you
              submit the application, you accept or decline the terms, you open the
              exchange account, you make the purchase, and you hold the keys. We are
              never a party to any of those transactions and never take possession of
              anything.
            </p>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <MilestoneStepper />
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell prose">
          <span className="eyebrow">Timing</span>
          <h2>How long does this take?</h2>
          <p>
            Milestones 1 and 2 typically run two to four weeks depending on how quickly
            you can assemble documentation. Milestone 3 is entirely on your lender’s
            clock — HELOC underwriting commonly takes three to six weeks, and neither you
            nor we control that timeline. Milestones 4 and 5 add another two to three
            weeks.
          </p>
          <p className="muted">
            Anyone promising you a firm date for a loan they are not underwriting is
            guessing. We will give you our best estimate and update it as things move.
          </p>
        </div>
      </section>

      <CTA />
    </>
  )
}
