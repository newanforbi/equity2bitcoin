import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { CalendlyEmbed } from '../components/CalendlyEmbed'
import { CALENDLY } from '../config/site'
import './Book.css'

export function Book() {
  const [acknowledged, setAcknowledged] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Free, 20 minutes, no obligation"
        title="Book an orientation call"
        lede="We walk through your equity position, how the milestones work, and what the fee means in your specific case. If we think this is wrong for you, we will say so on the call."
      />

      <section className="section--tight">
        <div className="shell book">
          <aside className="book__side">
            <div className="card">
              <h2 className="book__side-title">What the call covers</h2>
              <ul className="book__list">
                <li>Your equity position and what a lender would realistically advance</li>
                <li>The five milestones and where the single fee falls</li>
                <li>What the monthly obligation would actually be</li>
                <li>
                  The risks, stated plainly — including the ones that end the conversation
                </li>
                <li>Whether you should be talking to a licensed fiduciary adviser instead</li>
              </ul>
            </div>

            <div className="notice">
              <p className="tiny" style={{ marginBottom: 0 }}>
                <strong>Come prepared, if you can.</strong> Knowing your approximate home
                value and current mortgage balance makes the call far more useful. The{' '}
                <Link to="/calculator">calculator</Link> takes two minutes and runs
                entirely in your browser.
              </p>
            </div>
          </aside>

          <div className="book__main">
            {/* Acknowledgment gates the scheduler — §IV.C requires the education-only
                relationship be disclosed and acknowledged before engagement. */}
            <div className="notice notice--warn book__ack">
              <p>
                <strong>Before you book, please acknowledge:</strong>
              </p>
              <ul className="tiny book__ack-list">
                <li>
                  This call is educational. It is not investment advice, not a
                  recommendation, and not an offer of credit.
                </li>
                <li>
                  Equity2Bitcoin Consulting LLC is not a registered investment adviser,
                  mortgage broker, lender, or money transmitter, and will not take custody
                  of your funds or digital assets at any point.
                </li>
                <li>
                  Borrowing against your home puts your property at risk. Bitcoin is
                  highly volatile and has declined more than 80% in past market cycles.
                </li>
                <li>
                  You should consult your own attorney, accountant, and licensed financial
                  professional before acting.
                </li>
              </ul>
              <label className="book__checkbox">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                />
                <span>I have read and understand the above.</span>
              </label>
            </div>

            {acknowledged ? (
              <CalendlyEmbed url={CALENDLY.orientationUrl} />
            ) : (
              <div className="card book__gate">
                <p className="muted" style={{ marginBottom: 0 }}>
                  Tick the acknowledgment above to load the scheduler.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
