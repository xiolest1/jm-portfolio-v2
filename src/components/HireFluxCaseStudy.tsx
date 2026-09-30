import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import styles from './HireFluxCaseStudy.module.css'

const commit = '533cee182dc1a20ef7edb45db5d2c0ee21635dfd'
const sourceRoot = `${hireFlux.repository}/blob/${commit}`
const source = (path: string) => `${sourceRoot}/${path}`
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

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">{'\u00a0'}↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

function SectionHeading({ id, number, label, title, children }: { id: string; number: string; label: string; title: string; children: ReactNode }) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{number} / {label}</p>
      <h2 id={id}>{title}</h2>
      <p>{children}</p>
    </header>
  )
}

// Present a focused part of the original capture; the original image remains available.
function ProductCrop({ image, alt, x, y, width, height, className = '', children }: {
  image: string; alt: string; x: number; y: number; width: number; height: number; className?: string; children?: ReactNode
}) {
  const cropStyle = {
    '--crop-ratio': `${width} / ${height}`,
    '--image-width': `${1440 / width * 100}%`,
    '--crop-x': `${-x / 1440 * 100}%`,
    '--crop-y': `${-y / 900 * 100}%`,
  } as CSSProperties
  return (
    <div className={`${styles.productCrop} ${className}`} style={cropStyle}>
      <img src={image} alt={alt} width="1440" height="900" />
      {children}
    </div>
  )
}

