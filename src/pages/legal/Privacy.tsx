import { PageHeader } from '../../components/PageHeader'
import { SITE } from '../../config/site'
import './legal.css'

export function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" />

      <section className="section">
        <div className="shell legal prose">
          <div className="notice">
            <p style={{ marginBottom: 0 }}>
              <strong>Draft pending legal review.</strong> This policy describes the
              site as currently built. It must be reviewed by counsel — and updated to
              reflect any analytics, CRM, or email tooling added later — before this site
              accepts live traffic.
            </p>
          </div>

          <h2>The calculator does not collect anything</h2>
          <p>
            The equity calculator on this site runs entirely in your browser. The home
            value, mortgage balance, and rate figures you enter are never transmitted to
            us, never stored, and never leave your device. Closing the tab discards them.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>When you book a call.</strong> Scheduling is handled by Calendly, a
            third-party service. When you book, you provide your name, email address, and
            any answers to the questions on the booking form directly to Calendly, and
            Calendly shares that information with us so we can hold the meeting. Calendly
            also sets its own cookies and processes data under its own privacy policy,
            which we do not control.
          </p>
          <p>
            <strong>When you email us.</strong> We receive whatever you send, and retain
            it as business correspondence.
          </p>
          <p>
            <strong>When you become a client.</strong> An engagement requires financial
            and property information. What we collect, why, and how long we keep it is
            set out in the milestone agreement.
          </p>

          <h2>Third-party services used by this site</h2>
          <ul>
            <li>
              <strong>Calendly</strong> — scheduling. Loads a script from
              assets.calendly.com on the booking page only.
            </li>
            <li>
              <strong>Google Fonts</strong> — typography. Font files are requested from
              Google’s servers, which receives your IP address as part of that request.
            </li>
          </ul>
          <p className="muted small">
            This site does not currently run analytics, advertising pixels, or tracking
            cookies of its own. If that changes, this policy will be updated first.
          </p>

          <h2>How we use it</h2>
          <p>
            To schedule and hold meetings you request, to respond to your enquiries, and
            to deliver services under an executed agreement. We do not sell your personal
            information.
          </p>

          <h2>Your rights</h2>
          <p>
            California residents have rights under the CCPA/CPRA, including the right to
            know what personal information we hold, to request deletion, to correct
            inaccurate information, and not to be discriminated against for exercising
            those rights. To exercise any of them, email{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Security</h2>
          <p>
            We use encrypted storage and access controls for client records. No system is
            perfectly secure, and we cannot guarantee absolute security of information
            transmitted over the internet.
          </p>

          <h2>Children</h2>
          <p>
            This site is not directed to anyone under 18 and we do not knowingly collect
            information from minors.
          </p>

          <h2>Contact</h2>
          <p>
            {SITE.legalEntity}, {SITE.jurisdiction} —{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>

          <p className="muted small">Effective date: pending legal review.</p>
        </div>
      </section>
    </>
  )
}
