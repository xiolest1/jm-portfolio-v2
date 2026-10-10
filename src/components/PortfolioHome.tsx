import { useEffect } from 'react'
import { ProfessionalJourney } from './ProfessionalJourney'
import { HireFluxProductScene, LibraryContributionScene, RcControlPath } from './HomeProjectScenes'
import { useJourneyMotion } from './useJourneyMotion'
import { hireFlux, libraryProject, rcProject } from '../content/projects'
import { site } from '../content/site'
import styles from './PortfolioHome.module.css'

function ExternalLink({ href, children }: { href: string; children: string }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

export function PortfolioHome() {
  const { rootRef } = useJourneyMotion()
  useEffect(() => {
    let disposed = false
    let frame = 0
    const alignHash = () => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      if (id) document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
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
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('hashchange', scheduleHash); window.removeEventListener('pageshow', scheduleHash) }
  }, [])

  return <div className={styles.home} ref={rootRef}>
    <section className={styles.identity} id="top" data-home-scene aria-labelledby="identity-title">
      <div className={styles.identityCopy}>
        <p className={styles.eyebrow}>Software engineer</p>
        <h1 className={styles.name} id="identity-title">Joan <span>Morillo.</span></h1>
        <p className={styles.pronunciation}>Pronounced “{site.pronunciation}”</p>
      </div>
      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}><img src={site.avatar} alt="Portrait of Joan Morillo" width="960" height="1280" fetchPriority="high" /></div>
        <figcaption><span>Joan Morillo</span><span>Software engineering</span></figcaption>
      </figure>
      <div className={styles.identitySummary}>
        <p className={styles.direction}>Backend systems.<br /><span>Full-stack applications.</span></p>
        <p className={styles.positioning}>I build applications with useful interfaces, explicit backend rules, and reliable data workflows.</p>
        <div className={styles.actions}><a className={styles.actionPrimary} href="#work"><span>Explore my work</span><span aria-hidden="true">↘</span></a><a className={styles.actionText} href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className={styles.identityFoundation} aria-label="Professional snapshot">
        <div><span className={styles.snapshotLabel}>Academic foundation</span><strong>B.S. Computer Science</strong><span>Montclair State University · May 2025</span></div>
        <div><span className={styles.snapshotLabel}>Supporting capability</span><strong>AWS cloud knowledge</strong><span>Solutions Architect – Associate certified</span></div>
        <a href="#work" className={styles.workHandoff}><span>Selected engineering work</span><strong>See what I build <span aria-hidden="true">↓</span></strong></a>
      </div>
    </section>

    <section className={styles.flagship} id="work" data-home-scene aria-labelledby="hireflux-title">
      <header className={styles.flagshipHeading}>
        <div><p className={styles.eyebrow}>01 / Flagship personal project</p><h2 id="hireflux-title">{hireFlux.title}<span>.</span></h2></div>
        <div className={styles.flagshipPurpose}><p>A clearer next step<br />in the job search.</p><span>Applications, interviews, and follow-ups brought into one candidate workspace.</span></div>
      </header>
      <div className={styles.projectBoundary}><span>Designed &amp; built as a personal project</span><span><i aria-hidden="true" />Local demo · AWS infrastructure not deployed</span></div>
      <HireFluxProductScene />
      <div className={styles.flagshipFooter}>
        <div><p className={styles.eyebrow}>Engineering behind the product</p><ul className={styles.signalList}>{hireFlux.signals.map(signal => <li key={signal}>{signal}</li>)}</ul><p className={styles.stackLine}>{hireFlux.stack.join(' · ')}</p></div>
        <div className={styles.flagshipLinks}><a className={styles.caseStudyAction} href={hireFlux.caseStudy}><span>Inside the engineering</span><strong>Read the case study <span aria-hidden="true">↗</span></strong></a><ExternalLink href={hireFlux.repository}>View source on GitHub</ExternalLink></div>
      </div>
    </section>

    <section className={styles.supporting} aria-labelledby="supporting-title">
      <header className={styles.supportingHeading} data-home-scene><p className={styles.eyebrow}>02 / Selected supporting work</p><h2 id="supporting-title">Different problems.<br /><span>More engineering range.</span></h2></header>
      <article className={styles.library} id="project-library" aria-labelledby="library-title" data-home-scene>
        <div className={styles.supportCopy}><p className={styles.projectMeta}>Library Web Application · Team project</p><h3 id="library-title">Find a book.<br />Make a reading list.</h3><p>{libraryProject.summary}</p><div className={styles.contribution}><span>My contribution</span><p>{libraryProject.contribution}</p></div><ExternalLink href={libraryProject.repository}>Explore the Library repository</ExternalLink></div>
        <LibraryContributionScene />
      </article>
      <article className={styles.rcProject} id="project-rcdetection" aria-labelledby="rc-title" data-home-scene>
        <figure className={styles.rcMedia}><img src={rcProject.image} alt={rcProject.imageAlt} width="450" height="800" loading="lazy" decoding="async" /><figcaption>Actual team project vehicle</figcaption></figure>
        <div className={styles.rcContent}><div className={styles.supportCopy}><p className={styles.projectMeta}>RCDetection · Team project</p><h3 id="rc-title">From a camera frame<br />to physical control.</h3><p>{rcProject.summary}</p></div><RcControlPath /><div className={styles.rcContribution}><div><span>My contribution</span><p>{rcProject.contribution}</p></div><ExternalLink href={rcProject.repository}>Explore RCDetection on GitHub</ExternalLink></div></div>
      </article>
    </section>
    <ProfessionalJourney />
  </div>
}
