import { useState, type CSSProperties, type ReactNode } from 'react'
import styles from './HireFluxCaseStudy.module.css'

export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">{'\u00a0'}↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

export function EvidenceRail({ children }: { children: ReactNode }) {
  return <div className={styles.evidenceRail}><span className={styles.smallLabel}>Inspect the evidence</span><div>{children}</div></div>
}

function ProductCrop({ image, alt, x, y, width, height, children }: {
  image: string; alt: string; x: number; y: number; width: number; height: number; children?: ReactNode
}) {
  const cropStyle = { '--crop-ratio': `${width} / ${height}`, '--image-width': `${1440 / width * 100}%`, '--crop-x': `${-x / 1440 * 100}%`, '--crop-y': `${-y / 900 * 100}%` } as CSSProperties
  return <div className={styles.productCrop} style={cropStyle}><img src={image} alt={alt} width="1440" height="900" loading="lazy" />{children}</div>
}

export function ProductEvidence() {
  return <figure className={styles.productStage}>
    <div className={styles.figureLabel}><span className={styles.smallLabel}>Inside the product / Home</span><span>Fictional local workspace · September 29, 2026</span></div>
    <div className={styles.desktopCapture}>
      <ProductCrop image="/projects/hireflux-home-light.png" alt="HireFlux Home: Northwind's September 26 follow-up is overdue, Atlas is due today, and Orbit has an October 1 interview. Evergreen's stage-age review is separately labeled as a suggestion with no recorded deadline." x={280} y={205} width={1120} height={490}>
        <span className={`${styles.marker} ${styles.markerOne}`} aria-hidden="true">1</span><span className={`${styles.marker} ${styles.markerTwo}`} aria-hidden="true">2</span>
      </ProductCrop>
    </div>
    <div className={styles.mobileCapture}><img src="/projects/hireflux-home-mobile.png" alt="Actual mobile Home capture: follow-up commitments and the scheduled interview form a vertical reading order." width="390" height="844" loading="lazy" /></div>
    <ol className={styles.annotations}>
      <li><span aria-hidden="true">1</span><div><strong>Dates mean commitments.</strong><p>Saved follow-ups and interviews keep their timing. Missing responsibility stays “Owner not recorded.”</p></div></li>
      <li><span aria-hidden="true">2</span><div><strong>Age means a suggestion.</strong><p>An older application can warrant review. It does not acquire an invented deadline.</p></div></li>
    </ol>
    <figcaption>Desktop Home is shown in light mode; the mobile capture is dark mode. HTML explanations remain outside the image, and the suggestion rule applies on both layouts. <SourceLink href="/projects/hireflux-home-light.png">Full Home capture</SourceLink></figcaption>
  </figure>
}

export function MeaningPaths() {
  return <figure className={styles.meaningPaths} id="decision-model">
    <div className={styles.figureLabel}><span className={styles.smallLabel}>One record → an honest interpretation</span><span>Reference day / September 29</span></div>
    <div className={styles.pathPair}>
      <div className={styles.recordedPath}><h3>Recorded commitment</h3><ol>
        <li><span>Saved fact</span><strong>Follow up on Sep 26</strong><p>A real date on the application.</p></li>
        <li><span>Server interpretation</span><strong>The date has passed</strong><p>Compared with the workspace’s local day.</p></li>
        <li><span>Candidate sees</span><strong>Overdue follow-up</strong><p>Review the record. Ownership is not guessed.</p></li>
      </ol></div>
      <div className={styles.suggestedPath}><h3>Suggested review</h3><ol>
        <li><span>Saved fact</span><strong>14+ days in stage</strong><p>Applied or Screening; no recorded deadline.</p></li>
        <li><span>Server interpretation</span><strong>A stage-age cue</strong><p>A reason to review, not proof of urgency.</p></li>
        <li><span>Candidate sees</span><strong>Suggested review</strong><p>A quieter prompt. The candidate chooses.</p></li>
      </ol></div>
    </div>
    <figcaption>The backend derives action kinds; the frontend preserves their meaning. This is bounded interpretation of recorded state, not predictive ranking.</figcaption>
  </figure>
}

const layers = [
  { name: 'React + TypeScript', label: '01 / Candidate interface', summary: 'Record an opportunity. Understand the next step.', detail: 'Zod validates incoming API responses. TanStack Query handles server state, mutation invalidation, and loading or failure. The browser renders allowed transitions rather than inventing them.', boundary: 'Vite browser client' },
  { name: 'FastAPI', label: '02 / Application authority', summary: 'Verify identity. Derive actions. Enforce lifecycle rules.', detail: 'Routes call application services and domain policy through repository protocols. These are internal responsibilities of one modular monolith, not separate services. The verified token determines the owner.', boundary: 'One backend application' },
  { name: 'DynamoDB Local', label: '03 / Persistence', summary: 'Store owner-scoped records. Condition writes on version.', detail: 'A single table uses keyed reads, sparse indexes, and conditional transactions. Canonical records, activity, and required projections are maintained together. Index reads may lag; authoritative write conditions do not rely on them.', boundary: 'Local database' },
]

