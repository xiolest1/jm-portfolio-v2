import { useEffect, useState, type ReactNode } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import { chapters, demoCommit, evidence } from '../content/hirefluxCaseStudy'
import { SourceLink, EvidenceRail, ProductEvidence, MeaningPaths, SystemBlueprint, ConcurrencyDiagram, WriteExplorer, DemoLifecycle } from './HireFluxVisuals'
import styles from './HireFluxCaseStudy.module.css'

function ChapterHeading({ id, number, label, title, children }: { id: string; number: string; label: string; title: string; children: ReactNode }) {
  return <header className={styles.chapterHeading}><p className={styles.eyebrow}>{number} / {label}</p><h2 id={id}>{title}</h2><p>{children}</p></header>
}

function Tradeoff({ children }: { children: ReactNode }) {
  return <p className={styles.tradeoff}><span className={styles.smallLabel}>Tradeoff</span>{children}</p>
}

export function HireFluxCaseStudy() {
  const [activeChapter, setActiveChapter] = useState<string>('workflow')
  useEffect(() => {
    let disposed = false
    let frame = 0
    const alignHash = () => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
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
      const current = entries.filter(entry => entry.isIntersecting).at(-1)
      if (current) setActiveChapter(current.target.id)
    }, { rootMargin: '-12% 0px -72% 0px' })
    chapters.forEach(chapter => { const element = document.getElementById(chapter.id); if (element) observer.observe(element) })
    scheduleHash()
    window.addEventListener('hashchange', scheduleHash)
    window.addEventListener('pageshow', scheduleHash)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('hashchange', scheduleHash)
      window.removeEventListener('pageshow', scheduleHash)
    }
  }, [])
  const activeIndex = Math.max(0, chapters.findIndex(chapter => chapter.id === activeChapter))

  return <article className={styles.caseStudy} aria-label="HireFlux engineering case study">
    <section className={styles.hero} id="overview" aria-labelledby="overview-heading">
      <a className={styles.backLink} href="/#work">← Selected work</a>
      <div className={styles.heroComposition}>
        <div><p className={styles.eyebrow}>Personal project / built by Joan Morillo</p><h1 id="overview-heading">HireFlux</h1><p className={styles.dek}>Job-search records.<br /><span>Useful next steps.</span></p><p className={styles.heroSummary}>A full-stack candidate workspace for applications, interviews, and follow-ups. I built the frontend, backend, and data model to turn recorded state into actionable context—with explicit rules and honest limits.</p>
          <p className={styles.heroStatus}>Local demo · AWS runtime not deployed</p>
          <div className={styles.heroActions}><SourceLink href={hireFlux.repository}>Explore repository</SourceLink><a href="#workflow">Read the engineering story <span aria-hidden="true"> ↓</span></a></div>
        </div>
        <aside className={styles.heroFacts} aria-label="Project ownership, stack, and status"><dl>
          <div><dt>My ownership</dt><dd>Product decisions, frontend, backend, data design, and tests</dd></div>
          <div><dt>Implemented stack</dt><dd>React / TypeScript / Vite<br />FastAPI / DynamoDB Local</dd></div>
          <div><dt>Reviewed milestone</dt><dd>Local, isolated 24-hour demo<br /><span>September 2026 snapshot</span></dd></div>
          <div><dt>Deployment</dt><dd>AWS runtime not deployed.<br /><a href="#future">Later repository progress ↓</a></dd></div>
        </dl></aside>
      </div>
      <div className={styles.thesisLine}><span className={styles.smallLabel}>What this project demonstrates</span><p>Preserve meaning. Protect current state. Make failure explicit.</p></div>
      <div className={styles.scanPath}>
        <a href="#decision-model"><span>Product judgment</span><strong>A suggestion is not a deadline.</strong></a>
        <a href="#concurrency"><span>Backend correctness</span><strong>An old form cannot silently win.</strong></a>
        <a href="#demo-lifecycle"><span>Failure handling</span><strong>Same-key retries reuse a ready workspace.</strong></a>
      </div>
    </section>

    <nav className={styles.chapterNav} aria-label="Case study chapters"><span className={styles.navProgress} aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} / 05</span><div>
      {chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{chapter.label}</a>)}
    </div><span className={styles.srOnly}>Current question: {chapters[activeIndex].question}</span></nav>

    <section className={styles.chapter} id="workflow" data-chapter aria-labelledby="workflow-heading">
      <span id="product" className={styles.anchorAlias} />
      <ChapterHeading id="workflow-heading" number="01" label="Product / preserve meaning" title="A next step grounded in recorded facts.">A tracker can store an application and still leave the candidate asking: what needs my attention? HireFlux brings the saved next step, responsibility, follow-up date, and interview into one decision area.</ChapterHeading>
      <ol className={styles.workflowSteps} aria-label="Candidate workflow"><li><span>01 / Record</span><strong>Save the opportunity</strong><p>Application context and its current stage.</p></li><li><span>02 / Prepare</span><strong>Manage its next step</strong><p>Responsibility, recorded timing, and interviews.</p></li><li><span>03 / Return</span><strong>Use Home to orient</strong><p>See the recorded commitments and review cues.</p></li></ol>
      <h3 className={styles.productTakeaway}>One decision area. Different kinds of evidence.</h3>
      <ProductEvidence />
      <div className={styles.narrativeLead} id="action-semantics"><h3>The date can be certain.<br />The priority cannot.</h3><div><p>A saved date supports “overdue.” Time in a stage supports a review suggestion. Neither reveals how much the candidate values an opportunity, an unrecorded conversation, or an unknown owner.</p><p>The backend emits explicit action kinds; the frontend groups and qualifies them. That keeps the path from a saved fact to a visible prompt understandable.</p></div></div>
      <MeaningPaths />
      <Tradeoff>Home is a bounded view of recorded information. It helps the candidate choose; it cannot decide personal importance or certify that no unrecorded work exists.</Tradeoff>
      <details className={styles.disclosure}><summary>Inspect action meanings and the evidence ceiling</summary><div className={styles.depthContent}>
        <dl className={styles.meaningDefinitions}><div><dt>Dated commitment</dt><dd>Follow-up and interview kinds retain their saved dates. Missing responsibility is shown as unknown.</dd></div><div><dt>Undated candidate step</dt><dd><code>CANDIDATE_ACTION_UNDATED</code> remains useful work without being relabeled “due today.”</dd></div><div><dt>Stage-age suggestion</dt><dd><code>STALE_APPLICATION</code> uses 14+ days in Applied or Screening; it has no due date.</dd></div><div><dt>Waiting</dt><dd>An employer-owned next step means awaiting the employer, not candidate inaction.</dd></div><div><dt>Incomplete evidence</dt><dd>Failed refresh, partial data, or unresolved ownership remains partial—even with a cached snapshot.</dd></div></dl>
        <p>The source can return up to 100 due follow-ups and five upcoming interviews. Disclosure shows returned actions, not an exhaustive search. Home’s stage-age cue also differs from Search Health’s 21/14/9-day strategic patterns. No midnight timer updates date-based labels on a long-lived page.</p>
        <div className={styles.depthLinks}><SourceLink href={evidence.insights}>Server action derivation</SourceLink><SourceLink href={evidence.homeContract}>Bounded Home contract</SourceLink><SourceLink href={evidence.decisionTests}>Meaning tests</SourceLink></div>
      </div></details>
      <aside className={styles.iteration} aria-labelledby="iteration-title"><span className={styles.smallLabel}>Product iteration / diagnosed, not measured</span><h3 id="iteration-title">Give Home one clear decision responsibility.</h3><div className={styles.iterationPair}><div><span>Earlier composition</span><p>Several Home surfaces made competing claims about priority, using different sources and thresholds.</p></div><div><span>Implemented response</span><p>One decision area separates commitments from suggestions; analytics keeps its reporting role.</p></div></div><p className={styles.caption}>This is the documented response to a source/runtime audit, not a measured improvement in candidate outcomes or a historical screenshot comparison.</p></aside>
      <EvidenceRail><SourceLink href={evidence.decisionModel}>Presentation model</SourceLink><SourceLink href={evidence.audit}>Original Home diagnosis</SourceLink><SourceLink href={evidence.compositionTests}>Composition tests</SourceLink></EvidenceRail>
    </section>

    <section className={`${styles.chapter} ${styles.systemChapter}`} id="system" data-chapter aria-labelledby="system-heading">
      <ChapterHeading id="system-heading" number="02" label="Architecture / assign authority" title="The interface explains. The server decides.">The client presents the workspace. One FastAPI application owns identity, lifecycle policy, action derivation, and write rules. DynamoDB Local persists the owner-scoped state.</ChapterHeading>
      <SystemBlueprint />
      <div className={styles.narrativeLead}><h3>One application.<br />Clear internal boundaries.</h3><div><p>Routes call services, services depend on repository protocols, and DynamoDB adapters own keys and transactions. This separates product rules from storage details without introducing distributed services.</p><Tradeoff>The design carries projection and transaction maintenance inside the backend. A small local system still has consistency work to manage.</Tradeoff></div></div>
      <details className={styles.disclosure}><summary>Inspect data access, ownership, and consistency</summary><div className={styles.depthContent}>
        <h4>Ownership starts at verified identity</h4><p>Protected demo requests carry a signed token. The API derives the owner; request bodies do not choose it. Owner-qualified partitions prevent a guessed application ID from addressing another workspace. Missing and foreign records return 404.</p>
        <h4>Read patterns follow product questions</h4><p>Normal request paths use GetItem and Query, not Scan. Three sparse indexes support recent applications/interviews, status views, and outstanding scheduled work. Counters and required read projections are maintained by write operations.</p>
        <h4>Fast read models have a boundary</h4><p>Secondary-index views may temporarily lag a canonical write. Logical cursors are scoped to identity and filters; pagination is not a cross-request snapshot. Conditional writes protect canonical state independently of index freshness.</p>
        <div className={styles.depthLinks}><SourceLink href={evidence.accessPatterns}>Access-pattern inventory</SourceLink><SourceLink href={evidence.repositories}>DynamoDB adapter</SourceLink><SourceLink href={evidence.identity}>Demo identity verification</SourceLink></div>
      </div></details>
      <EvidenceRail><SourceLink href={evidence.architecture}>Architecture at the reviewed milestone</SourceLink><SourceLink href={evidence.apiTests}>API integration tests</SourceLink></EvidenceRail>
    </section>

    <section className={styles.chapter} id="engineering" data-chapter aria-labelledby="engineering-heading">
      <ChapterHeading id="engineering-heading" number="03" label="Correctness / protect the record" title="A stale form must not erase a newer edit.">A candidate can open the same application in two tabs. Accepting both forms unconditionally would let an older view overwrite newer work. HireFlux makes the saved version part of the write contract.</ChapterHeading>
      <span id="state-correctness" className={styles.anchorAlias} />
      <div id="concurrency"><ConcurrencyDiagram /></div>
      <div className={styles.decisionExplanation}><div><span className={styles.smallLabel}>Implemented mechanism</span><h3>Compare at the write boundary.</h3><p>Mutations carry <code>expected_version</code>. A persistence condition must match the canonical version before accepting a write. Lifecycle changes also enforce server-owned transition policy and commit required history and projections together.</p></div><div><Tradeoff>A conflict requires fresh state and a retry; HireFlux does not automatically merge the two edits. Transactional projections also add backend maintenance complexity.</Tradeoff><p className={styles.outcomeNote}>The guarantee is concrete: a stale modification receives HTTP 409 instead of silently becoming current.</p></div></div>
      <WriteExplorer />
      <details className={styles.disclosure}><summary>Inspect the write contract and lifecycle rules</summary><div className={styles.depthContent}>
        <div className={styles.payloadPair}><div><h4>B submits its old version</h4><pre><code>{'PATCH /api/v1/applications/{id}\n\n{\n  "expected_version": 1,\n  "company_name": "Stale edit"\n}'}</code></pre></div><div><h4>The server rejects it</h4><pre><code>{'HTTP 409 Conflict\n\nStored version: 2\nNewer record remains intact.'}</code></pre><p className={styles.caption}>Request example and explanatory response summary; not a full response payload.</p></div></div>
        <p>This is a conditional persistence operation, not an unprotected “read then check then write.” The API returns safe error envelopes rather than storage errors.</p>
        <p>General edits cannot change status. Dedicated transitions use server policy and <code>allowed_transitions</code>. Repeating the current status is a no-op; archive retains the prior status, and restore is restricted to that status.</p>
        <div className={styles.depthLinks}><SourceLink href={evidence.services}>Application service</SourceLink><SourceLink href={evidence.repositories}>Conditional persistence</SourceLink><SourceLink href={evidence.policy}>Lifecycle policy</SourceLink><SourceLink href={evidence.policyTests}>Policy tests</SourceLink></div>
      </div></details>
      <EvidenceRail><SourceLink href={evidence.apiTests}>Successful and stale-write test</SourceLink><SourceLink href={evidence.concurrency}>Concurrency / archive ADR</SourceLink></EvidenceRail>

      <section className={styles.recoveryStory} id="demo-lifecycle" aria-labelledby="recovery-title"><div className={styles.recoveryIntro}><span className={styles.smallLabel}>A supporting reliability decision</span><h3 id="recovery-title">A lost response should not create another workspace.</h3><p>The one-click demo is useful only if visitors are isolated and entry can recover predictably. A timeout can hide a successful creation; retrying the same key should find that workspace, not seed another.</p></div><DemoLifecycle />
        <div className={styles.lifetimeNote}><strong>24-hour access is an authorization rule.</strong><p>Signed-token expiry ends access. DynamoDB TTL is eventual cleanup—not a promise that all records disappear at exactly 24 hours.</p></div>
        <Tradeoff>Temporary entry avoids account/signup overhead. It is not a production identity solution; public provisioning still needs throttling, monitoring, and cost controls before deployment.</Tradeoff>
        <details className={styles.disclosure}><summary>Inspect provisioning failures and session isolation</summary><div className={styles.depthContent}><p>The service reserves PROVISIONING and the optional hashed idempotency key before seeding through ordinary services. READY is written only after successful seeding. Successful replay returns the original token, identity, and expiry.</p><p>Seed failure marks FAILED before a best-effort cleanup attempt and returns 503. Failed-key replay and in-progress provisioning produce defined 409 responses. The retained failure marker does not grant access.</p><p>The browser uses a tab-scoped signed session and clears identity-specific query state when switching workspaces. Another owner’s resources remain inaccessible through the API.</p><div className={styles.depthLinks}><SourceLink href={evidence.demo}>Provisioning service</SourceLink><SourceLink href={evidence.demoRepository}>Lifecycle repository</SourceLink><SourceLink href={evidence.demoAdr}>Isolation ADR</SourceLink><SourceLink href={evidence.sessionTests}>Session-switch tests</SourceLink></div></div></details>
        <EvidenceRail><SourceLink href={evidence.demoTests}>Retry / failure integration tests</SourceLink><SourceLink href={evidence.identity}>Signed identity</SourceLink></EvidenceRail>
      </section>
    </section>

    <section className={`${styles.chapter} ${styles.proofChapter}`} id="verification" data-chapter aria-labelledby="verification-heading">
      <span id="proof" className={styles.anchorAlias} />
      <ChapterHeading id="verification-heading" number="04" label="Proof / check the failure paths" title="Test the behaviors the product depends on.">Tests exercise meaning, ownership, state changes, and recovery. The pinned quality run executed backend and frontend tests alongside static, build, and supply-chain checks.</ChapterHeading>
      <div className={styles.behaviorProof}><div><span className={styles.proofMark}>01 / Meaning</span><h3>No invented urgency.</h3><p>Undated work stays undated; stage-age review stays suggested; incomplete evidence stays partial.</p><SourceLink href={evidence.decisionTests}>Presentation assertions</SourceLink></div><div><span className={styles.proofMark}>02 / Correctness</span><h3>No silent stale overwrite.</h3><p>A matching version succeeds, an old version conflicts, and lifecycle rules constrain archive and restore.</p><SourceLink href={evidence.apiTests}>API assertions</SourceLink></div><div><span className={styles.proofMark}>03 / Isolation + recovery</span><h3>No shared visitor workspace.</h3><p>Owner scope, successful replay, and injected seed failure are covered in integration tests.</p><SourceLink href={evidence.demoTests}>Demo assertions</SourceLink></div></div>
      <div className={styles.executedProof}><div><p className={styles.smallLabel}>Executed / quality run 36665312626</p><h3>One pinned milestone.<br />Reproducible evidence.</h3><p>September 30, 2026 UTC<br />Commit <code>533cee1</code> · both jobs passed</p><SourceLink href={evidence.run}>Inspect the GitHub run</SourceLink></div><dl className={styles.testResults}><div><dt>Backend / pytest</dt><dd><strong>267</strong><span>passed · 1 warning</span></dd></div><div><dt>Frontend / Vitest</dt><dd><strong>322</strong><span>passed · 45 test files</span></dd></div></dl></div>
      <p className={styles.proofBoundary}>These are historical results at <code>{demoCommit.slice(0, 7)}</code>, not new tests of the latest HireFlux HEAD. The linked workflow runs quality checks; it does not deploy the application.</p>
      <details className={styles.disclosure}><summary>Inspect the verification scope and remaining checks</summary><div className={styles.depthContent}><p>The run also completed Ruff, Mypy, frontend lint/type checking and build, dependency audits, CycloneDX SBOM generation, and OpenAPI generation. Passing checks are useful evidence, not a production-security guarantee.</p><p>Playwright Home and visual-regression tests exist in this snapshot. They were not executed by this cited quality workflow; their existence is not a browser-validation result.</p><p>The connected public landing workspace has responsive geometry, a normal-flow reduced-motion fallback, and test coverage. That presentation work is secondary to the authenticated application’s behavior.</p><div className={styles.depthLinks}><SourceLink href={evidence.quality}>Exact workflow</SourceLink><SourceLink href={evidence.browserTests}>Home browser test code</SourceLink><SourceLink href={evidence.visualTests}>Visual test code</SourceLink><SourceLink href={evidence.landing}>Landing geometry</SourceLink></div></div></details>
    </section>

    <section className={styles.chapter} id="limits" data-chapter aria-labelledby="limits-heading">
      <ChapterHeading id="limits-heading" number="05" label="Boundaries / state what remains" title="Local evidence. Explicit limits. A defined next step.">This case study follows the reviewed demo milestone. It demonstrates implemented behavior and executed checks; it does not establish production readiness, candidate outcomes, or an AWS deployment.</ChapterHeading>
      <dl className={styles.limitList}><div><dt>Local runtime</dt><dd><p>No deployed AWS runtime or production-traffic evidence. The reviewed entry point is a temporary, isolated demo.</p><span>Next: deploy and validate the intended staging environment.</span></dd></div><div><dt>Bounded interpretation</dt><dd><p>Unrecorded work and personal priority remain unknowable. Operational results are capped; date labels can age on an open page.</p><span>Next: validate candidate use and time-boundary behavior.</span></dd></div><div><dt>Consistency + validation</dt><dd><p>Index reads can lag; multi-page reads are not a snapshot. The cited run does not execute the browser suites.</p><span>Next: run explicit browser checks and exercise production failure conditions.</span></dd></div></dl>
      <aside className={styles.futureDirection} id="future" aria-labelledby="future-heading"><span className={styles.smallLabel}>Committed continuation / deployment still planned</span><h3 id="future-heading">Prepare the same application for AWS.</h3><p className={styles.futureIntro}>The repository has progressed beyond the September demo snapshot. Preparation code exists; an operating cloud system does not.</p><div className={styles.futureColumns}><div><h4>Implemented preparation</h4><p>Later work includes durable local workspace/session boundaries, inventory and erasure, deterministic Lambda packaging, and CDK definitions for DynamoDB, Lambda, IAM, signing secrets, and the HTTP API.</p><p className={styles.caption}>Source-reviewed at <code>645e834</code>. These additions are not covered by the September test counts above.</p></div><div><h4>Planned deployment</h4><p>Amplify hosting → API Gateway → Lambda / FastAPI / Mangum → DynamoDB, with CloudWatch. At the linked revision, frontend hosting definitions and staging deployment remain future steps.</p><p className={styles.caption}>Cognito, attachments, and reminders are later capabilities. Nothing here represents a deployed production service.</p></div></div><div className={styles.depthLinks}><SourceLink href={evidence.infrastructure}>Committed infrastructure scope</SourceLink><SourceLink href={evidence.durable}>Durable workspace ADR</SourceLink><SourceLink href={evidence.roadmap}>Next milestones</SourceLink></div></aside>
      <details className={`${styles.disclosure} ${styles.sourceMap}`}><summary>Open the technical source map</summary><div className={styles.depthContent}><p>Demo behavior references use <code>533cee1</code>, matching the cited quality run. Continuation references use <code>645e834</code>. Each link opens that revision rather than a moving main branch.</p><div className={styles.sourceGroups}><div><h4>Product reasoning</h4><SourceLink href={evidence.homeContract}>Home implementation contract</SourceLink><SourceLink href={evidence.insights}>Server action derivation</SourceLink><SourceLink href={evidence.decisionModel}>Home presentation model</SourceLink></div><div><h4>System + correctness</h4><SourceLink href={evidence.architecture}>Demo architecture</SourceLink><SourceLink href={evidence.accessPatterns}>Data access / consistency</SourceLink><SourceLink href={evidence.concurrency}>Concurrency decision</SourceLink></div><div><h4>Recovery + verification</h4><SourceLink href={evidence.demoAdr}>Demo isolation decision</SourceLink><SourceLink href={evidence.demoTests}>Provisioning tests</SourceLink><SourceLink href={evidence.quality}>Pinned quality workflow</SourceLink></div><div><h4>Repository continuation</h4><SourceLink href={evidence.currentArchitecture}>Later architecture</SourceLink><SourceLink href={evidence.infrastructure}>Undeployed infrastructure</SourceLink><SourceLink href={evidence.roadmap}>Roadmap</SourceLink></div></div></div></details>
      <footer className={styles.closing}><div><p className={styles.smallLabel}>Meaning / correctness / recovery</p><h2>That is the engineering behind the next step.</h2></div><div><a href={`mailto:${site.email}`}>Talk about the engineering <span aria-hidden="true">↗</span></a><SourceLink href={hireFlux.repository}>Explore HireFlux</SourceLink><a href="/#work">Back to selected work <span aria-hidden="true">←</span></a></div></footer>
    </section>
  </article>
}
