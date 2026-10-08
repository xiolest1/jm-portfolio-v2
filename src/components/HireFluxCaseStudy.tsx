import { useEffect, useRef, useState } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import { chapters, evidence } from '../content/hirefluxCaseStudy'
import { SourceLink, HeroProduct, CompetingPriorities, MeaningCorrection, IterationSketches, ProductEvidence, SystemBlueprint, ConcurrencyScene, RetryScene } from './HireFluxVisuals'
import { HireFluxNotebook } from './HireFluxNotebook'
import styles from './HireFluxCaseStudy.module.css'

export function HireFluxCaseStudy() {
  const articleRef = useRef<HTMLElement>(null)
  const [activeChapter, setActiveChapter] = useState<string>('investigation')
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
    const observeChapters = () => {
      chapterObserver?.disconnect()
      // Percentage root margins use viewport WIDTH, even vertically. Use height-based pixels.
      chapterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveChapter(entry.target.id) })
      }, { rootMargin: `-${Math.round(window.innerHeight * .12)}px 0px -${Math.round(window.innerHeight * .55)}px 0px`, threshold: 0 })
      articleRef.current?.querySelectorAll('[data-chapter]').forEach(element => chapterObserver.observe(element))
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
  const active = chapters.find(chapter => chapter.id === activeChapter) ?? chapters[0]

  return <article ref={articleRef} className={styles.caseStudy} aria-label="HireFlux engineering case study">
    <section className={styles.hero} id="overview" aria-labelledby="overview-heading">
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

    <nav className={styles.chapterNav} aria-label="Case study chapters"><div>{chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}><span aria-hidden="true">0{i + 1}</span>{chapter.label}</a>)}</div><p>{active.question}</p></nav>

    <section className={styles.investigation} id="investigation" data-chapter aria-labelledby="investigation-heading">
      <div className={styles.problemComposition}>
        <header><p className={styles.eyebrow}>01 / The interface was asking too much</p><h2 id="investigation-heading">Four answers.<br /><span>One Home.</span></h2><p>HireFlux could record a job search. Its Home page had four surfaces competing to explain what mattered next.</p><p>Joan’s source/runtime audit found different producers and thresholds. Worse, undated work could read as due today; stage age could read as overdue.</p><a className={styles.quietLink} href="#evidence-product">Open the investigation ↓</a></header>
        <CompetingPriorities />
      </div>
      <div className={styles.turningPoint} id="action-semantics"><div><span className={styles.smallLabel}>The first design decision</span><h3>Age is not <br /><span>a deadline.</span></h3></div><p>Start with what the record actually says. Dates justify timing. Stage age justifies a suggestion. Missing information must remain missing.</p></div>
      <MeaningCorrection />
      <div className={styles.iterationHeading}><h3>Meaning first. <br /><span>Composition next.</span></h3><p>One authority fixed the disagreement. The first consolidated layout still felt like a queue, so a second pass changed how the same evidence was presented.</p></div>
      <IterationSketches />
      <p className={styles.provenance}>Documented audit → IA → composition research → September 25 implementation and refinement. These are source-backed design iterations, not measured user outcomes.</p>
    </section>

    <section className={styles.productChapter} id="workflow" data-chapter aria-labelledby="workflow-heading">
      <span id="product" className={styles.anchorAlias} />
      <header className={styles.productHeading}><p className={styles.eyebrow}>02 / One decision area, different kinds of evidence</p><h2 id="workflow-heading">Clearer guidance.<br /><span>Honest boundaries.</span></h2><p>Recorded commitments lead. Undated steps and stage-age suggestions remain available without pretending to be deadlines. The candidate keeps the choice.</p></header>
      <ProductEvidence />
      <div className={styles.partialEvidence}><span className={styles.smallLabel}>Protect the quiet states, too</span><p><strong>Cached data + failed refresh ≠ all-clear.</strong><br />Something visible is not the same as complete evidence.</p></div>
    </section>

    <section className={styles.systemChapter} id="system" data-chapter aria-labelledby="system-heading">
      <header className={styles.systemHeading}><div><p className={styles.eyebrow}>03 / Follow one fact through the system</p><h2 id="system-heading">Meaning needs<br /><span>an owner.</span></h2></div><p>A saved follow-up date becomes a server-derived action and then a qualified prompt. The browser presents it; one FastAPI application owns the rules.</p></header>
      <SystemBlueprint />
      <div className={styles.systemTradeoff}><span className={styles.smallLabel}>The tradeoff</span><p>Maintained projections add write complexity. Index reads may lag; canonical writes remain conditional. <a href="#evidence-system">Inspect the consistency boundary ↓</a></p></div>
    </section>

    <section className={styles.engineeringChapter} id="engineering" data-chapter aria-labelledby="engineering-heading">
      <span id="state-correctness" className={styles.anchorAlias} />
      <header className={styles.engineeringHeading}><p className={styles.eyebrow}>04 / Now put the record under pressure</p><h2 id="engineering-heading">An old form<br /><span>must not win.</span></h2><p>Two tabs. One application. A newer edit must survive an older tab’s save. The outcome below is complete; replay lets you inspect how it happens.</p></header>
      <ConcurrencyScene />
      <div className={styles.lifecycleNote}><span className={styles.smallLabel}>Same principle / lifecycle</span><p>General edits cannot change status. Dedicated transitions enforce allowed moves; archive remembers the prior state, and restore returns only to that state. <a href="#evidence-correctness">Inspect the contract ↓</a></p></div>
      <section className={styles.recoveryStory} id="demo-lifecycle" aria-labelledby="recovery-title"><div className={styles.recoveryHeading}><div><p className={styles.eyebrow}>Another failure / demo entry</p><h3 id="recovery-title">A lost response.<br /><span>One ready workspace.</span></h3></div><p>If creation succeeds but its reply is lost, a same-key retry recovers the ready, unexpired workspace with its original identity and expiry.</p></div><RetryScene /><p className={styles.provenance}>Temporary identity avoids signup. Public entry still needs throttling, monitoring, and cost controls; access expiry is not exact-time deletion.</p></section>
    </section>

    <section className={styles.proofChapter} id="verification" data-chapter aria-labelledby="verification-heading">
      <span id="proof" className={styles.anchorAlias} />
      <header className={styles.proofHeading}><p className={styles.eyebrow}>05 / Turn the risks into assertions</p><h2 id="verification-heading">Challenge<br /><span>the promise.</span></h2><p>Verification follows the failures the design is meant to prevent. These protections exist in source and tests; their scope matters as much as their result.</p></header>
      <div className={styles.assertions} aria-label="Representative implemented test protections" data-scene>
        <div><span className={styles.assertionSymbol} aria-hidden="true">≠</span><span className={styles.assertionMark}>Meaning</span><p>14+ days in stage. <br />No saved deadline.</p><strong>No invented due date.</strong><a href="#evidence-verification">Meaning tests ↓</a></div>
        <div><span className={styles.assertionSymbol} aria-hidden="true">⊣</span><span className={styles.assertionMark}>State</span><p>Expected v1. <br />Stored v2.</p><strong>409. Newer edit survives.</strong><a href="#evidence-verification">Write tests ↓</a></div>
        <div><span className={styles.assertionSymbol} aria-hidden="true">↩</span><span className={styles.assertionMark}>Recovery</span><p>Injected seed failure. <br />Provisioning cannot complete.</p><strong>FAILED + 503. No session.</strong><a href="#evidence-verification">Failure tests ↓</a></div>
      </div>
      <aside className={styles.qualification} aria-label="Dated executed verification"><div><span className={styles.smallLabel}>Executed / Oct 7, 2026 UTC / 0ef61b7</span><strong><span aria-hidden="true">✓</span> Five quality jobs passed.</strong><p>Checks, builds, artifact probes, and infrastructure synthesis. CI qualification is not deployment.</p></div><SourceLink href={evidence.run}>Inspect run #74</SourceLink></aside>

      <section className={styles.reflection} id="limits" aria-labelledby="limits-heading"><div><p className={styles.eyebrow}>The reflection</p><h2 id="limits-heading">Clarity is a<br /><span>system property.</span></h2><p>Consolidating four surfaces did not finish the work. Correct meaning and readable composition solved different parts of the same problem. Both needed rules that held beyond the screen.</p><p>Candidate outcomes have not been measured. The case study demonstrates implemented behavior and documented decisions—not a validated improvement in someone’s job search.</p></div><aside id="future" aria-labelledby="future-heading"><span className={styles.plannedLabel}>Planned runtime / current preparation</span><h3 id="future-heading">Prepared for AWS.<br />Not operating on AWS.</h3><p>Committed preparation is remotely qualified. Staging preflight remains blocked; no AWS stack or Amplify hosting is deployed.</p><p><strong>Next:</strong> resolve preflight, deploy staging, verify the runtime, then study candidate outcomes.</p><SourceLink href={evidence.readiness}>Inspect the staging boundary</SourceLink></aside></section>
      <HireFluxNotebook />
      <footer className={styles.closing}><span className={styles.eyebrow}>The work is open for inspection</span><h2>Let’s talk<br /><span>engineering.</span></h2><div><a href={`mailto:${site.email}`}>Talk about HireFlux <span aria-hidden="true">↗</span></a><SourceLink href={hireFlux.repository}>Explore the code</SourceLink><a href="/#work">Back to selected work</a></div></footer>
    </section>
  </article>
}
