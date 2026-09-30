import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import styles from './HireFluxCaseStudy.module.css'

const commit = '533cee182dc1a20ef7edb45db5d2c0ee21635dfd'
const source = (path: string) => `${hireFlux.repository}/blob/${commit}/${path}`
const evidence = {
  architecture: source('ARCHITECTURE.md'),
  insights: source('backend/src/hireflux_backend/application/insights.py'),
  decisionModel: source('frontend/src/features/workspace/homeDecisionModel.ts'),
  decisionTests: source('frontend/src/features/workspace/homeDecisionModel.test.ts'),
  compositionTests: source('frontend/src/pages/HomeComposition.test.tsx'),
  audit: source('docs/home-stage-1-cognition-information-audit.md'),
  homeContract: source('docs/home-implementation-contract.md'),
  policy: source('backend/src/hireflux_backend/domain/status_policy.py'),
  policyTests: source('backend/tests/unit/test_status_policy.py'),
  services: source('backend/src/hireflux_backend/application/services.py'),
  apiTests: source('backend/tests/integration/test_api_flow.py'),
  repositories: source('backend/src/hireflux_backend/infrastructure/dynamodb/repositories.py'),
  concurrency: source('docs/adr/0003-archive-and-optimistic-concurrency.md'),
  accessPatterns: source('docs/dynamodb-access-patterns.md'),
  demo: source('backend/src/hireflux_backend/application/demo_sessions.py'),
  demoRepository: source('backend/src/hireflux_backend/infrastructure/dynamodb/demo_workspace_repository.py'),
  demoTests: source('backend/tests/integration/test_demo_sessions.py'),
  identity: source('backend/src/hireflux_backend/auth/demo.py'),
  sessionTests: source('frontend/src/pages/DemoSessionFlow.test.tsx'),
  landing: source('frontend/src/features/landing/useConnectedStoryArchitecture.ts'),
  browserTests: source('frontend/e2e/home-redesign.spec.ts'),
  visualTests: source('frontend/e2e/visual-regression.spec.ts'),
  quality: source('.github/workflows/quality.yml'),
  run: `${hireFlux.repository}/actions/runs/36665312626`,
  roadmap: source('docs/roadmap.md'),
}
const chapters = [
  { id: 'overview', label: 'Overview' }, { id: 'workflow', label: 'Workflow' },
  { id: 'system', label: 'System' }, { id: 'engineering', label: 'Engineering' },
  { id: 'verification', label: 'Verification' }, { id: 'limits', label: 'Limits' },
]

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">{'\u00a0'}↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

function SectionHeading({ id, number, label, title, children }: { id: string; number: string; label: string; title: string; children: ReactNode }) {
  return <header className={styles.sectionHeading}><p className={styles.eyebrow}>{number} / {label}</p><h2 id={id}>{title}</h2><p>{children}</p></header>
}

function ProductCrop({ image, alt, x, y, width, height, children }: {
  image: string; alt: string; x: number; y: number; width: number; height: number; children?: ReactNode
}) {
  const cropStyle = {
    '--crop-ratio': `${width} / ${height}`, '--image-width': `${1440 / width * 100}%`,
    '--crop-x': `${-x / 1440 * 100}%`, '--crop-y': `${-y / 900 * 100}%`,
  } as CSSProperties
  return <div className={styles.productCrop} style={cropStyle}><img src={image} alt={alt} width="1440" height="900" />{children}</div>
}

