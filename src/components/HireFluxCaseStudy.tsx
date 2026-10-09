import { useEffect, useRef, useState } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import { chapters, evidence } from '../content/hirefluxCaseStudy'
import { SourceLink, HeroProduct, CompetingPriorities, MeaningCorrection, IterationSketches, ProductEvidence, SystemBlueprint, ConcurrencyScene, RetryScene } from './HireFluxVisuals'
import { HireFluxNotebook } from './HireFluxNotebook'
import styles from './HireFluxCaseStudy.module.css'

export function HireFluxCaseStudy() {
  const articleRef = useRef<HTMLElement>(null)
  const [activeChapter, setActiveChapter] = useState<string>('overview')
  useEffect(() => {
    let disposed = false
    let frame = 0
    let resizeFrame = 0
    const alignHash = () => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      if (target instanceof HTMLDetailsElement) target.open = true
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    const scheduleHash = () => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      const chapter = document.getElementById(id)?.closest<HTMLElement>('[data-chapter]')
      if (chapter) setActiveChapter(chapter.id)
      void document.fonts.ready.then(() => {
        if (disposed) return
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => { frame = requestAnimationFrame(alignHash) })
      })
    }
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-seen', 'true')
        sceneObserver.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: .08 })
    let chapterObserver: IntersectionObserver
    const updateActiveChapter = () => {
      const readingLine = Math.min(window.innerHeight * .28, 260)
      const sections = Array.from(articleRef.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? [])
      const atLine = sections.find(section => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= readingLine && bounds.bottom > readingLine
      })
      const nearestBefore = [...sections].reverse().find(section => section.getBoundingClientRect().top <= readingLine)
      setActiveChapter((atLine ?? nearestBefore ?? sections[0])?.id ?? 'overview')
    }
    const observeChapters = () => {
      chapterObserver?.disconnect()
      const readingLine = Math.round(Math.min(window.innerHeight * .28, 260))
      // A thin observer band follows the reading position in either scroll direction.
      chapterObserver = new IntersectionObserver(updateActiveChapter, { rootMargin: `-${readingLine}px 0px -${Math.max(0, window.innerHeight - readingLine - 2)}px 0px`, threshold: 0 })
      articleRef.current?.querySelectorAll('[data-chapter]').forEach(element => chapterObserver.observe(element))
      updateActiveChapter()
    }
    const resizeChapters = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(observeChapters) }
    articleRef.current?.querySelectorAll('[data-scene]').forEach(element => sceneObserver.observe(element))
    observeChapters()
    scheduleHash()
    window.addEventListener('hashchange', scheduleHash)
    window.addEventListener('pageshow', scheduleHash)
    window.addEventListener('resize', resizeChapters)
    return () => { disposed = true; cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame); sceneObserver.disconnect(); chapterObserver.disconnect(); window.removeEventListener('hashchange', scheduleHash); window.removeEventListener('pageshow', scheduleHash); window.removeEventListener('resize', resizeChapters) }
  }, [])
  const active = chapters.find(chapter => chapter.id === activeChapter)
  const activeQuestion = active?.question ?? 'How does a saved fact become a useful next step?'

  return <article ref={articleRef} className={styles.caseStudy} aria-label="HireFlux engineering case study">
    <section className={styles.hero} id="overview" data-chapter aria-labelledby="overview-heading">
      <a className={styles.backLink} href="/#work">← Selected work</a>
      <div className={styles.heroComposition}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Personal project / Joan Morillo</p>
          <h1 id="overview-heading">HireFlux<span className={styles.heroPeriod}>.</span></h1>
          <p className={styles.heroThesis}>From recorded state<br /><span>to the next step.</span></p>
          <p className={styles.heroSummary}>A full-stack job-search workspace. Applications, interviews, and follow-ups become actionable context—with rules, ownership, and uncertainty kept explicit.</p>
          <div className={styles.heroActions}><a href="#investigation">Explore the story <span aria-hidden="true">↓</span></a><SourceLink href={hireFlux.repository}>Repository</SourceLink></div>
          <p className={styles.heroStatus}><span className={styles.statusDot} aria-hidden="true" /> Implemented locally <span className={styles.demoStatus}>Isolated 24-hour demo</span><br /><span>AWS runtime not deployed</span></p>
        </div>
        <HeroProduct />
      </div>
      <dl className={styles.projectStrip}><div><dt>Owned end to end</dt><dd>Product · frontend · backend · data · tests</dd></div><div><dt>Implemented stack</dt><dd>React / TypeScript · FastAPI · DynamoDB Local</dd></div><div><dt>The engineering question</dt><dd>What can this data honestly tell someone to do?</dd></div></dl>
    </section>

    <nav className={styles.chapterNav} aria-label="Case study chapters"><div>{chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}><span aria-hidden="true">0{i + 1}</span>{chapter.label}</a>)}</div><p key={activeChapter}>{activeQuestion}</p></nav>

    <section className={styles.investigation} id="investigation" data-chapter aria-labelledby="investigation-heading">
      <div className={styles.problemComposition}>
        <header data-scene><p className={styles.eyebrow}>01 / The candidate's first question</p><h2 id="investigation-heading">Which task is<br /><span>actually due?</span></h2><p>Northwind has a saved follow-up date. Evergreen has waited in Applied for two weeks with no follow-up date. A candidate should be able to tell which one is due.</p><p>Earlier Home guidance came from four separate surfaces. The source and fictional-demo audit found that their timing rules could make undated work look urgent and time in a stage look overdue.</p></header>
        <CompetingPriorities />
      </div>
      <div className={styles.turningPoint} id="action-semantics" data-scene><div><span className={styles.smallLabel}>The first design decision</span><h3>Two weeks waiting.<br /><span>No deadline to miss.</span></h3></div><p>Evergreen has been in the Applied stage for at least 14 days. HireFlux can suggest checking that application. Without a saved follow-up date, it cannot say the candidate missed a deadline.</p></div>
      <MeaningCorrection />
      <div className={styles.iterationHeading} data-scene><h3>One rule set.<br /><span>Then a clearer screen.</span></h3><p>Consolidating the guidance resolved conflicting interpretations. The first layout still presented a long queue. A later composition separated recorded commitments from quieter review suggestions.</p></div>
      <IterationSketches />
      <p className={styles.provenance}>Documented audit → IA → composition research → September 25 implementation and refinement. The visual snapshots above illustrate those decisions; they are not historical screenshots or measured user outcomes. <a href="#evidence-problem">Inspect the investigation</a></p>
    </section>

    <section className={styles.productChapter} id="workflow" data-chapter aria-labelledby="workflow-heading">
      <span id="product" className={styles.anchorAlias} />
      <header className={styles.productHeading} data-scene><p className={styles.eyebrow}>02 / The implemented Home experience</p><h2 id="workflow-heading">What a candidate<br /><span>actually sees.</span></h2><p>Evergreen appears as a review suggestion with no recorded deadline. Northwind's saved check-back date makes its follow-up overdue. Both remain visible for the candidate to judge and act on.</p></header>
      <ProductEvidence />
      <div className={styles.partialEvidence}><span className={styles.smallLabel}>Protect the quiet states, too</span><p><strong>Cached data + failed refresh ≠ all-clear.</strong><br />Something visible is not the same as complete evidence.</p></div>
    </section>

    <section className={styles.systemChapter} id="system" data-chapter aria-labelledby="system-heading">
      <header className={styles.systemHeading} data-scene><div><p className={styles.eyebrow}>03 / Follow one saved date</p><h2 id="system-heading">A saved date.<br /><span>A justified prompt.</span></h2></div><p>Northwind's September 26 check-back is saved on its application. The backend compares that date with September 29 and returns an overdue follow-up action. The browser displays the result; it does not invent the deadline.</p></header>
      <SystemBlueprint />
      <div className={styles.systemTradeoff}><span className={styles.smallLabel}>The tradeoff</span><p>Maintained projections add write complexity. Index reads may lag; canonical writes remain conditional. <a href="#evidence-system">Inspect the consistency boundary ↓</a></p></div>
    </section>

    <section className={styles.engineeringChapter} id="engineering" data-chapter aria-labelledby="engineering-heading">
      <span id="state-correctness" className={styles.anchorAlias} />
      <header className={styles.engineeringHeading} data-scene><p className={styles.eyebrow}>04 / Now put the record under pressure</p><h2 id="engineering-heading">An old form<br /><span>must not win.</span></h2><p>Two tabs. One application. A newer edit must survive an older tab’s save. The outcome below is complete; replay lets you inspect how it happens.</p></header>
      <ConcurrencyScene />
      <div className={styles.lifecycleNote}><span className={styles.smallLabel}>Same principle / lifecycle</span><p>General edits cannot change status. Dedicated transitions enforce allowed moves; archive remembers the prior state, and restore returns only to that state. <a href="#evidence-correctness">Inspect the contract ↓</a></p></div>
      <section className={styles.recoveryStory} id="demo-lifecycle" aria-labelledby="recovery-title"><div className={styles.recoveryHeading}><div><p className={styles.eyebrow}>Another failure / demo entry</p><h3 id="recovery-title">A lost response.<br /><span>One ready workspace.</span></h3></div><p>If creation succeeds but its reply is lost, a same-key retry recovers the ready, unexpired workspace with its original identity and expiry.</p></div><RetryScene /><p className={styles.provenance}>Temporary identity avoids signup. Public entry still needs throttling, monitoring, and cost controls; access expiry is not exact-time deletion.</p></section>
    </section>

    <section className={styles.proofChapter} id="verification" data-chapter aria-labelledby="verification-heading">
      <span id="proof" className={styles.anchorAlias} />
      <header className={styles.proofHeading} data-scene><p className={styles.eyebrow}>05 / Test the failure cases</p><h2 id="verification-heading">What happens<br /><span>when things go wrong?</span></h2><p>Each earlier decision has a failure it must prevent: an invented due date, an old edit overwriting new work, or a demo that appears ready after provisioning fails.</p></header>
      <div className={styles.assertions} aria-label="Representative implemented test protections" data-scene>
        <div><span className={styles.assertionSymbol} aria-hidden="true">≠</span><span className={styles.assertionMark}>Evergreen / meaning</span><p>Applied for 14+ days. <br />No saved follow-up date.</p><strong>Review suggested; no due date invented.</strong><a href="#proof-meaning">Inspect meaning tests ↓</a></div>
        <div><span className={styles.assertionSymbol} aria-hidden="true">⊣</span><span className={styles.assertionMark}>Northwind / newer edit</span><p>Tab B sends version 1. <br />The record is already version 2.</p><strong>HTTP 409; version 2 survives.</strong><a href="#proof-state">Inspect write tests ↓</a></div>
        <div><span className={styles.assertionSymbol} aria-hidden="true">↩</span><span className={styles.assertionMark}>Demo / failed seed</span><p>An injected seed failure interrupts workspace creation.</p><strong>FAILED + 503; no session returned.</strong><a href="#proof-recovery">Inspect failure tests ↓</a></div>
      </div>
      <aside className={styles.qualification} aria-label="Dated executed verification"><div><span className={styles.smallLabel}>Executed / Oct 7, 2026 UTC / 0ef61b7</span><strong><span aria-hidden="true">✓</span> Five quality jobs passed.</strong><p>Checks, builds, artifact probes, and infrastructure synthesis. CI qualification is not deployment.</p></div><SourceLink href={evidence.run}>Inspect run #74</SourceLink></aside>

      <section className={styles.reflection} id="limits" aria-labelledby="limits-heading"><div data-scene><p className={styles.eyebrow}>The reflection</p><h2 id="limits-heading">Clarity is a<br /><span>system property.</span></h2><p>Consolidating four surfaces did not finish the work. Correct meaning and readable composition solved different parts of the same problem. Both needed rules that held beyond the screen.</p><p>Candidate outcomes have not been measured. The case study demonstrates implemented behavior and documented decisions—not a validated improvement in someone’s job search.</p></div><aside id="future" aria-labelledby="future-heading"><span className={styles.plannedLabel}>AWS direction / status reviewed Oct 8, 2026</span><h3 id="future-heading">Designed for AWS.<br />Deployment still gated.</h3><p>The local product and its October 7 source qualification remain the implemented baseline. An October 8 read-only assessment advanced the shared-account deployment plan without changing the runtime or provisioning resources.</p><dl className={styles.readinessLedger}><div><dt>Committed · Oct 7</dt><dd>Five quality jobs passed for the qualified source and infrastructure definition.</dd></div><div><dt>Assessed locally · Oct 8</dt><dd>Service metadata and narrower permission proposals were reviewed. Drafts and simulations do not establish deployment access.</dd></div><div><dt>Still open</dt><dd>Billing review, Lambda headroom, and deployment permissions/bootstrap need resolution and renewed qualification.</dd></div></dl><p>No AWS stack or Amplify hosting is deployed. <strong>Next:</strong> resolve the open gates, verify staging under supervision, then study candidate outcomes.</p><SourceLink href={evidence.readiness}>Inspect committed Oct 7 preflight</SourceLink></aside></section>
      <HireFluxNotebook />
      <footer className={styles.closing} data-scene><span className={styles.eyebrow}>The work is open for inspection</span><h2>Let’s talk<br /><span>engineering.</span></h2><div><a href={`mailto:${site.email}`}>Talk about HireFlux <span aria-hidden="true">↗</span></a><SourceLink href={hireFlux.repository}>Explore the code</SourceLink><a href="/#work">Back to selected work</a></div></footer>
    </section>
  </article>
}
