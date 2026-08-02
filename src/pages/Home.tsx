import { Link } from 'react-router-dom'
import { CTA } from '../components/CTA'
import { MESSAGING_THEMES, TRUST_POINTS, VOLATILITY_STATEMENT, BRAND } from '../content/messaging'
import { MILESTONES } from '../content/milestones'
import './Home.css'

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <span className="eyebrow">{BRAND.essence}</span>
          <h1 className="hero__title">Equity isn’t wealth until it moves.</h1>
          <p className="lede hero__lede">
            American homeowners hold trillions of dollars in equity that sits still. Some
            of them want to reposition part of it into Bitcoin — and find that no bank,
            broker, or adviser will walk them through how. We will. We will also tell you
            plainly what it costs and what it risks.
          </p>

          <div className="btn-row">
            <Link to="/calculator" className="btn btn--primary">
              See your numbers
            </Link>
            <Link to="/how-it-works" className="btn btn--secondary">
              How it works
            </Link>
          </div>

          <p className="tiny muted hero__principle">{BRAND.principle}</p>
        </div>
      </section>

      <section className="trust-bar">
        <div className="shell">
          <ul className="trust-bar__list">
            {TRUST_POINTS.map((point) => (
              <li key={point.label} className="trust-bar__item">
                <span className="trust-bar__label">{point.label}</span>
                <span className="tiny muted">{point.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Volatility stated up front, not buried. */}
      <section className="section--tight">
        <div className="shell">
          <div className="notice notice--warn home__volatility">
            <p className="tiny">
              <strong>Read this before anything else.</strong> {VOLATILITY_STATEMENT}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">The problem</span>
          <h2>The largest asset most people own is the one they never think about.</h2>
          <div className="grid grid--2 home__themes">
            {MESSAGING_THEMES.map((theme) => (
              <article key={theme.headline} className="card home__theme">
                <h3 className="home__theme-title">{theme.headline}</h3>
                <p className="muted home__theme-body">{theme.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell">
          <span className="eyebrow">The path</span>
          <h2>Five milestones. One of them costs money.</h2>
          <p className="lede">
            The engagement is structured so you can stop at any point before funding
            without owing anything. The fee triggers once, at Milestone 3, after a
            licensed lender has approved and funded your draw.
          </p>

          <ol className="home__milestones">
            {MILESTONES.map((m) => (
              <li
                key={m.number}
                className={`home__milestone ${m.fee ? 'is-fee' : ''}`}
              >
                <span className="home__milestone-num">{m.number}</span>
                <span className="home__milestone-title">{m.title}</span>
                <span className={`pill ${m.fee ? 'pill--fee' : 'pill--free'}`}>
                  {m.fee ?? 'No fee'}
                </span>
              </li>
            ))}
          </ol>

          <div className="btn-row">
            <Link to="/how-it-works" className="btn btn--secondary">
              See what each milestone involves
            </Link>
            <Link to="/pricing" className="btn btn--secondary">
              Pricing in detail
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell home__honest">
          <div>
            <span className="eyebrow">Plain talk</span>
            <h2>What we will not do</h2>
            <ul className="home__wont">
              <li>
                We will not tell you Bitcoin is going up. Nobody honestly can, and anyone
                who does is selling you something.
              </li>
              <li>
                We will not touch your money, your loan proceeds, or your Bitcoin. Not
                once, not briefly, not “just to help.”
              </li>
              <li>
                We will not recommend that you do this. We teach the mechanics and the
                risks; the decision is yours and stays yours.
              </li>
              <li>
                We will not hide the fee until you are emotionally committed. It is 30%
                of what you draw, it is on the pricing page, and it is in the calculator.
              </li>
            </ul>
          </div>

          <aside className="card home__aside">
            <h3 className="home__aside-title">The uncomfortable arithmetic</h3>
            <p className="muted">
              If you draw $200,000, our fee is $60,000. That leaves $140,000 to put into
              Bitcoin — but you owe payments on the full $200,000, because that is what
              your lender advanced you.
            </p>
            <p className="muted">
              You start 30% behind before Bitcoin moves at all. That is the honest shape
              of this arrangement, and you should weigh it carefully.
            </p>
            <Link to="/calculator" className="btn btn--secondary home__aside-cta">
              Run it on your own numbers
            </Link>
          </aside>
        </div>
      </section>

      <CTA />
    </>
  )
}
