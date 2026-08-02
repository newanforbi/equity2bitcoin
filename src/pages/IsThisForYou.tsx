import { PageHeader } from '../components/PageHeader'
import { CTA } from '../components/CTA'
import { GOOD_FIT, POOR_FIT } from '../content/messaging'
import './IsThisForYou.css'

export function IsThisForYou() {
  return (
    <>
      <PageHeader
        eyebrow="Qualification"
        title="Is this for you? Often the answer is no."
        lede="We would rather lose a client at this page than have one discover halfway through that this was never a fit. Read both columns honestly. The second one matters more."
      />

      <section className="section">
        <div className="shell fit">
          <div className="card fit__col fit__col--good">
            <h2 className="fit__title">This may be worth exploring if…</h2>
            <ul className="fit__list">
              {GOOD_FIT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card fit__col fit__col--poor">
            <h2 className="fit__title">This is not for you if…</h2>
            <ul className="fit__list">
              {POOR_FIT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell prose">
          <span className="eyebrow">The test that matters</span>
          <h2>One question decides most of this</h2>
          <p>
            Could you make the loan payment every month for the next five years if your
            Bitcoin position fell 80% and stayed there?
          </p>
          <p>
            If the answer is yes — from income, without selling anything, without
            strain — then you are in the population this could conceivably suit, and the
            remaining questions are about sizing and structure.
          </p>
          <p>
            If the answer is no, or “probably,” or “it depends on Bitcoin,” then the
            answer is no. Borrowing against your home creates a fixed obligation. Bitcoin
            provides no income to service it. That mismatch is the whole risk, and no
            amount of conviction about Bitcoin’s future resolves it.
          </p>
          <p className="muted">
            We will ask you this on the call. We are not looking for the right answer —
            we are looking for the true one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell prose">
          <h2>Things worth discussing with your own advisers first</h2>
          <ul>
            <li>
              <strong>Tax treatment of the interest.</strong> Mortgage interest
              deductibility depends on how the borrowed funds are used, and using proceeds
              to purchase investments is treated differently from home improvement. Ask a
              CPA about your specific situation before assuming a deduction.
            </li>
            <li>
              <strong>Your existing first mortgage.</strong> If you hold a low fixed rate,
              a cash-out refinance would replace it at current rates. A HELOC as a second
              lien preserves it. The difference can be substantial over time.
            </li>
            <li>
              <strong>Rate structure.</strong> Most HELOCs carry variable rates. Your
              payment can rise. Model what happens if rates move against you.
            </li>
            <li>
              <strong>Draw period mechanics.</strong> HELOCs commonly allow interest-only
              payments for an initial period, after which the payment steps up sharply as
              principal amortization begins. Know your date.
            </li>
            <li>
              <strong>What else the money could do.</strong> Paying down higher-interest
              debt, funding a retirement account, or simply leaving the equity alone are
              all real alternatives with real merit.
            </li>
          </ul>
        </div>
      </section>

      <CTA
        heading="If you are still a yes, let’s talk"
        body="Twenty minutes, free. If we conclude on the call that this is not right for you, we will say so directly and there will be no follow-up sequence."
      />
    </>
  )
}
