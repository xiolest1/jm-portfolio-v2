import { useEffect, useState } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import { chapters, demoCommit, qualificationCommit, evidence } from '../content/hirefluxCaseStudy'
import { SourceLink, ProductCrop, CompetingPriorities, MeaningCorrection, IterationSketches, ProductEvidence, SystemBlueprint, ConcurrencyScene, RetryScene } from './HireFluxVisuals'
import styles from './HireFluxCaseStudy.module.css'

export function HireFluxCaseStudy() {
  const [activeChapter, setActiveChapter] = useState<string>('investigation')
  useEffect(() => {
    let disposed = false
    let frame = 0
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-seen', 'true')
          if (entry.target.hasAttribute('data-chapter')) setActiveChapter(entry.target.id)
        }
      })
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0 })
    document.querySelectorAll('[data-scene],[data-chapter]').forEach(element => observer.observe(element))
    scheduleHash()
    window.addEventListener('hashchange', scheduleHash)
    window.addEventListener('pageshow', scheduleHash)
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('hashchange', scheduleHash); window.removeEventListener('pageshow', scheduleHash) }
  }, [])
  const active = chapters.find(chapter => chapter.id === activeChapter) ?? chapters[0]

  return <article className={styles.caseStudy} aria-label="HireFlux engineering case study">
    <section className={styles.hero} id="overview" aria-labelledby="overview-heading">
      <a className={styles.backLink} href="/#work">← Selected work</a>
      <div className={styles.heroComposition}>
        <div className={styles.heroText}><p className={styles.eyebrow}>Personal project / Joan Morillo</p><h1 id="overview-heading">HireFlux</h1><p className={styles.heroThesis}>A record is useful.<br /><span>A next step is harder.</span></p><p className={styles.heroSummary}>A full-stack workspace for job applications, interviews, and follow-ups. The engineering challenge: turn recorded state into useful guidance without inventing certainty.</p><div className={styles.heroActions}><a href="#investigation">Follow the story <span aria-hidden="true">↓</span></a><SourceLink href={hireFlux.repository}>Repository</SourceLink></div><p className={styles.heroStatus}>Implemented locally · isolated 24-hour demo<br /><span>AWS runtime not deployed</span></p></div>
        <figure className={styles.heroProduct}><div className={styles.captureTop}><span>The starting point / an opportunity</span></div><ProductCrop image="/projects/hireflux-opportunity-dark.png" alt="Actual HireFlux application detail: Northwind Robotics, Warehouse Coordinator, Applied stage, a saved September 26 check-back date, and the opportunity journey." x={270} y={155} width={1140} height={620} eager /><figcaption>An opportunity, saved state, and a check-back date. Fictional local data; September 29, 2026 capture.</figcaption></figure>
      </div>
      <dl className={styles.projectStrip}><div><dt>My work</dt><dd>Product, frontend, backend, data, tests</dd></div><div><dt>Built with</dt><dd>React / TypeScript · FastAPI · DynamoDB Local</dd></div></dl>
    </section>

    <nav className={styles.chapterNav} aria-label="Case study chapters"><div>{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}>{chapter.label}</a>)}</div><p>{active.question}</p></nav>

    <section className={styles.investigation} id="investigation" data-chapter aria-labelledby="investigation-heading">
      <div className={styles.problemComposition}><header><p className={styles.eyebrow}>01 / Investigate the answer</p><h2 id="investigation-heading">Four answers.<br /><span>One Home.</span></h2><p>HireFlux could already record a job search. But its Home page had several places claiming to tell the candidate what mattered next.</p><p>The source/runtime audit found different producers, different thresholds, and a deeper problem: undated work could look due today; time in a stage could look overdue.</p><a className={styles.quietLink} href="#evidence-product">Read the investigation ↓</a></header><CompetingPriorities /></div>
      <div className={styles.turningPoint} id="action-semantics"><div><p className={styles.smallLabel}>The turning point</p><h3>Age is not<br /><span>a deadline.</span></h3></div><p>The fix began with meaning. Known dates justify timing. Stage age justifies a suggestion. An unknown owner or missing information has to remain unknown.</p></div>
      <MeaningCorrection />
      <div className={styles.iterationHeading}><h3>Correct semantics were only the first pass.</h3><p>The consolidated design still read like a queue. The next pass had to improve scanning without manufacturing a “most important” opportunity.</p></div>
      <IterationSketches />
      <p className={styles.provenance}>Documented design progression, not measured user outcomes. The audit and composition research precede the September 25 implementation and refinement commits.</p>
    </section>

    <section className={styles.productChapter} id="workflow" data-chapter aria-labelledby="workflow-heading">
      <span id="product" className={styles.anchorAlias} />
      <header className={styles.productHeading}><p className={styles.eyebrow}>02 / Let the evidence lead</p><h2 id="workflow-heading">One place to orient.<br /><span>More than one honest answer.</span></h2><p>Recorded commitments lead. Undated work and stage-age cues stay available with different emphasis. A candidate chooses what to do; Home does not pretend to know personal priority.</p></header>
      <ProductEvidence />
      <div className={styles.partialEvidence}><span className={styles.smallLabel}>One more boundary</span><p><strong>Cached data + failed refresh ≠ all-clear.</strong> Incomplete evidence remains incomplete, even when something can still be shown.</p></div>
      <p className={styles.bridge}>That distinction has to survive beyond the screen.<span aria-hidden="true"> ↓</span></p>
    </section>

    <section className={styles.systemChapter} id="system" data-chapter aria-labelledby="system-heading">
      <header className={styles.systemHeading}><p className={styles.eyebrow}>03 / Put authority in the right place</p><h2 id="system-heading">Meaning needs<br /><span>an owner.</span></h2><p>The client explains the next step. One FastAPI application derives the action, checks identity, and enforces lifecycle rules. Storage protects the state those rules depend on.</p></header>
      <SystemBlueprint />
      <div className={styles.systemTradeoff}><strong>One backend. A deliberate consistency boundary.</strong><p>Maintained projections add write complexity. Index reads may lag; canonical writes remain conditional.</p><a className={styles.quietLink} href="#evidence-system">Inspect the architecture and contracts ↓</a></div>
    </section>

    <section className={styles.engineeringChapter} id="engineering" data-chapter aria-labelledby="engineering-heading">
      <span id="state-correctness" className={styles.anchorAlias} />
      <header className={styles.engineeringHeading}><p className={styles.eyebrow}>04 / Design for the collision</p><h2 id="engineering-heading">An old form<br />must not win.</h2><p>Two tabs can disagree about the same application. The useful guarantee is simple: the older view cannot silently erase the newer edit.</p></header>
      <ConcurrencyScene />
      <div className={styles.lifecycleNote}><span className={styles.smallLabel}>Beyond the edit</span><p>Lifecycle changes use dedicated server-owned transitions. General edits cannot change status; archive remembers the prior state, and restore returns only to that state.</p><a className={styles.quietLink} href="#evidence-correctness">Inspect write and lifecycle evidence ↓</a></div>
      <section className={styles.recoveryStory} id="demo-lifecycle" aria-labelledby="recovery-title"><div className={styles.recoveryHeading}><p className={styles.eyebrow}>The next failure / entry</p><h3 id="recovery-title">A lost response.<br /><span>One ready workspace.</span></h3><p>If demo creation succeeds but its response is lost, the same-key retry should recover that ready workspace, not create another.</p></div><RetryScene /><p className={styles.provenance}>Temporary identity avoids signup, but public entry still needs throttling, monitoring, and cost controls. Failed provisioning never grants a usable session.</p></section>
    </section>

    <section className={styles.proofChapter} id="verification" data-chapter aria-labelledby="verification-heading">
      <span id="proof" className={styles.anchorAlias} />
      <div className={styles.proofComposition}><header><p className={styles.eyebrow}>05 / Challenge the promise</p><h2 id="verification-heading">Make the failure<br /><span>an assertion.</span></h2><p>The tests follow the product’s risks: misleading urgency, lost work, and unusable demo sessions. The evidence is a protected behavior, not just a large number of tests.</p></header><div className={styles.assertions} aria-label="Representative implemented test protections"><div><span className={styles.assertionMark}>✓ Meaning</span><p>14+ days in stage, no saved deadline</p><strong>Suggested review. No invented due date.</strong></div><div><span className={styles.assertionMark}>✓ State</span><p>Expected v1, stored v2</p><strong>409 conflict. Newer record survives.</strong></div><div><span className={styles.assertionMark}>✓ Recovery</span><p>Inject a demo-seeding failure</p><strong>FAILED + 503. No usable workspace.</strong></div></div></div>
      <aside className={styles.qualification} aria-label="Dated executed verification"><div><p className={styles.smallLabel}>Executed / October 7, 2026 UTC / 0ef61b7</p><strong>Five quality jobs passed.</strong><p>Source, builds, artifacts, and infrastructure synthesis checked. This run does not deploy HireFlux.</p></div><SourceLink href={evidence.run}>Inspect run #74</SourceLink></aside>

      <section className={styles.reflection} id="limits" aria-labelledby="limits-heading"><div><p className={styles.eyebrow}>What changed / what remains</p><h2 id="limits-heading">The lesson was<br /><span>where certainty ends.</span></h2><p>Putting four priority surfaces into one area was not enough. The next pass changed how that area read. Clear visual hierarchy and correct data semantics addressed different parts of the same problem—and the backend had to preserve both.</p></div><aside id="future" aria-labelledby="future-heading"><span className={styles.smallLabel}>Current continuation / 0ef61b7</span><h3 id="future-heading">Prepared for AWS.<br />Not operating on AWS.</h3><p>Preparation is committed and remotely qualified. The staging preflight remains blocked; no AWS stack or Amplify hosting is deployed.</p><p className={styles.nextStep}><strong>Next:</strong> resolve preflight, deploy staging, and validate the runtime. Candidate-outcome measurement remains future research.</p><SourceLink href={evidence.readiness}>Staging boundary</SourceLink></aside></section>

      <section className={styles.sourceJournal} id="sources" aria-labelledby="sources-heading"><div className={styles.journalHeading}><h3 id="sources-heading">The engineering notebook</h3><p>Primary story above. Contracts, alternatives, and proof below.</p></div>
        <p className={styles.provenance}>Product captures: Sep 29, 2026. Product/source references: <code>{demoCommit.slice(0, 7)}</code>. Current qualification and preparation: <code>{qualificationCommit.slice(0, 7)}</code>. No candidate user study or measured usability gain is claimed.</p>

        <details className={styles.disclosure} id="evidence-product"><summary>Home investigation, alternatives, and meaning contracts</summary><div className={styles.depthContent}><h4>Why the first redesign needed another pass</h4><p>Briefing hid peers behind expansion; Triage resembled another inbox; an Editorial command center risked inventing a winner. The selected hybrid permits a focal dated commitment only when evidence supports it, otherwise peers with compact classes and disclosure.</p><p>The audit combines source inspection and one observed fictional demo. Its constructed inconsistent-payload probe is not an observed empty workspace or a user-test result.</p><h4>The evidence ceiling</h4><p>Follow-ups and interviews keep saved dates; undated work stays undated. Employer ownership identifies whose move it is, but a saved candidate check-back can still become due. Unknown owners remain labeled unknown. A failed refresh or ownership-source lookup cannot produce an all-clear.</p><p>The operational source is bounded: up to 100 due follow-ups and five upcoming interviews. Disclosures reveal returned items, not an exhaustive search. Home’s 14-day Applied/Screening cue differs from Search Health’s 21/14/9-day patterns. Date labels can age on an open page; there is no midnight refresh timer.</p><div className={styles.sourceLinks}><SourceLink href={evidence.audit}>Stage 1 / audit</SourceLink><SourceLink href={evidence.informationArchitecture}>Stage 2 / IA</SourceLink><SourceLink href={evidence.compositionResearch}>Stage 3 / composition</SourceLink><SourceLink href={evidence.homeContract}>Home contract</SourceLink><SourceLink href={evidence.insights}>Server derivation</SourceLink><SourceLink href={evidence.decisionModel}>Presentation model</SourceLink><SourceLink href={evidence.decisionSection}>Decision component</SourceLink><SourceLink href={evidence.homeImplementation}>Implementation commit</SourceLink><SourceLink href={evidence.homeIteration}>Composition refinement</SourceLink></div></div></details>

        <details className={styles.disclosure} id="evidence-system"><summary>Architecture, ownership, and consistency boundaries</summary><div className={styles.depthContent}><h4>Identity before access</h4><p>A signed demo token determines owner scope; request bodies do not choose it. Owner-qualified keys prevent guessed IDs from addressing another workspace. Foreign and missing resources return 404.</p><h4>Product questions determine access patterns</h4><p>Normal requests use GetItem and Query rather than Scan. Sparse indexes support recent records, status views, and scheduled work. Canonical records, required projections, and activity are maintained by writes.</p><p>Index reads may lag; pagination is not a cross-request snapshot. Logical cursors are scoped to identity and filters. Canonical write conditions do not depend on index freshness.</p><div className={styles.sourceLinks}><SourceLink href={evidence.architecture}>September architecture</SourceLink><SourceLink href={evidence.accessPatterns}>Access patterns</SourceLink><SourceLink href={evidence.repositories}>Persistence adapter</SourceLink><SourceLink href={evidence.identity}>Identity verifier</SourceLink><SourceLink href={evidence.currentArchitecture}>Current architecture</SourceLink></div></div></details>

        <details className={styles.disclosure} id="evidence-correctness"><summary>Versioned writes, lifecycle, and retry failure handling</summary><div className={styles.depthContent}><div className={styles.payloadPair}><div><h4>B’s stale request</h4><pre><code>{'PATCH /api/v1/applications/{id}\n{\n  "expected_version": 1,\n  "company_name": "Northwind Labs"\n}'}</code></pre></div><div><h4>Required outcome</h4><pre><code>{'HTTP 409 Conflict\nStored version remains 2.\nNorthwind Robotics survives.'}</code></pre><p className={styles.provenance}>Explanatory outcome, not a verbatim response payload.</p></div></div><p>Status has a separate transition contract. Repeating the current status is a no-op. Archive retains the prior status; restore is restricted to that status. Required activity and projections commit with the mutation.</p><h4>Provisioning is a lifecycle, not a seed script</h4><p>Reserve PROVISIONING and a hashed optional idempotency key before seeding through ordinary services. READY enables replay of the original identity and expiry. Seed failure returns 503 and attempts FAILED marking plus best-effort cleanup; failed-key replay and in-progress provisioning return defined 409 responses.</p><p>The browser keeps tab-scoped demo sessions and clears identity-specific query state when switching workspaces. Signed-token expiry denies access; TTL does not promise exact-time deletion.</p><div className={styles.sourceLinks}><SourceLink href={evidence.concurrency}>Concurrency ADR</SourceLink><SourceLink href={evidence.services}>Application services</SourceLink><SourceLink href={evidence.policy}>Lifecycle policy</SourceLink><SourceLink href={evidence.demoAdr}>Isolation / retry ADR</SourceLink><SourceLink href={evidence.demo}>Provisioning service</SourceLink><SourceLink href={evidence.demoRepository}>Provisioning repository</SourceLink></div></div></details>

        <details className={styles.disclosure} id="evidence-verification"><summary>Test evidence, executed scope, and later preparation</summary><div className={styles.depthContent}><h4>Assertions and execution are different evidence</h4><p>September source links document behavior and its tests. October 7 run #74 at <code>{qualificationCommit.slice(0, 7)}</code> passed five jobs. Python 3.14 logs show 422 tests passed with one warning; frontend logs show 364 passed in 46 files. The infrastructure job passed 119 unit/topology tests and four real-artifact synthesis tests. The separate Lambda artifact probe also passed.</p><p>Static checks, builds, audits, and synthesis succeeded. This quality workflow does not run the Playwright Home suites or deploy the application. Browser and visual-regression test code is distinct from execution in this run.</p><p>The connected landing presentation has responsive geometry and a reduced-motion fallback, but it is secondary to the application decision system.</p><h4>Implemented preparation, planned runtime</h4><p>Current preparation includes durable local workspace boundaries, bounded export, resumable erasure, deterministic Lambda packaging, and CDK infrastructure/hosting definitions. The intended runtime uses Amplify, API Gateway, one Lambda/FastAPI application, DynamoDB, and CloudWatch. Cognito, attachments, and reminders remain later capabilities.</p><p>No production traffic, candidate outcome, or operational-security guarantee is established by these checks.</p><div className={styles.sourceLinks}><SourceLink href={evidence.decisionTests}>Meaning tests</SourceLink><SourceLink href={evidence.compositionTests}>Composition tests</SourceLink><SourceLink href={evidence.apiTests}>API / stale-write tests</SourceLink><SourceLink href={evidence.policyTests}>Policy tests</SourceLink><SourceLink href={evidence.demoTests}>Demo failure / retry tests</SourceLink><SourceLink href={evidence.sessionTests}>Session-switch tests</SourceLink><SourceLink href={evidence.browserTests}>Browser test code</SourceLink><SourceLink href={evidence.visualTests}>Visual test code</SourceLink><SourceLink href={evidence.landing}>Landing geometry</SourceLink><SourceLink href={evidence.quality}>Executed workflow</SourceLink><SourceLink href={evidence.run}>Run logs</SourceLink><SourceLink href={evidence.durable}>Durable-workspace ADR</SourceLink><SourceLink href={evidence.infrastructure}>Infrastructure preparation</SourceLink><SourceLink href={evidence.roadmap}>Roadmap</SourceLink></div></div></details>
      </section>

      <footer className={styles.closing}><h2>Discuss the decisions behind HireFlux.</h2><div><a href={`mailto:${site.email}`}>Talk about HireFlux <span aria-hidden="true">↗</span></a><SourceLink href={hireFlux.repository}>Explore the code</SourceLink><a href="/#work">Back to selected work</a></div></footer>
    </section>
  </article>
}
