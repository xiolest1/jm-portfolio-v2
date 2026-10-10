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
    // Loaded-page anchors use the browser's native scrolling. Only correct
    // their position if an in-flight font load can still change the layout.
    const alignPendingFonts = () => {
      if (document.fonts.status === 'loading') scheduleHash()
    }
    scheduleHash()
    window.addEventListener('hashchange', alignPendingFonts)
    window.addEventListener('pageshow', scheduleHash)
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('hashchange', alignPendingFonts); window.removeEventListener('pageshow', scheduleHash) }
  }, [])

  return <div className={styles.home} ref={rootRef}>
    <section className={styles.identity} id="top" data-home-scene aria-labelledby="identity-title">
      <div className={styles.identityCopy}>
        <p className={styles.eyebrow}>Computer Science graduate</p>
        <h1 className={styles.name} id="identity-title">Joan Morillo<span>.</span></h1>
        <p className={styles.pronunciation}>Pronounced “{site.pronunciation}”</p>
      </div>
      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}><img src={site.avatar} alt="Portrait of Joan Morillo" width="960" height="1280" fetchPriority="high" /></div>
      </figure>
      <div className={styles.identitySummary}>
        <p className={styles.direction}>Software development<br /><span>across the full stack.</span></p>
        <p className={styles.positioning}>My work spans web applications, APIs, data systems, and computer vision—with attention to how software behaves and how people use it.</p>
        <div className={styles.actions}><a className={styles.actionPrimary} href="#work"><span>Explore my work</span><span aria-hidden="true">↘</span></a><a className={styles.actionText} href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
      </div>
      <p className={styles.identityNote}>Exploring early-career software development opportunities</p>
    </section>

    <section className={styles.flagship} id="work" data-home-scene aria-labelledby="hireflux-title">
      <header className={styles.flagshipOpening}>
        <p className={styles.eyebrow}>01 / Flagship project</p>
        <p className={styles.projectMeta}>Personal project · Local demo</p>
      </header>
      <div className={styles.flagshipGrid}>
        <div className={styles.flagshipCopy}>
          <h2 id="hireflux-title">{hireFlux.title}<span>.</span></h2>
          <p className={styles.flagshipPurpose}>Your job search,<br />in one workspace.</p>
        </div>
        <div className={styles.flagshipIntroduction}>
          <p className={styles.projectSummary}>{hireFlux.summary}</p>
          <div className={styles.flagshipLinks}>
            <a className={styles.caseStudyAction} href={hireFlux.caseStudy}>Explore the engineering case study <span aria-hidden="true">↗</span></a>
            <ExternalLink href={hireFlux.repository}>View source on GitHub</ExternalLink>
          </div>
        </div>
        <div className={styles.flagshipVisual}>
          <HireFluxProductScene />
        </div>
        <div className={styles.engineeringProof}>
          <h3>From tracking to action</h3>
          <p>Dated follow-ups and interviews stay distinct from review suggestions. Missing information stays visible, so candidates can make the call.</p>
          <div className={styles.engineeringDetail}>
            <h4>Engineering behind the workflow</h4>
            <ul className={styles.signalList}>{hireFlux.signals.map(signal => <li key={signal}>{signal}</li>)}</ul>
            <p className={styles.stackLine}>{hireFlux.stack.join(' · ')}</p>
          </div>
          <p className={styles.projectBoundary}>Isolated 24-hour demo with fictional data. AWS deployment remains planned.</p>
        </div>
      </div>
    </section>

    <section className={styles.supporting} aria-labelledby="supporting-title">
      <header className={styles.supportingHeading} data-home-scene><p className={styles.eyebrow}>02 / Selected work</p><h2 id="supporting-title">Selected team projects<span>.</span></h2></header>
      <article className={styles.library} id="project-library" aria-labelledby="library-title" data-home-scene>
        <div className={styles.supportCopy}><p className={styles.projectMeta}>Book discovery &amp; personal collections</p><h3 id="library-title">{libraryProject.title}</h3><p>{libraryProject.summary}</p><div className={styles.contribution}><span>My contribution · Team project</span><p>{libraryProject.contribution}</p></div><ExternalLink href={libraryProject.repository}>Explore the Library repository</ExternalLink></div>
        <LibraryContributionScene />
      </article>
      <article className={styles.rcProject} id="project-rcdetection" aria-labelledby="rc-title" data-home-scene>
        <figure className={styles.rcMedia}><img src={rcProject.image} alt={rcProject.imageAlt} width="450" height="800" loading="lazy" decoding="async" /><figcaption>Actual team project vehicle</figcaption></figure>
        <div className={styles.rcContent}><div className={styles.supportCopy}><p className={styles.projectMeta}>RCDetection · Computer vision &amp; physical control</p><h3 id="rc-title">{rcProject.title}</h3><p>{rcProject.summary}</p></div><RcControlPath /><div className={styles.rcContribution}><div><span>My contribution · Team project</span><p>{rcProject.contribution}</p></div><ExternalLink href={rcProject.repository}>Explore RCDetection on GitHub</ExternalLink></div></div>
      </article>
    </section>
    <ProfessionalJourney />
  </div>
}
