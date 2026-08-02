import { Link } from 'react-router-dom'
import { Disclaimer } from '../Disclaimer'
import { SITE } from '../../config/site'
import './SiteFooter.css'

const COLUMNS = [
  {
    heading: 'Start here',
    links: [
      { to: '/calculator', label: 'Equity calculator' },
      { to: '/how-it-works', label: 'How it works' },
      { to: '/is-this-for-you', label: 'Is this for you?' },
      { to: '/book', label: 'Book a call' },
    ],
  },
  {
    heading: 'Understand it',
    links: [
      { to: '/why-bitcoin', label: 'Why Bitcoin' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { to: '/legal/disclaimer', label: 'Disclaimer' },
      { to: '/legal/terms', label: 'Terms of service' },
      { to: '/legal/privacy', label: 'Privacy policy' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__wordmark">
              Equity<span className="site-header__two">2</span>Bitcoin
            </p>
            <p className="tiny muted">
              Education-first consulting for homeowners considering repositioning dormant
              home equity. {SITE.jurisdiction}.
            </p>
            <p className="tiny muted">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} className="site-footer__col" aria-label={col.heading}>
              <h4 className="site-footer__heading">{col.heading}</h4>
              <ul className="site-footer__list">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__legal">
          <Disclaimer />
          <p className="tiny muted site-footer__copyright">
            © {new Date().getFullYear()} {SITE.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
