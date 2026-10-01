import type { CSSProperties, ReactNode } from 'react'
import styles from './HireFluxCaseStudy.module.css'

export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">{'\u00a0'}↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
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

export function ProductEvidence() {
  return <figure className={`${styles.productStage} ${styles.breakout}`}>
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
    <figcaption>One decision area, with commitments and suggestions visibly separated. Markers identify the desktop crop; the mobile capture shows the commitment order. <SourceLink href="/projects/hireflux-home-light.png">Original Home capture</SourceLink></figcaption>
  </figure>
}

export function RecordMeaningFlow() {
  return <figure className={`${styles.meaningFlow} ${styles.breakout}`} id="decision-model">
    <div className={styles.flowThesis}><span className={styles.smallLabel}>Two paths / different meanings</span><h3>Recorded <span aria-hidden="true">≠</span><span className={styles.srOnly}>is not the same as</span> suggested</h3><p>Timing explains the action. It does not choose the candidate’s priorities.</p></div>
    <div className={styles.flowHeadings} aria-hidden="true"><span>01 / Record</span><span>02 / Interpret</span><span>03 / Contract</span><span>04 / Present</span></div>
    <ol className={`${styles.meaningLane} ${styles.recordedLane}`} aria-label="Recorded follow-up: from stored date to presentation">
      <li><span className={styles.stepLabel}>01 / Recorded input</span><strong className={styles.inputDate}>Sep 26</strong><ProductCrop image="/projects/hireflux-opportunity-dark.png" alt="Check back: Sep 26, 2026, saved on Northwind's application detail page." x={564} y={286} width={250} height={32} /><p>Northwind follow-up.<br />Owner unknown.</p></li>
      <li><span className={styles.stepLabel}>02 / Server interpretation</span><strong>Date &lt; local today</strong><p>A saved date is compared with the workspace’s calendar.</p></li>
      <li><span className={styles.stepLabel}>03 / Action contract</span><code>FOLLOW_UP_OVERDUE</code><p>The date and unknown owner are retained.</p></li>
      <li><span className={styles.stepLabel}>04 / Frontend presentation</span><strong>Overdue follow-up</strong><p>“Owner not recorded.”<br />Open the application’s context.</p></li>
    </ol>
    <ol className={`${styles.meaningLane} ${styles.suggestedLane}`} aria-label="Stage-age suggestion: from recorded stage to presentation">
      <li><span className={styles.stepLabel}>01 / Recorded input</span><strong>14+ days in stage</strong><p>Applied / Screening.<br />No recorded deadline.</p></li>
      <li><span className={styles.stepLabel}>02 / Server interpretation</span><strong>Eligible stage-age cue</strong><p>Age supports a review suggestion, not a due date.</p></li>
      <li><span className={styles.stepLabel}>03 / Action contract</span><code>STALE_APPLICATION</code><p>Keep the reason for the cue explicit.</p></li>
      <li><span className={styles.stepLabel}>04 / Frontend presentation</span><strong>Suggested review</strong><p>A separate, quieter meaning.<br />The candidate decides.</p></li>
    </ol>
    <figcaption>Reference day: September 29, 2026. These are server-derived action kinds, not predictive rankings. <SourceLink href="/projects/hireflux-opportunity-dark.png">Original saved record</SourceLink></figcaption>
  </figure>
}

export function SystemBlueprint() {
  return <figure className={`${styles.blueprint} ${styles.breakout}`}>
    <div className={styles.canvasHeading}><span className={styles.smallLabel}>Current system / local execution</span><span>Three runtime elements · one API application</span></div>
    <div className={styles.systemDiagram}>
      <div className={styles.clientBoundary}><DiagramIcon kind="client" /><p className={styles.smallLabel}>Candidate / browser</p><h3>React + TypeScript</h3><p>Forms and workspace views; validated API responses and server-state caching.</p><div className={styles.identityNote}><span>Protected requests carry</span><strong>Signed demo token</strong></div></div>
      <div className={styles.connector}><span>Requests<br />HTTP / JSON</span><i aria-hidden="true" /></div>
      <div className={styles.apiBoundary}><div className={styles.apiTitle}><DiagramIcon kind="api" /><div><p className={styles.smallLabel}>Single application</p><h3>FastAPI</h3></div></div><ol><li><span>01</span><div><strong>Routes + verified identity</strong><p>Validate input; derive the owner from the token.</p></div></li><li><span>02</span><div><strong>Application services</strong><p>Coordinate actions, lifecycle work, and persistence.</p></div></li><li><span>03</span><div><strong>Domain policy</strong><p>Allowed transitions and expected-version rules.</p></div></li><li><span>04</span><div><strong>Repository adapters</strong><p>Scoped queries and conditional transactions.</p></div></li></ol></div>
      <div className={styles.connector}><span>Persistence<br />GetItem / Query<br />TransactWrite</span><i aria-hidden="true" /></div>
      <div className={styles.storeBoundary}><DiagramIcon kind="data" /><p className={styles.smallLabel}>Local data store</p><h3>DynamoDB Local</h3><p>Applications, notes, interviews, activity, read projections, and counters.</p><div className={styles.identityNote}><span>Temporary workspace</span><strong>Identity + expiry metadata</strong></div></div>
    </div>
    <div className={styles.diagramKey} aria-label="Diagram key"><span><i className={styles.boundaryKey} aria-hidden="true" />Boundary = runtime element</span><span><i className={styles.layerKey} aria-hidden="true" />Numbered rows = internal responsibilities</span><span><i className={styles.edgeKey} aria-hidden="true" />Arrow = labeled request or persistence operation</span></div>
    <figcaption>The four FastAPI layers run inside one application. Signed identity scopes access; another owner’s record returns 404. AWS services are planned and outside this implemented system.</figcaption>
  </figure>
}

