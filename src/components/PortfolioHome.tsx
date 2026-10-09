import { useEffect } from 'react'
import { ProfessionalJourney } from './ProfessionalJourney'
import { useJourneyMotion } from './useJourneyMotion'
import { hireFlux, libraryProject, rcProject } from '../content/projects'
import { site } from '../content/site'
import styles from './PortfolioHome.module.css'

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  )
}

export function PortfolioHome() {
  const { rootRef } = useJourneyMotion()

  useEffect(() => {
    let disposed = false
    let frame = 0
    const alignHash = () => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      if (!id) return
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    const scheduleHash = () => {
      void document.fonts.ready.then(() => {
        if (disposed) return
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => { frame = requestAnimationFrame(alignHash) })
      })
    }
    scheduleHash()
    window.addEventListener('hashchange', scheduleHash)
    window.addEventListener('pageshow', scheduleHash)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', scheduleHash)
      window.removeEventListener('pageshow', scheduleHash)
    }
  }, [])

  return (
    <div className={styles.home} ref={rootRef}>
      <section className={styles.identity} id="top" data-home-scene aria-labelledby="identity-title">
        <div className={styles.identityCopy}>
          <p className={styles.eyebrow}>Software engineering · backend + full-stack</p>
          <h1 className={styles.name} id="identity-title">{site.name}</h1>
          <p className={styles.pronunciation}>Pronounced “{site.pronunciation}”</p>
          <p className={styles.role}>{site.role}</p>
          <p className={styles.positioning}>
            I build backend and full-stack applications with clear system boundaries,
            reliable data handling, and useful workflows. AWS strengthens that
            software-engineering foundation.
          </p>
          <div className={styles.credibility}>
            <span>B.S. Computer Science · Montclair State University · May 2025</span>
            <span>AWS Solutions Architect – Associate</span>
          </div>
        </div>
        <div className={styles.identityFoot}>
          <div className={styles.actions}>
            <a className={styles.actionPrimary} href="#work">Explore selected work <span aria-hidden="true">↘</span></a>
          </div>
          <div className={styles.profileLine} aria-label="Engineering focus">
            <span>Backend systems</span>
            <span>Full-stack products</span>
            <span>Reliable data workflows</span>
          </div>
        </div>
        <figure className={styles.portrait}>
          <img
            src={site.avatar}
            alt="Portrait of Joan Morillo"
            width="960"
            height="1280"
            fetchPriority="high"
          />
        </figure>
        <span className={styles.orbit} aria-hidden="true" />
      </section>

      <section className={styles.flagship} id="work" data-home-scene aria-labelledby="hireflux-title">
        <div className={styles.regionHeader}>
          <p className={styles.eyebrow}>01 / Flagship proof</p>
          <p className={styles.regionHint}>Personal project</p>
        </div>
        <div className={styles.flagshipGrid}>
          <div className={styles.flagshipCopy}>
            <h2 className={styles.projectTitle} id="hireflux-title">{hireFlux.title}</h2>
            <p className={styles.projectSummary}>{hireFlux.summary}</p>
            <p className={styles.statusLine}>
              <span className={styles.statusDot} aria-hidden="true" />
              {hireFlux.status}
            </p>
          </div>
          <figure className={styles.flagshipMedia}>
            <a className={styles.flagshipImageLink} href={hireFlux.caseStudy} aria-label="Read the HireFlux engineering case study">
              <span className={styles.windowBar} aria-hidden="true"><span>● ● ●</span><span>HireFlux / Action Center</span></span>
              <img
                src={hireFlux.image}
                alt={hireFlux.imageAlt}
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <span className={styles.imageInvitation}>Explore the engineering case study <span aria-hidden="true">↗</span></span>
            </a>
            <figcaption>Local demo workspace · fictional records</figcaption>
          </figure>
          <div className={styles.flagshipEvidence}>
            <p className={styles.signalLabel}>Implemented engineering signals</p>
            <ul className={styles.signalList}>
              {hireFlux.signals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
            <ul className={styles.stackLine} aria-label="HireFlux technologies">
              {hireFlux.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.projectLinks}>
              <a className={styles.textLinkStrong} href={hireFlux.caseStudy}>
                Read the engineering case study <span aria-hidden="true">↗</span>
              </a>
              <ExternalLink href={hireFlux.repository}>View HireFlux on GitHub</ExternalLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.supporting} data-home-scene aria-labelledby="supporting-title">
        <div className={styles.regionHeader}>
          <p className={styles.eyebrow}>02 / Selected supporting work</p>
          <h2 className={styles.sectionTitle} id="supporting-title">
            Broader engineering evidence
          </h2>
        </div>

        <article className={styles.library} id="project-library" data-home-scene>
          <div className={styles.projectMeta}>
            <span>{libraryProject.type}</span>
            <span>Backend · relational data · authorization</span>
          </div>
          <div className={styles.supportGrid}>
            <div>
              <h3 className={styles.supportTitle}>{libraryProject.title}</h3>
              <p className={styles.projectSummary}>{libraryProject.summary}</p>
              <p className={styles.contribution}>
                <strong>Contribution</strong> {libraryProject.contribution}
              </p>
              <ul className={styles.stackLine} aria-label="Library technologies">
                {libraryProject.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ExternalLink href={libraryProject.repository}>View Library on GitHub</ExternalLink>
            </div>
            <div className={styles.flowProof} role="group" aria-label="Library system overview">
              <span className={styles.flowLabel}>System at a glance</span>
              <div className={styles.flowLine}>
                <span>Flask API</span>
                <span className={styles.flowArrow} aria-hidden="true">→</span>
                <span>PostgreSQL</span>
              </div>
              <p>SQLAlchemy data layer · session auth and roles · Docker</p>
            </div>
          </div>
        </article>

        <article className={styles.rcProject} id="project-rcdetection" data-home-scene>
          <figure className={styles.rcMedia}>
            <img
              src={rcProject.image}
              alt={rcProject.imageAlt}
              width="450"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className={styles.rcCopy}>
            <div className={styles.projectMeta}>
              <span>{rcProject.type}</span>
              <span>Computer vision · physical control</span>
            </div>
            <h3 className={styles.supportTitle}>{rcProject.title}</h3>
            <p className={styles.projectSummary}>{rcProject.summary}</p>
            <p className={styles.contribution}>
              <strong>Contribution</strong> {rcProject.contribution}
            </p>
            <ul className={styles.stackLine} aria-label="RCDetection technologies">
              {rcProject.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <ExternalLink href={rcProject.repository}>View RCDetection on GitHub</ExternalLink>
          </div>
        </article>
      </section>

      <ProfessionalJourney />
    </div>
  )
}


