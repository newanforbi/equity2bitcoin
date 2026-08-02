import { Link } from 'react-router-dom'
import './CTA.css'

interface Props {
  heading?: string
  body?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

/** Closing call-to-action. Booking is the only conversion action on the site. */
export function CTA({
  heading = 'Start with the free orientation call',
  body = 'Twenty minutes, no cost, no obligation. We walk through your equity position, the fee structure, and — candidly — whether this is a fit for you at all. Plenty of the calls we take end with us saying it is not.',
  primaryLabel = 'Book a call',
  primaryTo = '/book',
  secondaryLabel = 'Run your numbers first',
  secondaryTo = '/calculator',
}: Props) {
  return (
    <section className="section cta-band">
      <div className="shell">
        <div className="card card--accent cta-band__card">
          <h2 className="cta-band__heading">{heading}</h2>
          <p className="lede cta-band__body">{body}</p>
          <div className="btn-row">
            <Link to={primaryTo} className="btn btn--primary">
              {primaryLabel}
            </Link>
            <Link to={secondaryTo} className="btn btn--secondary">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
