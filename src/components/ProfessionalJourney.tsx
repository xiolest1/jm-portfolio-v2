import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site'
import { ProfessionalFoundation } from './ProfessionalFoundation'
import styles from './ProfessionalJourney.module.css'

function OutwardArrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
}

function ExternalLink({ href, children }: { href: string; children: string }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<OutwardArrow /><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

export function ProfessionalJourney() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const copyEmail = async () => {
    window.clearTimeout(copyTimer.current)
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 3500)
  }

  const [emailName, emailDomain] = site.email.split('@')

  return (
    <div className={styles.journey}>
      <ProfessionalFoundation />

      <section className={styles.closing} id="about" aria-labelledby="about-title">
        <header className={styles.closingHeader} data-journey-reveal>
          <p className={styles.label}>04 / About &amp; contact</p>
          <h2 id="about-title">Let’s connect<span>.</span></h2>
        </header>
        <div className={styles.closingComposition}>
          <div className={styles.humanSignature}>
            <h3 className={styles.personalLabel}>A little about me</h3>
            <p className={styles.humanPerspective}>I like hearing a different perspective, asking questions, and talking an idea through.</p>
          </div>
          <div className={styles.contactContext}>
            <div className={styles.contact} id="contact">
              <p className={styles.contactLabel}>Email me directly</p>
              <a className={styles.emailAction} href={'mailto:' + site.email}>
                <span>{emailName}@<wbr /><span className={styles.emailDomain}><span>{emailDomain}</span><span className={styles.emailArrow}><OutwardArrow /></span></span></span>
              </a>
              <div className={styles.contactUtilities}>
                <div className={styles.socialLinks}><ExternalLink href={site.linkedin}>LinkedIn</ExternalLink><ExternalLink href={site.github}>GitHub</ExternalLink></div>
                <button className={styles.copyEmail} type="button" onClick={copyEmail}>
                  {copyState === 'copied' ? 'Email copied' : 'Copy email address'}
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></svg>
                </button>
              </div>
              <p className={styles.copyStatus} role="status">{copyState === 'error' ? 'Could not copy. You can use the email link above.' : copyState === 'copied' ? 'Email address copied to clipboard.' : ''}</p>
            </div>
          </div>
        </div>
        <div className={styles.endNote}><a href="#top">Back to top<span aria-hidden="true">↑</span></a></div>
      </section>
    </div>
  )
}
