import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        lede="That address doesn’t exist on this site."
      />
      <section className="section">
        <div className="shell">
          <div className="btn-row" style={{ marginTop: 0 }}>
            <Link to="/" className="btn btn--primary">
              Back to the homepage
            </Link>
            <Link to="/calculator" className="btn btn--secondary">
              Equity calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