export function HireFluxCaseStudy() {
  useEffect(() => {
    let active = true
    const alignHash = () => {
      if (!active || !window.location.hash) return
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    // The static entry mounts React after the browser's initial fragment lookup.
    // Wait for font metrics so direct links and refreshes reach a stable position.
    void document.fonts.ready.then(() => { if (active) requestAnimationFrame(alignHash) })
    window.addEventListener('hashchange', alignHash)
    return () => { active = false; window.removeEventListener('hashchange', alignHash) }
  }, [])

  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero} id="overview">
        <div className={styles.heroMain}>
          <a className={styles.backLink} href="/#work">← Selected work</a>
          <p className={styles.eyebrow}>01 / Overview · Personal project</p>
          <h1>HireFlux</h1>
          <p className={styles.dek}>A job-search workspace that keeps the next step clear.</p>
          <p className={styles.heroContext}>I built the React client, FastAPI backend, and data layer for candidates tracking applications, interviews, and follow-ups. The engineering challenge: make useful actions from that information without inventing deadlines or overwriting newer work.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#workflow">See the workflow <span aria-hidden="true">↓</span></a>
            <SourceLink href={hireFlux.repository}>Repository</SourceLink>
          </div>
          <dl className={styles.overviewFacts}>
            <div><dt>Current</dt><dd>Local, isolated 24-hour demo</dd></div>
            <div><dt>Stack</dt><dd>React · TypeScript · Vite · FastAPI · DynamoDB Local</dd></div>
            <div><dt>Cloud</dt><dd>AWS direction planned; infrastructure not deployed</dd></div>
          </dl>
        </div>
        <figure className={styles.openingEvidence}>
          <p className={styles.smallLabel}>Inside the Action Center</p>
          <ProductCrop image="/projects/hireflux-home-light.png" alt="Northwind Robotics follow-up card, labeled overdue with a recorded September 26 date and owner not recorded." x={280} y={282} width={365} height={212} />
          <figcaption><strong>A recorded date becomes an actionable check-back.</strong> Ownership stays “not recorded” when unknown. A stage-age suggestion is shown separately, without a deadline.</figcaption>
          <p className={styles.captureNote}>Fictional local workspace · September 29, 2026<br /><SourceLink href="/projects/hireflux-home-light.png">Full Home capture</SourceLink></p>
        </figure>
      </header>

      <div className={styles.accomplishments} aria-label="Three engineering accomplishments">
        <a href="#action-semantics"><span className={styles.smallLabel}>01 / Action meaning</span><strong>Dates drive commitments.<br />Suggestions stay qualified.</strong></a>
        <a href="#state-correctness"><span className={styles.smallLabel}>02 / State correctness</span><strong>Versioned writes reject<br />stale changes.</strong></a>
        <a href="#demo-lifecycle"><span className={styles.smallLabel}>03 / Demo isolation</span><strong>Retries return the same<br />ready workspace.</strong></a>
      </div>

      <nav className={styles.jumpNav} aria-label="HireFlux case study chapters">
        <span>In this study</span>
        <a href="#overview">Overview</a><a href="#workflow">Workflow</a><a href="#system">System</a><a href="#engineering">Engineering</a><a href="#verification">Verification</a><a href="#limits">Limits</a>
      </nav>

      <section className={styles.section} id="workflow" aria-labelledby="workflow-heading">
        <span className={styles.anchorAlias} id="product" />
        <SectionHeading id="workflow-heading" number="02" label="Candidate workflow" title="From an opportunity to a useful next step">
          In this fictional September 29 workspace, a candidate has a Northwind check-back dated September 26, an Atlas follow-up due today, and an Orbit interview on October 1. Home brings those commitments together; an older application gets a separate review suggestion.
        </SectionHeading>
        <ol className={styles.journey}>
          <li><span>01</span><div><strong>Record the opportunity</strong><p>Keep status, notes, interviews, and activity attached to the application.</p></div></li>
          <li><span>02</span><div><strong>Plan the next step</strong><p>Record a check-back date, an interview, or candidate-owned work without a date.</p></div></li>
          <li><span>03</span><div><strong>Return to Home</strong><p>Review commitments, inspect context, and choose what to do next.</p></div></li>
        </ol>

        <figure className={styles.contextFigure}>
          <div className={styles.desktopCapture}>
            <ProductCrop image="/projects/hireflux-home-light.png" alt="Action Center shows Northwind overdue, Atlas due today, and Orbit's scheduled interview as peer commitments, followed by Evergreen's separate stage-age suggestion." x={280} y={205} width={1120} height={485}>
              <span className={`${styles.marker} ${styles.commitmentMarker}`} aria-hidden="true">1</span>
              <span className={`${styles.marker} ${styles.interviewMarker}`} aria-hidden="true">2</span>
              <span className={`${styles.marker} ${styles.suggestionMarker}`} aria-hidden="true">3</span>
            </ProductCrop>
          </div>
          <div className={styles.mobileCapture}>
            <img src="/projects/hireflux-home-mobile.png" alt="The same fictional Home in its mobile layout: commitment groups stack vertically, with returned counts and links to more items." width="390" height="844" loading="lazy" />
          </div>
          <figcaption>Real local captures in light and dark product modes. Markers refer to the desktop crop; the mobile capture preserves the commitment order.</figcaption>
        </figure>
        <ol className={styles.annotations}>
          <li><span>1</span><div><strong>Recorded follow-ups</strong><p>Overdue and due-today labels come from saved dates, not inferred urgency.</p></div></li>
          <li><span>2</span><div><strong>Scheduled conversation</strong><p>An interview stays visible beside follow-ups. The UI does not declare one peer commitment more important.</p></div></li>
          <li><span>3</span><div><strong>Suggested review</strong><p>Time in stage prompts a review. It is explicitly not a missed deadline.</p></div></li>
        </ol>

        <div className={styles.workedExample} id="decision-model">
          <div className={styles.exampleIntro}><p className={styles.smallLabel}>Worked example / Northwind</p><h3>How September 26 becomes “overdue”</h3><p>The reference day is September 29, 2026. This explains a returned action; it does not rank the candidate’s opportunities.</p></div>
          <figure className={styles.recordSnippet}>
            <ProductCrop image="/projects/hireflux-opportunity-dark.png" alt="Check back: Sep 26, 2026, saved on Northwind's application detail page." x={564} y={286} width={250} height={32} />
            <figcaption>The saved check-back in its application context. <SourceLink href="/projects/hireflux-opportunity-dark.png">Full detail capture</SourceLink></figcaption>
          </figure>
          <ol className={styles.transformation}>
            <li><span className={styles.smallLabel}>Recorded</span><strong>Follow-up: Sep 26</strong><p>Active application; next-step owner unknown.</p></li>
            <li><span className={styles.smallLabel}>Server</span><strong>Sep 26 &lt; local today</strong><p>Compare date-only values in the workspace’s calendar.</p></li>
            <li><span className={styles.smallLabel}>Response</span><code>FOLLOW_UP_OVERDUE</code><p>Return the date and action meaning.</p></li>
            <li><span className={styles.smallLabel}>Client → Candidate</span><strong>Overdue follow-up</strong><p>Group the action; retain “owner not recorded” and a path to its context.</p></li>
          </ol>
          <p className={styles.evidenceLine}><SourceLink href={evidence.insights}>Server derivation</SourceLink><SourceLink href={evidence.decisionModel}>Home presentation model</SourceLink></p>
        </div>
      </section>

      <section className={styles.section} id="system" aria-labelledby="system-heading">
        <SectionHeading id="system-heading" number="03" label="Current system" title="One client, one API, one local data store">
          The browser presents the workspace. A single FastAPI application owns authorization, action derivation, and lifecycle rules. Repository adapters translate those rules into owner-scoped DynamoDB operations.
        </SectionHeading>
        <figure className={styles.architecture}>
          <p className={styles.diagramLabel}>Implemented / local execution</p>
          <div className={styles.systemDiagram}>
            <div className={styles.clientBoundary}><span className={styles.smallLabel}>Browser</span><h3>React + TypeScript</h3><ul><li>Forms and product views</li><li>Validated API responses</li><li>Server-state query cache</li><li>Home grouping and disclosure</li></ul><p className={styles.identityNote}>Signed demo token accompanies protected requests.</p></div>
            <p className={styles.connector}><span>HTTP / JSON</span><span aria-hidden="true">→</span></p>
            <div className={styles.apiBoundary}><span className={styles.smallLabel}>Single FastAPI application</span><h3>Backend responsibilities</h3><ol><li><strong>Routes + identity</strong><span>Validate requests; derive the owner from the verified token.</span></li><li><strong>Application services + domain policy</strong><span>Derive actions; enforce transitions and expected versions.</span></li><li><strong>Repository boundary + adapters</strong><span>Build scoped queries and conditional transactions.</span></li></ol></div>
            <p className={styles.connector}><span>GetItem / Query<br />Transactions</span><span aria-hidden="true">→</span></p>
            <div className={styles.storeBoundary}><span className={styles.smallLabel}>Local persistence</span><h3>DynamoDB Local</h3><ul><li>Canonical application records</li><li>Notes, interviews, activity</li><li>Read projections and counters</li><li>Demo workspace / expiry metadata</li></ul></div>
          </div>
          <figcaption>Routes, services, domain policy, and adapters are internal layers of one API application. They are not separately deployed services. No AWS infrastructure is running in this system.</figcaption>
        </figure>
        <div className={styles.systemNotes}>
          <p><strong>The server decides what is allowed.</strong> Client validation supports form feedback; it cannot authorize a record, permit a transition, or prevent a stale write.</p>
          <p><strong>The owner is not a form field.</strong> Verified identity scopes reads and writes. A request for another workspace’s application returns 404.</p>
        </div>
        <details className={styles.disclosure}>
          <summary>Data access and consistency tradeoffs</summary>
          <div><p>Normal request paths use keyed reads and queries rather than table scans. Sparse indexes support update, status, and scheduling views; transactions maintain canonical records and required projections together.</p><p>Index reads are eventually consistent. Cursor pagination is best effort when data changes between pages, so it is not a snapshot guarantee. Canonical reads and version conditions protect writes; they do not make every list immediately consistent.</p><p className={styles.evidenceLine}><SourceLink href={evidence.accessPatterns}>Access patterns</SourceLink><SourceLink href={evidence.repositories}>Data adapter</SourceLink></p></div>
        </details>
        <p className={styles.evidenceLine}><SourceLink href={evidence.architecture}>Architecture</SourceLink><SourceLink href={evidence.apiTests}>Owner-scope API tests</SourceLink></p>
      </section>

      <section className={styles.section} id="engineering" aria-labelledby="engineering-heading">
        <SectionHeading id="engineering-heading" number="04" label="Engineering decisions" title="Action semantics, stale writes, and demo recovery">
          Action meaning, conflicting edits, and demo provisioning each need rules that hold across the frontend, API, and data layer.
        </SectionHeading>

        <article className={styles.semanticsStory} id="action-semantics">
          <div className={styles.storyText}>
            <p className={styles.smallLabel}>A / Action semantics</p><h3>A suggestion must not look like a deadline.</h3>
            <p><strong>Risk.</strong> Several Home priority surfaces competed for attention. Undated work and stage-age cues could be interpreted as scheduled obligations.</p>
            <p><strong>Decision.</strong> Derive action kinds on the server, then give the frontend an explicit presentation model for commitments, suggestions, waiting, and incomplete information.</p>
            <p><strong>Consequence.</strong> Dates retain their meaning, peer commitments remain visible, and partial data cannot become an “all clear.” The candidate still chooses the next action.</p>
            <p className={styles.tradeoff}><strong>Tradeoff.</strong> Home is a bounded orientation surface, not a predictive ranking system or a complete record of unentered obligations.</p>
            <p className={styles.evidenceLine}><SourceLink href={evidence.homeContract}>Behavior contract</SourceLink><SourceLink href={evidence.decisionTests}>Meaning and state tests</SourceLink></p>
          </div>
          <div className={styles.meaningExamples}>
            <p className={styles.smallLabel}>Same search / possible states</p>
            <dl>
              <div className={styles.recordedMeaning}><dt>Recorded commitment</dt><dd>Sep 26 follow-up → <strong>Overdue</strong><span>A saved date supports the label.</span></dd></div>
              <div><dt>Undated candidate work</dt><dd>Next step, no date → <strong>Undated</strong><span>No invented “due today.”</span></dd></div>
              <div className={styles.suggestedMeaning}><dt>System suggestion</dt><dd>14+ days in an eligible stage → <strong>Suggested review</strong><span>No recorded deadline.</span></dd></div>
              <div><dt>Waiting on an employer</dt><dd><strong>Waiting</strong><span>If only employer-owned next steps remain, waiting is distinct from candidate inaction.</span></dd></div>
              <div><dt>Incomplete information</dt><dd><strong>Partial view</strong><span>Missing or failed data stays visible as uncertainty.</span></dd></div>
            </dl>
          </div>
        </article>

        <article className={styles.concurrencyStory} id="state-correctness">
          <header className={styles.storyHeading}><p className={styles.smallLabel}>B / State correctness</p><h3>A stale tab cannot overwrite a newer edit.</h3><p>Two clients can read the same application before either saves. A correct form alone cannot protect the second write.</p></header>
          <figure className={styles.raceFigure}>
            <div className={styles.sharedRead}><strong>Client A and Client B both read</strong><span className={styles.version}>version 1</span></div>
            <ol className={styles.raceSequence}>
              <li><span className={styles.sequenceNumber}>1</span><div><span className={styles.smallLabel}>Client A / first save</span><strong>Update with expected_version: 1</strong><p>The server checks policy and the stored version. The conditional write succeeds.</p></div><span className={styles.raceResult}>Saved · version 2</span></li>
              <li><span className={styles.sequenceNumber}>2</span><div><span className={styles.smallLabel}>Client B / stale save</span><strong>Update with expected_version: 1</strong><p>The current version is already 2. The server rejects the modification.</p></div><span className={styles.raceResult}>409 · conflict</span></li>
            </ol>
            <figcaption>Representative two-client sequence, supported by API tests. The newer state is retained; the stale client must refresh before retrying its change.</figcaption>
          </figure>
          <div className={styles.decisionNotes}>
            <p><strong>Decision + mechanism.</strong> The server owns the transition matrix; edits carry <code>expected_version</code>. Conditional transactions protect the canonical record and required activity/projection updates, so a client cannot bypass the rules or leave a status change half-written.</p>
            <p><strong>Tradeoff.</strong> A conflict requires recovery instead of silent last-write-wins. Transaction and projection maintenance add complexity. Archive also preserves the previous status so restoration has a defined destination.</p>
          </div>
          <details className={styles.disclosure}>
            <summary>Inspect the stale request and error contract</summary>
            <div className={styles.payloadGrid}>
              <div><p className={styles.smallLabel}>Representative request / fictional ID</p><pre><code>{'PATCH /api/v1/applications/{id}\n\n{\n  "expected_version": 1,\n  "company_name": "Stale edit"\n}'}</code></pre></div>
              <div><p className={styles.smallLabel}>409 response / abridged</p><pre><code>{'{\n  "error": {\n    "code": "CONFLICT",\n    "message": "…",\n    "request_id": "…"\n  }\n}'}</code></pre></div>
              <p className={styles.payloadNote}>The API-flow test saves version 2, then submits version 1 and asserts HTTP 409. Message and request ID are omitted here; status changes use their dedicated endpoint, not a general PATCH.</p>
            </div>
          </details>
          <p className={styles.evidenceLine}><SourceLink href={evidence.apiTests}>Stale-write API test</SourceLink><SourceLink href={evidence.policyTests}>Transition tests</SourceLink><SourceLink href={evidence.concurrency}>Concurrency ADR</SourceLink><SourceLink href={evidence.repositories}>Conditional transactions</SourceLink></p>
        </article>

        <article className={styles.demoStory} id="demo-lifecycle">
          <div className={styles.storyText}>
            <p className={styles.smallLabel}>C / Temporary demo lifecycle</p><h3>A retry should return a workspace, not create another.</h3>
            <p><strong>Risk.</strong> A lost response can repeat provisioning; a seed failure can leave partial records. Useful fictional data needs an isolated, recoverable lifecycle.</p>
            <p><strong>Decision.</strong> Reserve an identity and idempotency key before seeding. Only a ready workspace returns a signed session. Replaying that successful key returns the original workspace and expiry.</p>
            <p><strong>Isolation.</strong> The token supplies the verified owner. Protected reads and writes use that scope, and the frontend clears cached server state when identity changes.</p>
            <p className={styles.tradeoff}><strong>Tradeoff.</strong> Failed provisioning uses best-effort cleanup and a failure marker. This is a temporary demo contract, not persistent accounts or enterprise security infrastructure.</p>
          </div>
          <div className={styles.lifecycleVisual}>
            <p className={styles.smallLabel}>Provisioning / implemented states</p>
            <ol className={styles.lifecycle}>
              <li><span>01</span><div><strong>Reserve → PROVISIONING</strong><p>Bind a new workspace to the key before creating records.</p></div></li>
              <li><span>02</span><div><strong>Seed → READY</strong><p>Finish fictional data, then issue the signed session.</p></div></li>
              <li><span>↺</span><div><strong>Same key → same ready workspace</strong><p>Successful replay does not seed an unrelated second workspace.</p></div></li>
            </ol>
            <div className={styles.failurePath}><strong>Seed failure → FAILED + cleanup attempt</strong><p>The initial failure returns 503. Reusing a failed key returns 409; an in-progress reservation also has a defined 409 response.</p></div>
          </div>
          <div className={styles.expiryDistinction}>
            <p><span className={styles.smallLabel}>Authorization / 24 hours</span><strong>Expired token → access denied</strong><span>API access ends when the token expires, even if records still exist.</span></p>
            <p><span className={styles.smallLabel}>Storage / separate lifecycle</span><strong>TTL metadata → eventual cleanup</strong><span>Physical removal is not the authorization check, and no exact deletion time is guaranteed.</span></p>
          </div>
          <p className={styles.evidenceLine}><SourceLink href={evidence.demoTests}>Replay, failure, isolation tests</SourceLink><SourceLink href={evidence.demoRepository}>Reservation states</SourceLink><SourceLink href={evidence.identity}>Token verification</SourceLink><SourceLink href={evidence.sessionTests}>Frontend session tests</SourceLink></p>
        </article>
      </section>

      <section className={styles.section} id="verification" aria-labelledby="verification-heading">
        <span className={styles.anchorAlias} id="proof" />
        <SectionHeading id="verification-heading" number="05" label="Iteration + verification" title="From competing Home signals to tested rules">
          The Home audit identified competing priorities and timing labels that implied more than the data supported. The implementation contract turned those observations into explicit presentation rules.
        </SectionHeading>
        <figure className={styles.iterationFigure}>
          <p className={styles.smallLabel}>Conceptual comparison / based on the documented audit</p>
          <div className={styles.iterationComparison}>
            <div className={styles.beforeConcept}><span className={styles.smallLabel}>Before / competing signals</span><h3>Several answers to “what next?”</h3><ul><li>Header priority / Coming Next</li><li>Action Center</li><li>Progress and time cues</li></ul><p>Undated work and stage age could inherit deadline-like emphasis.</p></div>
            <div className={styles.afterConcept}><span className={styles.smallLabel}>Implemented / one decision area</span><h3>Commitments together; suggestions separate.</h3><p>Recorded dates and interviews retain their meaning. Undated work, waiting, and partial data have explicit states.</p><p className={styles.conceptLimit}>An engineering response to a diagnosed information problem. No measured user-productivity or comprehension gain is claimed.</p></div>
          </div>
          <figcaption>This is a conceptual representation, not an invented historical screenshot. <SourceLink href={evidence.audit}>Original audit</SourceLink> · <SourceLink href={evidence.homeContract}>Implementation contract</SourceLink></figcaption>
        </figure>

        <div className={styles.verifiedRun}>
          <div><p className={styles.smallLabel}>Executed / GitHub Actions CI</p><h3>Verified at commit <code>533cee1</code></h3><p>Run 36665312626 · September 30, 2026 UTC · successful</p><p className={styles.evidenceLine}><SourceLink href={evidence.run}>Inspect the quality run</SourceLink><SourceLink href={`${hireFlux.repository}/commit/${commit}`}>Pinned commit</SourceLink></p></div>
          <dl className={styles.testResults}><div><dt>Backend / pytest</dt><dd><strong>267</strong> passed <span>1 warning</span></dd></div><div><dt>Frontend / Vitest</dt><dd><strong>322</strong> passed <span>45 test files</span></dd></div></dl>
        </div>
        <div className={styles.behaviorProof}>
          <div><h4>Action meaning</h4><p>Peer commitments, undated work, waiting, and partial evidence.</p><p className={styles.proofResult}>Included in the passing frontend suite</p><p className={styles.evidenceLine}><SourceLink href={evidence.decisionTests}>Model tests</SourceLink><SourceLink href={evidence.compositionTests}>Composition tests</SourceLink></p></div>
          <div><h4>State and ownership</h4><p>Invalid transitions, stale version 409s, and foreign-owner 404s.</p><p className={styles.proofResult}>Included in the passing backend suite</p><p className={styles.evidenceLine}><SourceLink href={evidence.policyTests}>Policy tests</SourceLink><SourceLink href={evidence.apiTests}>API-flow tests</SourceLink></p></div>
          <div><h4>Demo recovery</h4><p>Same-key replay, failed seed cleanup, expiry, and isolation.</p><p className={styles.proofResult}>Included in the passing backend / frontend suites</p><p className={styles.evidenceLine}><SourceLink href={evidence.demoTests}>Provisioning tests</SourceLink><SourceLink href={evidence.sessionTests}>Session-flow tests</SourceLink></p></div>
        </div>
        <p className={styles.qualityNote}><strong>Also passed in this run:</strong> lint, type checks, frontend build, dependency audits, backend/frontend CycloneDX SBOM generation, and OpenAPI generation. These are checks on this commit and dependency graph—not a universal security guarantee. <SourceLink href={evidence.quality}>Workflow definition</SourceLink></p>
        <details className={styles.disclosure}>
          <summary>Browser checks, accessibility, and the connected landing workspace</summary>
          <div><p>The repository contains Playwright Home and visual-regression suites, including accessibility checks. Those browser suites were not executed by the cited quality workflow; their presence is not a fresh execution result or full accessibility certification.</p><p>The connected landing workspace also has responsive relationship geometry and a reduced-motion fallback. It supports the product introduction; the core engineering story remains the application workflow and its correctness rules.</p><p className={styles.evidenceLine}><SourceLink href={evidence.browserTests}>Home browser suite</SourceLink><SourceLink href={evidence.visualTests}>Visual / accessibility suite</SourceLink><SourceLink href={evidence.landing}>Landing geometry</SourceLink></p></div>
        </details>
      </section>

      <section className={styles.section} id="limits" aria-labelledby="limits-heading">
        <SectionHeading id="limits-heading" number="06" label="Limits + next direction" title="Local proof today. Deployment work remains.">
          The current implementation demonstrates product behavior and correctness in an isolated local demo. It does not yet demonstrate production operation or measured user outcomes.
        </SectionHeading>
        <dl className={styles.limitList}>
          <div><dt>Local and temporary</dt><dd>No public production application or persistent candidate accounts. Sessions expire after 24 hours; no production traffic, reliability, or performance benchmark is claimed.</dd></div>
          <div><dt>Bounded and recorded</dt><dd>Home returns a limited view of entered information. It cannot know unrecorded obligations, and calendar labels can age until data refreshes.</dd></div>
          <div><dt>Consistency and validation</dt><dd>Index-backed lists are eventually consistent; cursor pages are not a frozen snapshot. A current browser-suite execution and broader usability, accessibility, and performance review remain validation work.</dd></div>
        </dl>
        <aside className={styles.futureDirection} aria-labelledby="future-heading">
          <p className={styles.smallLabel}>Planned / not currently deployed</p><h3 id="future-heading">Take the same application to AWS.</h3>
          <ol className={styles.plannedFlow}><li><strong>Amplify</strong><span>Vite frontend</span></li><li><strong>API Gateway</strong><span>HTTP API</span></li><li><strong>Lambda + Mangum</strong><span>FastAPI application</span></li><li><strong>DynamoDB</strong><span>Managed persistence</span></li></ol>
          <p>The roadmap calls for CDK environments, secret-backed signing configuration, and CloudWatch logging and alarms. Persistent Cognito accounts, attachments, and reminders are separate optional or later milestones. The existing quality workflow is CI; deployment automation is future work.</p>
          <p className={styles.evidenceLine}><SourceLink href={evidence.roadmap}>Roadmap and dependencies</SourceLink><SourceLink href={evidence.architecture}>Architecture direction</SourceLink></p>
        </aside>
        <div className={styles.sourceMap}><h3>Continue into the implementation</h3><p className={styles.evidenceLine}><SourceLink href={evidence.architecture}>System</SourceLink><SourceLink href={evidence.insights}>Action derivation</SourceLink><SourceLink href={evidence.services}>Application rules</SourceLink><SourceLink href={evidence.demo}>Demo provisioning</SourceLink><SourceLink href={evidence.accessPatterns}>Data access</SourceLink><SourceLink href={evidence.run}>Executed checks</SourceLink></p></div>
      </section>

      <footer className={styles.closing}><div><p className={styles.smallLabel}>Joan Morillo / Engineering case study</p><h2>Want to discuss the engineering?</h2></div><div className={styles.closingLinks}><a href={`mailto:${site.email}`}>{site.email}</a><SourceLink href={hireFlux.repository}>HireFlux repository</SourceLink><a href="/#work">← Back to selected work</a></div></footer>
    </article>
  )
}