function DiagramIcon({ kind }: { kind: 'client' | 'api' | 'data' }) {
  return <svg className={styles.diagramIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
    {kind === 'client' && <><rect x="5" y="8" width="38" height="27" rx="3" /><path d="M5 15h38M17 42h14M24 35v7" /><circle cx="10" cy="11.5" r=".7" fill="currentColor" stroke="none" /></>}
    {kind === 'api' && <><rect x="9" y="5" width="30" height="10" rx="2" /><rect x="9" y="19" width="30" height="10" rx="2" /><rect x="9" y="33" width="30" height="10" rx="2" /><path d="M15 10h3M15 24h3M15 38h3M24 15v4M24 29v4" /></>}
    {kind === 'data' && <><ellipse cx="24" cy="10" rx="17" ry="6" /><path d="M7 10v27c0 3.3 7.6 6 17 6s17-2.7 17-6V10M7 23c0 3.3 7.6 6 17 6s17-2.7 17-6" /></>}
  </svg>
}

export function HireFluxCaseStudy() {
  const [activeChapter, setActiveChapter] = useState('overview')
  useEffect(() => {
    let active = true
    let hashFrame = 0
    const alignHash = () => {
      if (!active || !window.location.hash) return
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      const chapter = target?.closest<HTMLElement>('section[data-chapter]')
      if (chapter) setActiveChapter(chapter.id)
    }
    // Align after font layout and the browser's initial scroll restoration.
    const scheduleHashAlignment = () => {
      void document.fonts.ready.then(() => {
        if (!active) return
        cancelAnimationFrame(hashFrame)
        hashFrame = requestAnimationFrame(() => { hashFrame = requestAnimationFrame(alignHash) })
      })
    }
    scheduleHashAlignment()
    window.addEventListener('hashchange', scheduleHashAlignment)
    window.addEventListener('pageshow', scheduleHashAlignment)
    const visible = new Set<string>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id))
      const current = [...chapters].reverse().find(chapter => visible.has(chapter.id))
      if (current) setActiveChapter(current.id)
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 })
    chapters.forEach(chapter => { const node = document.getElementById(chapter.id); if (node) observer.observe(node) })
    return () => {
      active = false
      cancelAnimationFrame(hashFrame)
      observer.disconnect()
      window.removeEventListener('hashchange', scheduleHashAlignment)
      window.removeEventListener('pageshow', scheduleHashAlignment)
    }
  }, [])

  return (
    <article className={styles.caseStudy}>
      <section id="overview" data-chapter aria-labelledby="overview-heading" className={styles.overview}>
        <header className={styles.hero}>
          <div>
            <a className={styles.backLink} href="/#work">← Selected work</a>
            <p className={styles.eyebrow}>01 / Personal project · Full-stack engineering</p>
            <h1 id="overview-heading">HireFlux</h1>
            <p className={styles.dek}>A candidate workspace that keeps the next step clear.</p>
            <p className={styles.heroContext}>Applications, interviews, and follow-ups become actionable context—with recorded commitments, suggestions, and incomplete information kept distinct.</p>
            <div className={styles.heroActions}><SourceLink href={hireFlux.repository}>View repository</SourceLink><a href="#engineering">Explore the engineering <span aria-hidden="true">↓</span></a></div>
          </div>
          <dl className={styles.overviewFacts}>
            <div><dt>My contribution</dt><dd>React / TypeScript client, FastAPI backend, and data layer</dd></div>
            <div><dt>Current implementation</dt><dd>Local, isolated 24-hour demo<br /><span>Vite · FastAPI · DynamoDB Local</span></dd></div>
            <div><dt>Next direction</dt><dd>AWS planned / not deployed</dd></div>
          </dl>
        </header>

        <figure className={`${styles.productStage} ${styles.breakout}`}>
          <div className={styles.stageHeader}><span className={styles.smallLabel}>The product / Action Center</span><span>Fictional local workspace · Sep 29, 2026</span></div>
          <div className={styles.stageComposition}>
            <div className={styles.desktopCapture}>
              <ProductCrop image="/projects/hireflux-home-light.png" alt="Action Center shows Northwind's overdue follow-up, Atlas due today, and Orbit's interview, with Evergreen's stage-age review suggestion kept separate." x={280} y={205} width={1120} height={485}>
                <span className={`${styles.marker} ${styles.commitmentMarker}`} aria-hidden="true">1</span><span className={`${styles.marker} ${styles.interviewMarker}`} aria-hidden="true">2</span><span className={`${styles.marker} ${styles.suggestionMarker}`} aria-hidden="true">3</span>
              </ProductCrop>
            </div>
            <div className={styles.mobileCapture}><img src="/projects/hireflux-home-mobile.png" alt="Real mobile Home capture: recorded follow-ups and the scheduled interview stack as peer commitment groups." width="390" height="844" /></div>
            <ol className={styles.annotations}>
              <li><span>1</span><div><strong>Recorded commitment</strong><p>A saved follow-up date supports “overdue.” Unknown ownership stays unknown.</p></div></li>
              <li><span>2</span><div><strong>Scheduled interview</strong><p>Recorded conversations remain visible beside follow-ups.</p></div></li>
              <li><span>3</span><div><strong>Suggested review</strong><p>Time in stage prompts a review, without inventing a deadline.</p></div></li>
            </ol>
          </div>
          <figcaption>One decision area, with commitments and suggestions visibly separated. The numbered markers identify the desktop crop; the mobile capture shows the commitment order. <SourceLink href="/projects/hireflux-home-light.png">Original Home capture</SourceLink></figcaption>
        </figure>

        <div className={styles.snapshot} aria-label="Engineering snapshot">
          <p className={styles.smallLabel}>Engineering snapshot</p>
          <div className={styles.snapshotGrid}>
            <a href="#action-semantics"><span>Product logic</span><strong>Dates ≠ suggestions</strong><p>Actions preserve timing and uncertainty.</p></a>
            <a href="#state-correctness"><span>State correctness</span><strong>v1 → v2 / 409</strong><p>Versioned writes reject stale changes.</p></a>
            <a href="#demo-lifecycle"><span>Demo reliability</span><strong>Same key ↺ workspace</strong><p>Successful retries return the ready workspace.</p></a>
          </div>
          <div className={styles.metadataRail}><span>React + TypeScript · FastAPI · DynamoDB Local</span><SourceLink href={evidence.run}>CI 533cee1 · 267 backend / 322 frontend tests passed</SourceLink></div>
        </div>
      </section>

      <nav className={styles.jumpNav} aria-label="HireFlux case study chapters">
        {chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? 'location' : undefined}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{chapter.label}</a>)}
      </nav>

      <section className={`${styles.section} ${styles.workflow}`} id="workflow" data-chapter aria-labelledby="workflow-heading">
        <span className={styles.anchorAlias} id="product" />
        <SectionHeading id="workflow-heading" number="02" label="Workflow" title="Keep the meaning from record to action.">
          In the fictional September 29 workspace, Northwind’s September 26 check-back is overdue. Atlas is due today, and Orbit has an October 1 interview. The candidate can review each opportunity’s context before choosing what to do.
        </SectionHeading>
        <div className={`${styles.transformationCanvas} ${styles.breakout}`} id="decision-model">
          <div className={styles.transformationHeader}><div><p className={styles.smallLabel}>Worked example / Northwind</p><h3>A saved date becomes a commitment.</h3></div><figure className={styles.recordSnippet}><ProductCrop image="/projects/hireflux-opportunity-dark.png" alt="Check back: Sep 26, 2026, saved on Northwind's application detail page." x={564} y={286} width={250} height={32} /><figcaption>Real application record · <SourceLink href="/projects/hireflux-opportunity-dark.png">Detail capture</SourceLink></figcaption></figure></div>
          <ol className={styles.transformation}>
            <li><span className={styles.smallLabel}>01 / Input</span><strong className={styles.inputDate}>Sep 26</strong><p>Saved follow-up<br />Owner unknown</p></li>
            <li><span className={styles.smallLabel}>02 / Server interpretation</span><strong>Date &lt; local today</strong><p>Compare the recorded date in the workspace’s calendar.</p></li>
            <li><span className={styles.smallLabel}>03 / Action contract</span><code>FOLLOW_UP_OVERDUE</code><p>Retain the date and unknown owner.</p></li>
            <li><span className={styles.smallLabel}>04 / Presentation</span><strong>Overdue follow-up</strong><p>Owner not recorded.<br />Open the application’s context.</p></li>
          </ol>
          <div className={styles.suggestionContrast}><span className={styles.smallLabel}>A separate meaning</span><strong>14+ days in Applied / Screening</strong><span aria-hidden="true">→</span><code>STALE_APPLICATION</code><span aria-hidden="true">→</span><p><strong>Suggested review</strong><span>No recorded deadline</span></p></div>
          <p className={styles.diagramCaption}>Reference day: September 29, 2026. Recorded dates create commitments; time in stage creates a qualified review cue. This is not a predictive ranking of opportunities.</p>
        </div>
        <p className={styles.evidenceLine}><SourceLink href={evidence.insights}>Server derivation</SourceLink><SourceLink href={evidence.decisionModel}>Presentation model</SourceLink></p>
      </section>

      <section className={`${styles.section} ${styles.system}`} id="system" data-chapter aria-labelledby="system-heading">
        <SectionHeading id="system-heading" number="03" label="Current system" title="One API owns the rules.">
          React presents the workspace. A single FastAPI application validates identity, derives actions, and enforces lifecycle rules. DynamoDB Local stores the owner-scoped records and projections.
        </SectionHeading>
        <figure className={`${styles.blueprint} ${styles.breakout}`}>
          <div className={styles.canvasHeading}><span className={styles.smallLabel}>Current system / local execution</span><span>Client → application → persistence</span></div>
          <div className={styles.systemDiagram}>
            <div className={styles.clientBoundary}><DiagramIcon kind="client" /><p className={styles.smallLabel}>Candidate / browser</p><h3>React + TypeScript</h3><p>Forms, product views, validated API responses, and server-state caching.</p><div className={styles.identityNote}><span>Protected requests</span><strong>Signed demo token</strong></div></div>
            <div className={styles.connector}><span>HTTP / JSON</span><i aria-hidden="true" /></div>
            <div className={styles.apiBoundary}><div className={styles.apiTitle}><DiagramIcon kind="api" /><div><p className={styles.smallLabel}>One application boundary</p><h3>FastAPI</h3></div></div><ol><li><span>01</span><div><strong>Routes + verified identity</strong><p>Validate input; derive the owner from the token.</p></div></li><li><span>02</span><div><strong>Application services</strong><p>Coordinate actions, lifecycle work, and persistence.</p></div></li><li><span>03</span><div><strong>Domain policy</strong><p>Allowed transitions and expected-version rules.</p></div></li><li><span>04</span><div><strong>Repository boundary / adapters</strong><p>Scoped queries and conditional transactions.</p></div></li></ol></div>
            <div className={styles.connector}><span>GetItem / Query<br />Transactions</span><i aria-hidden="true" /></div>
            <div className={styles.storeBoundary}><DiagramIcon kind="data" /><p className={styles.smallLabel}>Local data store</p><h3>DynamoDB Local</h3><p>Applications, notes, interviews, activity, read projections, and counters.</p><div className={styles.identityNote}><span>Temporary workspace</span><strong>Identity + expiry metadata</strong></div></div>
          </div>
          <figcaption>The FastAPI layers run inside one application. Signed identity scopes access; another owner’s record returns 404. Planned AWS services are outside this implemented system.</figcaption>
        </figure>
        <details className={styles.disclosure}><summary>Inspect the data-access and consistency tradeoffs</summary><div><p>Normal request paths use keyed reads and queries rather than table scans. Sparse indexes support update, status, and scheduling views; transactions maintain canonical records and required projections together.</p><p>Index reads are eventually consistent. Cursor pagination is best effort while records change, so it is not a snapshot guarantee. Canonical reads and version conditions protect writes; they do not make every list immediately consistent.</p><p className={styles.evidenceLine}><SourceLink href={evidence.accessPatterns}>Access patterns</SourceLink><SourceLink href={evidence.repositories}>Data adapter</SourceLink></p></div></details>
        <p className={styles.evidenceLine}><SourceLink href={evidence.architecture}>Architecture</SourceLink><SourceLink href={evidence.apiTests}>Owner-scope API tests</SourceLink></p>
      </section>

      <section className={`${styles.section} ${styles.engineering}`} id="engineering" data-chapter aria-labelledby="engineering-heading">
        <SectionHeading id="engineering-heading" number="04" label="Engineering" title="Meaning. Correctness. Recovery.">Three decisions connect the product experience to backend behavior. Each has an explicit failure risk, mechanism, tradeoff, and source.</SectionHeading>
        <article className={styles.semanticsStory} id="action-semantics">
          <div className={styles.storyText}><p className={styles.smallLabel}>A / Action semantics</p><h3>A suggestion must not look like a deadline.</h3><p><strong>Risk.</strong> Competing Home surfaces gave undated work and stage-age cues deadline-like emphasis.</p><p><strong>Decision + mechanism.</strong> Server-derived action kinds feed an explicit frontend presentation model. It separates commitments, suggestions, and incomplete information while keeping peer commitments visible.</p><p><strong>Consequence.</strong> The candidate can see why an action exists. Partial data cannot become an “all clear.”</p><p className={styles.tradeoff}><strong>Tradeoff.</strong> Home is a bounded orientation surface. It cannot know unrecorded obligations or choose the candidate’s priorities.</p><p className={styles.evidenceLine}><SourceLink href={evidence.homeContract}>Behavior contract</SourceLink><SourceLink href={evidence.decisionTests}>Meaning and state tests</SourceLink></p></div>
          <div className={styles.semanticVisual}>
            <dl className={styles.meaningComparison}>
              <div className={styles.recordedMeaning}><dt>Recorded</dt><dd><strong>Overdue follow-up</strong><span>Sep 26 is a saved date.</span><code>FOLLOW_UP_OVERDUE</code></dd></div>
              <div className={styles.suggestedMeaning}><dt>Suggested</dt><dd><strong>Review this application</strong><span>14+ days in an eligible stage; no deadline.</span><code>STALE_APPLICATION</code></dd></div>
              <div className={styles.unknownMeaning}><dt>Unknown</dt><dd><strong>Partial view</strong><span>Missing or failed data remains uncertainty.</span></dd></div>
            </dl>
            <dl className={styles.supportingMeanings}><div><dt>Undated candidate work</dt><dd>Useful next step, no invented due date.</dd></div><div><dt>Waiting on an employer</dt><dd>Employer-owned steps are distinct from candidate inaction.</dd></div></dl>
          </div>
        </article>

        <article className={styles.concurrencyStory} id="state-correctness">
          <header className={styles.storyHeading}><p className={styles.smallLabel}>B / Stale-write protection</p><h3>Two tabs. One current version.</h3><p>Both clients can read version 1. Once A saves version 2, B’s old form must not overwrite it.</p></header>
          <figure className={`${styles.raceCanvas} ${styles.breakout}`}>
            <p className={styles.readContext}>Same application · same starting version</p>
            <div className={styles.readClients}><div><span className={styles.clientLetter}>A</span><p>Client A reads <strong>v1</strong></p></div><div><span className={styles.clientLetter}>B</span><p>Client B reads <strong>v1</strong></p></div></div>
            <ol className={styles.raceSequence}>
              <li><div className={styles.raceClient}><span className={styles.clientLetter}>A</span><span>First save</span></div><div className={styles.writeRequest}><span className={styles.smallLabel}>PATCH</span><code>expected_version: 1</code></div><div className={styles.versionGate}><span>Stored v1 = expected v1</span><strong>Conditional write succeeds</strong></div><div className={styles.acceptedResult}><span className={styles.smallLabel}>HTTP 200 / accepted</span><strong>v2</strong><span>New version saved</span></div></li>
              <li><div className={styles.raceClient}><span className={styles.clientLetter}>B</span><span>Stale save</span></div><div className={styles.writeRequest}><span className={styles.smallLabel}>PATCH</span><code>expected_version: 1</code></div><div className={styles.versionGate}><span>Stored v2 ≠ expected v1</span><strong>Conditional write rejected</strong></div><div className={styles.conflictResult}><span className={styles.smallLabel}>HTTP 409</span><strong>Conflict</strong><span>Stored v2 retained</span></div></li>
            </ol>
            <figcaption>Representative API-test sequence. The server rejects the stale modification; B must refresh before retrying its change.</figcaption>
          </figure>
          <div className={styles.decisionNotes}><p><strong>Decision + mechanism.</strong> The server owns transition policy and checks <code>expected_version</code>. Conditional transactions protect the canonical record and required activity/projection updates. Client-side validation cannot protect a concurrent write.</p><p><strong>Consequence + tradeoff.</strong> A newer edit survives a stale request. Conflict recovery and projection maintenance add complexity. Archive preserves the previous status so restoration has a defined destination.</p></div>
          <details className={styles.disclosure}><summary>Inspect the stale request and error contract</summary><div className={styles.payloadGrid}><div><p className={styles.smallLabel}>Representative request / fictional ID</p><pre><code>{'PATCH /api/v1/applications/{id}\n\n{\n  "expected_version": 1,\n  "company_name": "Stale edit"\n}'}</code></pre></div><div><p className={styles.smallLabel}>409 response / abridged</p><pre><code>{'{\n  "error": {\n    "code": "CONFLICT",\n    "message": "…",\n    "request_id": "…"\n  }\n}'}</code></pre></div><p className={styles.payloadNote}>The API-flow test saves version 2, then submits version 1 and asserts HTTP 409. Message and request ID are omitted here. Status changes use a dedicated endpoint.</p></div></details>
          <p className={styles.evidenceLine}><SourceLink href={evidence.apiTests}>Stale-write API test</SourceLink><SourceLink href={evidence.policyTests}>Transition tests</SourceLink><SourceLink href={evidence.concurrency}>Concurrency ADR</SourceLink><SourceLink href={evidence.repositories}>Conditional transactions</SourceLink></p>
        </article>

        <article className={styles.demoStory} id="demo-lifecycle">
          <header className={styles.storyHeading}><p className={styles.smallLabel}>C / Retry-safe temporary demo</p><h3>One key. The same ready workspace.</h3><p>A lost response can repeat provisioning; a seed failure can leave partial records. The demo needs a lifecycle as well as fictional data.</p></header>
          <div className={styles.demoComposition}>
            <figure className={styles.lifecycleCanvas}>
              <p className={styles.smallLabel}>Implemented / provisioning lifecycle</p>
              <ol className={styles.lifecycle}><li><span className={styles.stateStep}>Request + reserve</span><strong>PROVISIONING</strong><p>Bind the workspace and idempotency key before creating records.</p></li><li><span className={styles.stateStep}>Seed complete</span><strong>READY</strong><p>Return the signed session after fictional data is ready.</p></li><li><span className={styles.stateStep}>Successful same-key retry</span><strong>SAME WORKSPACE</strong><p>Return its original identity and expiry.</p></li></ol>
              <div className={styles.failurePath}><span className={styles.smallLabel}>Failure branch / best effort</span><p><strong>Seed failure</strong><span aria-hidden="true"> → </span><strong>FAILED marker</strong><span aria-hidden="true"> → </span>cleanup attempt</p><span>Initial failure: 503. Failed-key replay: 409. In-progress provisioning: defined 409 response.</span></div>
              <figcaption>Reserve before seeding; expose only a ready workspace. Successful replay reuses the original session rather than seeding an unrelated second workspace.</figcaption>
            </figure>
            <div className={styles.demoExplanation}><p><strong>Decision + mechanism.</strong> Reserve the owner and key first; transition the workspace after seeding. The verified token supplies owner scope, and the frontend clears server-state cache when identity changes.</p><p><strong>Consequence.</strong> Retry behavior is defined across success, in-progress work, and failure.</p><p className={styles.tradeoff}><strong>Tradeoff.</strong> Failed provisioning uses best-effort cleanup and a failure marker. The contract is for a temporary demo, not persistent accounts.</p></div>
          </div>
          <div className={styles.expiryDistinction}><div><p className={styles.smallLabel}>Authorization / 24 hours</p><h4>Expired token → access denied</h4><p>The API denies access even if records still exist.</p></div><span className={styles.expirySeparator} aria-hidden="true">≠</span><div><p className={styles.smallLabel}>Storage / separate lifecycle</p><h4>TTL metadata → cleanup eligibility</h4><p>Expiry metadata prepares records for TTL cleanup. It does not prove physical deletion in the local demo or guarantee deletion at token expiry.</p></div></div>
          <p className={styles.evidenceLine}><SourceLink href={evidence.demoTests}>Replay, failure, isolation tests</SourceLink><SourceLink href={evidence.demoRepository}>Reservation states</SourceLink><SourceLink href={evidence.identity}>Token verification</SourceLink><SourceLink href={evidence.sessionTests}>Frontend session tests</SourceLink></p>
        </article>
      </section>

      <section className={`${styles.section} ${styles.verification}`} id="verification" data-chapter aria-labelledby="verification-heading">
        <span className={styles.anchorAlias} id="proof" />
        <SectionHeading id="verification-heading" number="05" label="Verification" title="Checks tied to behavior.">Executed evidence at commit 533cee1. The passing workflow covers these tests and quality checks; deployment remains future work.</SectionHeading>
        <div className={`${styles.proofCanvas} ${styles.breakout}`}>
          <div className={styles.verifiedRun}><div><p className={styles.smallLabel}>Verified / GitHub Actions CI</p><h3>Quality run 36665312626</h3><p>September 30, 2026 UTC · commit <code>533cee1</code></p><p className={styles.evidenceLine}><SourceLink href={evidence.run}>Passing execution</SourceLink><SourceLink href={`${hireFlux.repository}/commit/${commit}`}>Pinned commit</SourceLink></p></div><dl className={styles.testResults}><div><dt>Backend / pytest</dt><dd><strong>267</strong><span>passed · 1 warning</span></dd></div><div><dt>Frontend / Vitest</dt><dd><strong>322</strong><span>passed · 45 files</span></dd></div></dl></div>
          <div className={styles.evidenceLedger} role="table" aria-label="Implemented behavior and executed verification">
            <div className={styles.ledgerHeader} role="row"><span role="columnheader">Behavior</span><span role="columnheader">Protected by / source</span><span role="columnheader">Result in pinned run</span></div>
            <div role="row"><strong role="rowheader">Action meaning</strong><div role="cell"><SourceLink href={evidence.decisionTests}>Model tests</SourceLink> · <SourceLink href={evidence.compositionTests}>Composition tests</SourceLink></div><span role="cell" className={styles.passed}>✓ Passed</span></div>
            <div role="row"><strong role="rowheader">Transitions + stale writes</strong><div role="cell"><SourceLink href={evidence.policyTests}>Policy tests</SourceLink> · <SourceLink href={evidence.apiTests}>API integration</SourceLink></div><span role="cell" className={styles.passed}>✓ Stale update → 409</span></div>
            <div role="row"><strong role="rowheader">Owner isolation</strong><div role="cell"><SourceLink href={evidence.apiTests}>Owner-scoped API tests</SourceLink></div><span role="cell" className={styles.passed}>✓ Foreign owner → 404</span></div>
            <div role="row"><strong role="rowheader">Demo replay + recovery</strong><div role="cell"><SourceLink href={evidence.demoTests}>Provisioning integration</SourceLink> · <SourceLink href={evidence.sessionTests}>Session tests</SourceLink></div><span role="cell" className={styles.passed}>✓ Same ready workspace</span></div>
            <div role="row"><strong role="rowheader">Lint / types / frontend build</strong><div role="cell"><SourceLink href={evidence.quality}>Quality workflow</SourceLink></div><span role="cell" className={styles.passed}>✓ Passed</span></div>
          </div>
          <p className={styles.qualityNote}><strong>Also completed:</strong> dependency audits, backend/frontend CycloneDX SBOM generation, and OpenAPI generation. These checks describe this commit and dependency graph; they are not a comprehensive security guarantee.</p>
        </div>
        <figure className={styles.iterationFigure}><p className={styles.smallLabel}>Documented iteration / conceptual comparison</p><div className={styles.iterationComparison}><div><span>Before</span><strong>Several Home priority surfaces</strong><p>Header / Coming Next, Action Center, and progress cues competed; timing could imply false urgency.</p></div><span className={styles.iterationArrow} aria-hidden="true">→</span><div><span>Implemented</span><strong>One decision area, explicit meanings</strong><p>Commitments stay together; suggestions, waiting, and partial data stay qualified.</p></div></div><figcaption>Based on the documented audit, not a historical screenshot or measured user outcome. <SourceLink href={evidence.audit}>Audit</SourceLink> · <SourceLink href={evidence.homeContract}>Behavior contract</SourceLink></figcaption></figure>
        <details className={styles.disclosure}><summary>Browser checks, accessibility, and the connected landing workspace</summary><div><p>The repository contains Playwright Home and visual-regression suites, including accessibility checks. Those browser suites were not executed by the cited quality workflow; their presence is not a fresh execution result or full accessibility certification.</p><p>The connected landing workspace has responsive relationship geometry and a reduced-motion fallback. It supports the introduction; application behavior and correctness remain the primary engineering story.</p><p className={styles.evidenceLine}><SourceLink href={evidence.browserTests}>Home browser suite</SourceLink><SourceLink href={evidence.visualTests}>Visual / accessibility suite</SourceLink><SourceLink href={evidence.landing}>Landing geometry</SourceLink></p></div></details>
      </section>

      <section className={`${styles.section} ${styles.limits}`} id="limits" data-chapter aria-labelledby="limits-heading">
        <SectionHeading id="limits-heading" number="06" label="Limits + next direction" title="Local proof. A defined next step.">The implementation demonstrates product behavior and correctness in an isolated demo. Production operation and user outcomes remain unmeasured.</SectionHeading>
        <dl className={styles.limitList}><div><dt>Local and temporary</dt><dd>No public production application or persistent accounts. Sessions expire after 24 hours; no production traffic, reliability, or performance benchmark is claimed.</dd></div><div><dt>Bounded and recorded</dt><dd>Home returns a limited view of entered information. It cannot know unrecorded obligations; calendar labels can age until data refreshes.</dd></div><div><dt>Consistency and validation</dt><dd>Index lists are eventually consistent; cursor pages are not a frozen snapshot. A current browser-suite run and broader usability, accessibility, and performance review remain validation work.</dd></div></dl>
        <aside className={styles.futureDirection} aria-labelledby="future-heading"><p className={styles.smallLabel}>Planned architecture / not deployed</p><h3 id="future-heading">The same application, on AWS.</h3><ol className={styles.plannedFlow}><li><strong>Amplify</strong><span>Vite frontend</span></li><li><strong>API Gateway</strong><span>HTTP API</span></li><li><strong>Lambda + Mangum</strong><span>FastAPI application</span></li><li><strong>DynamoDB</strong><span>Managed persistence</span></li></ol><p>The roadmap calls for CDK environments, secret-backed signing configuration, and CloudWatch logging and alarms. Persistent Cognito accounts, attachments, and reminders are separate optional or later milestones. Deployment automation is future work.</p><p className={styles.evidenceLine}><SourceLink href={evidence.roadmap}>Roadmap and dependencies</SourceLink><SourceLink href={evidence.architecture}>Architecture direction</SourceLink></p></aside>
        <div className={styles.sourceMap}><h3>Continue into the implementation</h3><p className={styles.evidenceLine}><SourceLink href={evidence.architecture}>System</SourceLink><SourceLink href={evidence.insights}>Action derivation</SourceLink><SourceLink href={evidence.services}>Application rules</SourceLink><SourceLink href={evidence.demo}>Demo provisioning</SourceLink><SourceLink href={evidence.accessPatterns}>Data access</SourceLink><SourceLink href={evidence.run}>Executed checks</SourceLink></p></div>
      </section>
      <footer className={styles.closing}><div><p className={styles.smallLabel}>Joan Morillo / Engineering case study</p><h2>Let’s talk about the engineering.</h2></div><div className={styles.closingLinks}><a href={`mailto:${site.email}`}>{site.email}</a><SourceLink href={hireFlux.repository}>HireFlux repository</SourceLink><a href="/#work">← Back to selected work</a></div></footer>
    </article>
  )
}