export function SystemBlueprint() {
  const [selected, setSelected] = useState<number | null>(null)
  return <figure className={styles.blueprint}>
    <div className={styles.figureLabel}><span className={styles.smallLabel}>Implemented / local runtime</span><span>No AWS runtime required</span></div>
    <ol className={styles.systemFlow}>
      {layers.map((layer, i) => <li key={layer.name} data-focused={selected === i}>
        <span className={styles.smallLabel}>{layer.label}</span><h3>{layer.name}</h3><p>{layer.summary}</p><span className={styles.boundary}>{layer.boundary}</span>
        <button type="button" aria-expanded={selected === i} aria-controls="layer-detail" onClick={() => setSelected(selected === i ? null : i)}>Inspect {i === 0 ? 'client' : i === 1 ? 'API' : 'data'} responsibility<span aria-hidden="true"> +</span></button>
        {i < 2 && <span className={styles.systemEdge} aria-hidden="true">{i === 0 ? 'HTTP / JSON' : 'Read / write'}<i>→</i></span>}
      </li>)}
    </ol>
    <p className={styles.boundaryNote}>Requests flow from the client to one FastAPI application, then to DynamoDB Local. Identity is checked before owner-scoped access; another owner’s record is treated as not found.</p>
    <div id="layer-detail" className={styles.layerDetail} aria-live="polite" aria-atomic="true">
      {selected === null ? <p><span className={styles.smallLabel}>Optional layer inspection</span>Choose a responsibility above for its implementation boundary.</p> : <p><strong>{layers[selected].name}</strong>{layers[selected].detail}</p>}
    </div>
    <figcaption>All three runtime elements are visible without interaction. Layer inspection adds detail without changing this system model.</figcaption>
  </figure>
}

export function ConcurrencyDiagram() {
  return <figure className={styles.concurrencyFigure}>
    <div className={styles.figureLabel}><span className={styles.smallLabel}>Same application / two open tabs</span><span>Illustration of the versioned API contract</span></div>
    <ol className={styles.writeSequence}>
      <li><span className={styles.stepNumber}>01</span><h3>Both read v1.</h3><div className={styles.twoVersions}><span>Tab A <b>v1</b></span><span>Tab B <b>v1</b></span></div><p>Each form starts from the same saved application.</p></li>
      <li><span className={styles.stepNumber}>02</span><h3>A saves first.</h3><div className={styles.acceptedState}>Accepted <b>v2</b></div><p>The write matches the stored version. The record advances.</p></li>
      <li><span className={styles.stepNumber}>03</span><h3>B is now stale.</h3><div className={styles.rejectedState}>Rejected <b>409</b></div><p>B still submits v1. The server rejects that old write.</p></li>
    </ol>
    <div className={styles.survivingState}><span className={styles.currentBadge}>Current / v2</span><strong>The newer edit survives.</strong><p>B must refresh before retrying. There is no silent last-write-wins overwrite.</p></div>
    <figcaption>Version comparison is enforced atomically in persistence. This illustrates tested API behavior; it is not a live backend request or a timing benchmark.</figcaption>
  </figure>
}

export function WriteExplorer() {
  const [state, setState] = useState<'ready' | 'saved' | 'conflict'>('ready')
  return <details className={styles.disclosure}><summary>Try the two-tab example</summary><div className={styles.explorer}>
    <p className={styles.smallLabel}>Interactive illustration / no live request</p>
    <div className={styles.explorerClients}>
      <div><h4>Tab A</h4><p>Loaded version 1</p><button type="button" disabled={state !== 'ready'} onClick={() => setState('saved')}>Save A’s edit</button></div>
      <div><h4>Tab B</h4><p>Still holds version 1</p><button type="button" disabled={state !== 'saved'} onClick={() => setState('conflict')}>Try B’s stale save</button></div>
    </div>
    <div className={styles.explorerResult} role="status" aria-live="polite" aria-atomic="true" data-state={state}>
      <strong key={state}>{state === 'ready' ? 'Stored version: 1' : state === 'saved' ? 'A saved successfully · stored version: 2' : 'B received 409 · stored version remains 2'}</strong>
      <p>{state === 'ready' ? 'Both tabs read the same record. Save A’s edit first.' : state === 'saved' ? 'A’s expected version matched. Now try the still-open form in B.' : 'Expected v1 does not match stored v2. A’s edit is preserved; B needs fresh state.'}</p>
    </div>
    <button type="button" className={styles.resetButton} onClick={() => setState('ready')}>Reset example</button>
  </div></details>
}

export function DemoLifecycle() {
  return <figure className={styles.lifecycleFigure}><ol className={styles.lifecycle}>
    <li><span className={styles.smallLabel}>Reserve</span><strong>PROVISIONING</strong><p>Bind a generated owner and the hashed retry key before seeding.</p></li>
    <li><span className={styles.smallLabel}>Complete</span><strong>READY</strong><p>Only return a usable session after the fictional dataset is ready.</p></li>
    <li><span className={styles.smallLabel}>Replay</span><strong>Same workspace</strong><p>A successful same-key retry returns the original identity and expiry.</p></li>
  </ol><figcaption>If seeding fails, mark FAILED before attempting cleanup. Cleanup is best effort; failure does not grant a usable workspace.</figcaption></figure>
}
