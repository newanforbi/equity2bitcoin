import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoMark } from '../Logo'
import '../Logo.css'
import './SiteHeader.css'

const NAV = [
  { to: '/calculator', label: 'Calculator' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/why-bitcoin', label: 'Why Bitcoin' },
  { to: '/is-this-for-you', label: 'Is this for you' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Equity2Bitcoin home">
          <LogoMark size={30} />
          <span className="site-header__wordmark">
            Equity<span className="site-header__two">2</span>Bitcoin
          </span>
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav
          id="primary-nav"
          className={`site-header__nav ${open ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `site-header__link ${isActive ? 'is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn--primary site-header__cta">
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  )
}