export function SemanticStates() {
  const meanings = [
    { state: 'Recorded', evidence: 'Saved follow-up or interview date', permits: 'A dated commitment', limit: 'Not personal importance or an inferred owner' },
    { state: 'Suggested', evidence: '14+ days in an eligible stage', permits: 'A qualified review cue', limit: 'Not a deadline or predictive rank' },
    { state: 'Undated', evidence: 'Candidate-owned step without a date', permits: 'A useful next step', limit: 'Not overdue' },
    { state: 'Waiting', evidence: 'Employer-owned next step', permits: 'Awaiting the employer', limit: 'Not candidate inaction' },
    { state: 'Unknown', evidence: 'Missing, partial, or failed data', permits: 'An explicitly partial view', limit: 'Not an “all clear”' },
  ]
  return <div className={styles.semanticVisual}><p className={styles.smallLabel}>Reading model / what the interface may say</p><dl className={styles.meaningMatrix}>
    {meanings.map(({ state, evidence, permits, limit }) => <div key={state} data-meaning={state.toLowerCase()}><dt>{state}</dt><dd><p>{evidence}</p><strong>{permits}</strong><span>{limit}</span></dd></div>)}
  </dl></div>
}

export function ConcurrencyDiagram() {
  return <figure className={`${styles.sequenceFigure} ${styles.breakout}`}>
    <div className={styles.sequenceHeading}><span className={styles.smallLabel}>Versioned write sequence / time runs downward</span><span>Same application · both clients start at v1</span></div>
    <div className={styles.participants}><div><span className={styles.clientLetter}>A</span><strong>Client A</strong><span>Reads v1</span></div><div><strong>Server-owned condition</strong><span>Canonical record starts at v1</span></div><div><span className={styles.clientLetter}>B</span><strong>Client B</strong><span>Reads v1</span></div></div>
    <ol className={styles.sequenceEvents}>
      <li className={styles.firstWrite}>
        <div className={styles.sequenceRequest}><span className={styles.smallLabel}>01 / A saves first</span><code>PATCH · expected_version: 1</code><span className={styles.routeArrow} aria-hidden="true">→</span></div>
        <div className={styles.versionGate}><span className={styles.smallLabel}>Atomic condition</span><strong>Stored v1 = expected v1</strong><p>Conditional transaction succeeds.<br />Canonical record becomes v2.</p></div>
        <div className={styles.acceptedResult}><span className={styles.returnArrow} aria-hidden="true">←</span><span className={styles.smallLabel}>A receives / HTTP 200</span><strong>v2</strong><span>New version saved</span></div>
        <p className={styles.peerContext}>B still holds <strong>the old v1 form.</strong></p>
      </li>
      <li className={styles.staleWrite}>
        <div className={styles.sequenceRequest}><span className={styles.smallLabel}>02 / B saves stale form</span><code>PATCH · expected_version: 1</code><span className={styles.routeArrow} aria-hidden="true">←</span></div>
        <div className={styles.versionGate}><span className={styles.smallLabel}>Atomic condition</span><strong>Stored v2 ≠ expected v1</strong><p>Conditional transaction rejects<br />the stale modification.</p></div>
        <div className={styles.conflictResult}><span className={styles.returnArrow} aria-hidden="true">→</span><span className={styles.smallLabel}>B receives / HTTP</span><strong>409</strong><h4>Conflict</h4><span>Stored v2 retained</span></div>
        <p className={styles.peerContext}>A’s newer edit <strong>remains intact.</strong></p>
      </li>
    </ol>
    <figcaption>Representative API-test sequence, not a timing benchmark. The condition is enforced in persistence, rather than an unprotected read-then-write check. B must refresh before retrying its change.</figcaption>
  </figure>
}

export function DemoLifecycle() {
  return <figure className={styles.lifecycleFigure}>
    <p className={styles.smallLabel}>Implemented / provisioning lifecycle</p>
    <ol className={styles.lifecycle}><li><span className={styles.stateStep}>01 / Request + reserve</span><strong>PROVISIONING</strong><p>Bind the workspace and idempotency key before creating records.</p></li><li><span className={styles.stateStep}>02 / Seed complete</span><strong>READY</strong><p>Return the signed session after fictional data is ready.</p></li><li><span className={styles.stateStep}>03 / Successful same-key retry</span><strong>SAME WORKSPACE</strong><p>Return its original identity and expiry.</p></li></ol>
    <div className={styles.replayRule}><span aria-hidden="true">↶</span><p>Successful replay returns the existing ready workspace; it does not provision another.</p></div>
    <div className={styles.failurePath}><span className={styles.smallLabel}>Failure branch / best effort</span><p><strong>Seed failure</strong><span aria-hidden="true"> → </span><strong>FAILED marker</strong><span aria-hidden="true"> → </span>cleanup attempt</p><span>Initial failure: 503. Failed-key replay: 409. In-progress provisioning: defined 409 response.</span></div>
    <figcaption>Reserve before seeding; expose only a ready workspace. Failure marking precedes the cleanup attempt.</figcaption>
  </figure>
}
