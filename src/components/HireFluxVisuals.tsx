import { useState, type CSSProperties, type ReactNode } from 'react'
import styles from './HireFluxCaseStudy.module.css'

export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
}

export function ProductCrop({ image, alt, x, y, width, height, eager = false }: {
  image: string; alt: string; x: number; y: number; width: number; height: number; eager?: boolean
}) {
  const cropStyle = { '--crop-ratio': `${width} / ${height}`, '--image-width': `${1440 / width * 100}%`, '--crop-x': `${-x / 1440 * 100}%`, '--crop-y': `${-y / 900 * 100}%` } as CSSProperties
  return <div className={styles.productCrop} style={cropStyle}><img src={image} alt={alt} width="1440" height="900" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} /></div>
}

export function CompetingPriorities() {
  return <figure className={styles.problemBoard} data-scene>
    <div className={styles.boardLabel}>Reconstruction from the Home audit <span>Not a historical screenshot</span></div>
    <div className={styles.prioritySurfaces}>
      <div className={styles.priorityHeader}><span>Header action</span><strong>Start here.</strong><i aria-hidden="true">↗</i><small>Operational Dashboard data</small></div>
      <div className={styles.priorityComing}><span>Coming next</span><strong>Or, here.</strong><i aria-hidden="true">↗</i><small>Another next-step surface</small></div>
      <div className={styles.priorityCenter}><span>Action Center</span><strong>This needs attention.</strong><div className={styles.fakeQueue} aria-hidden="true"><b /><b /><b /></div><small>Undated work and stage age gained urgency</small></div>
      <div className={styles.priorityFocus}><span>Progress focus</span><strong>What about this?</strong><div className={styles.fakeChart} aria-hidden="true"><i /><i /><i /><i /></div><small>Analytics with different thresholds</small></div>
    </div>
    <div className={styles.problemConsequence}><span aria-hidden="true">↳</span><strong>The candidate has to reconcile the interface.</strong></div>
    <figcaption>Audit-based illustration of competing priorities. Labels summarize the diagnosis; they do not quote the old UI.</figcaption>
  </figure>
}

const meaningExamples = [
  { label: 'Time in stage', fact: '14+ days in Applied', absent: 'No follow-up date recorded', earlier: 'Overdue', now: 'Suggested review', explanation: 'Age can justify a review cue. It cannot create a missed deadline.', code: 'STALE_APPLICATION' },
  { label: 'Undated next step', fact: 'Candidate owns the next step', absent: 'No due date recorded', earlier: 'Today', now: 'Undated next step', explanation: 'Useful work stays visible without acquiring a date the candidate never saved.', code: 'CANDIDATE_ACTION_UNDATED' },
]

export function MeaningCorrection() {
  const [selected, setSelected] = useState(0)
  const example = meaningExamples[selected]
  return <figure className={styles.meaningCorrection} id="decision-model">
    <div className={styles.scenarioControls} aria-label="Choose an audited classification example">{meaningExamples.map((item, i) => <button type="button" key={item.label} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.label}</button>)}</div>
    <div className={styles.meaningScene}>
      <div className={styles.savedFact}><span className={styles.smallLabel}>The recorded facts</span><strong>{example.fact}</strong><p>{example.absent}</p></div>
      <div className={styles.changedMeaning} aria-live="polite" aria-atomic="true" key={selected}>
        <div><span>Earlier classification</span><s>{example.earlier}</s></div><span className={styles.changeArrow} aria-hidden="true">→</span><div><span>Implemented meaning</span><strong>{example.now}</strong></div>
      </div>
    </div>
    <figcaption><strong>{example.explanation}</strong> Audited rule illustrated; no live request.</figcaption>
  </figure>
}

export function IterationSketches() {
  return <ol className={styles.iterationSketches} aria-label="Documented Home design progression">
    <li><div className={styles.sketchMany} aria-hidden="true"><i /><i /><i /><i /></div><span>Source / runtime audit</span><strong>Four competing answers</strong><p>Different producers. Different timing rules.</p></li>
    <li><div className={styles.sketchQueue} aria-hidden="true"><i /><i /><i /><i /></div><span>First composition reviewed</span><strong>One area, still a queue</strong><p>One authority, but too much to scan.</p></li>
    <li><div className={styles.sketchPeers} aria-hidden="true"><i /><i /><i /><b /></div><span>Implemented refinement</span><strong>Peers when peers are honest</strong><p>Focus only when supported. Quieter cues below.</p></li>
  </ol>
}

export function ProductEvidence() {
  return <figure className={styles.productEvidence}>
    <div className={styles.captureTop}><span>HireFlux / Home</span><span>Actual product · fictional demo data · Sep 29, 2026</span></div>
    <div className={styles.desktopProduct}><ProductCrop image="/projects/hireflux-home-light.png" alt="Actual HireFlux Home. Northwind has a saved overdue follow-up; Atlas has a follow-up due today; Orbit has a scheduled interview. Evergreen appears separately as a suggested review with no recorded deadline." x={270} y={200} width={1140} height={500} /></div>
    <div className={styles.mobileProduct}><ProductCrop image="/projects/hireflux-home-light.png" alt="Focused desktop product detail: Evergreen is labeled Suggested review, with no recorded deadline." x={278} y={548} width={630} height={144} /><img src="/projects/hireflux-home-mobile.png" alt="Actual dark-mode mobile Home: date-led follow-up commitments and the scheduled interview use a vertical reading order." width="390" height="844" loading="lazy" /></div>
    <div className={styles.productAnnotations}>
      <div><span className={styles.annotationLine} aria-hidden="true" /><strong>Keep commitments concrete.</strong><p>Saved dates, next steps, and unknown responsibility stay together.</p></div>
      <div><span className={styles.annotationLine} aria-hidden="true" /><strong>Let suggestions step back.</strong><p>Time in stage is a review cue. “No recorded deadline” preserves the boundary.</p></div>
    </div>
    <figcaption>September product milestone, not latest HEAD. Light desktop and dark mobile are actual product modes. <SourceLink href="/projects/hireflux-home-light.png">Full Home image</SourceLink></figcaption>
  </figure>
}

const layers = [
  { name: 'React + TypeScript', role: 'Present the meaning', detail: 'Zod validates API responses. TanStack Query handles server state and invalidation. The UI groups explicit action kinds and renders server-provided transitions.', label: 'Browser', artifact: 'Sep 26 · Overdue', context: 'Owner not recorded' },
  { name: 'FastAPI', role: 'Own the rules', detail: 'Routes → application/domain services → repository protocols. Signed identity determines the owner. Lifecycle rules and action derivation belong to this one backend.', label: 'One backend', artifact: 'FOLLOW_UP_OVERDUE', context: 'Derived from the saved date' },
  { name: 'DynamoDB Local', role: 'Protect the record', detail: 'Owner-qualified keys, keyed reads, sparse indexes, and conditional transactions. Canonical writes protect versions independently of eventually consistent index reads.', label: 'Local persistence', artifact: 'Follow-up: Sep 26', context: 'Owner-scoped application' },
]

export function SystemBlueprint() {
  const [selected, setSelected] = useState(1)
  return <figure className={styles.systemBlueprint}>
    <p className={styles.traceLabel}>Trace the saved September 26 follow-up <span>Reference day: September 29</span></p>
    <ol className={styles.systemFlow} aria-label="Implemented local request path">
      {layers.map((layer, i) => <li key={layer.name}>
        <span className={styles.smallLabel}>{layer.label}</span>
        <button type="button" className={styles.systemNode} aria-pressed={selected === i} aria-controls="layer-detail" onClick={() => setSelected(i)}>
          <span className={`${styles.layerGlyph} ${i === 0 ? styles.browserGlyph : i === 1 ? styles.serverGlyph : styles.dataGlyph}`} aria-hidden="true"><i /><i /><i /></span>
          <strong>{layer.name}</strong><span>{layer.role}</span>
          <span className={styles.systemArtifact}><b>{layer.artifact}</b><small>{layer.context}</small></span>
        </button>
        {i < 2 && <div className={styles.systemEdge} aria-hidden="true"><span>{i === 0 ? 'HTTP / JSON' : 'Keyed access'}</span>→</div>}
      </li>)}
    </ol>
    <p className={styles.responsePath}><span aria-hidden="true">←</span> A recorded date becomes a server action, then a qualified prompt.</p>
    <div id="layer-detail" className={styles.layerDetail} aria-live="polite" aria-atomic="true"><span>{layers[selected].name}</span><p key={selected}>{layers[selected].detail}</p></div>
    <figcaption>Implemented local runtime. Select a layer to inspect its responsibility. FastAPI is one modular monolith.</figcaption>
  </figure>
}

export function ConcurrencyScene() {
  // The initial state shows the complete outcome. Replay adds inspection, never comprehension.
  const [step, setStep] = useState<0 | 1 | 2>(2)
  return <figure className={styles.concurrencyScene} id="concurrency">
    <div className={styles.sceneCaption}><span>One application. Two open tabs.</span><span>Interactive contract illustration / no live backend</span></div>
    <p className={styles.sameRecord}>Both forms started from <strong>Northwind · version 1</strong>.</p>
    <div className={styles.editTabs}>
      <div className={styles.editTab} data-result={step >= 1 ? 'accepted' : 'ready'}><div className={styles.tabChrome}><span aria-hidden="true">●</span> Tab A <span>Loaded v1</span></div><label htmlFor="tab-a-company">Company name</label><input id="tab-a-company" value="Northwind Robotics" readOnly tabIndex={-1} /><div className={styles.versionComparison}><span>Expected <b>1</b></span><i aria-hidden="true">=</i><span>Stored <b>1</b></span><span className={styles.srOnly}>Versions match when A writes.</span></div><div className={styles.writeOutcome}><span>{step >= 1 ? '✓ Accepted → version 2' : 'Ready to save'}</span></div><button type="button" disabled={step !== 0} onClick={() => setStep(1)}>Save A’s edit</button></div>
      <div className={styles.editTab} data-result={step === 2 ? 'conflict' : 'ready'}><div className={styles.tabChrome}><span aria-hidden="true">●</span> Tab B <span>Loaded v1</span></div><label htmlFor="tab-b-company">Company name</label><input id="tab-b-company" value="Northwind Labs" readOnly tabIndex={-1} /><div className={styles.versionComparison}><span>Expected <b>1</b></span><i aria-hidden="true">{step >= 1 ? '≠' : '='}</i><span>Stored <b>{step >= 1 ? '2' : '1'}</b></span><span className={styles.srOnly}>{step >= 1 ? 'Versions no longer match for B.' : 'Versions still match before A writes.'}</span></div><div className={styles.writeOutcome}><span>{step === 2 ? '↳ Rejected → HTTP 409' : 'Still holds the old form'}</span></div><button type="button" disabled={step !== 1} onClick={() => setStep(2)}>Try B’s stale save</button></div>
    </div>
    <div className={styles.preservedRecord} role="status" aria-live="polite" aria-atomic="true"><span className={styles.smallLabel}>The record that remains</span><strong key={step}>{step === 0 ? 'Northwind' : 'Northwind Robotics'}</strong><p>{step === 0 ? 'Version 1 · both tabs have the same starting point.' : step === 1 ? 'Version 2 · A’s edit is saved. B still holds version 1.' : 'Version 2 · A’s newer edit survives B’s stale request.'}</p></div>
    <button type="button" className={styles.replayButton} onClick={() => setStep(0)}>↺ Replay the two edits</button>
    <figcaption>Writes carry <code>expected_version</code>. A conditional persistence operation compares it atomically; the failure is not an unprotected read-then-check. Conflicts require fresh state and retry, rather than automatic merging.</figcaption>
  </figure>
}

export function RetryScene() {
  const [retried, setRetried] = useState(true)
  return <figure className={styles.retryScene}>
    <div className={styles.retryPath}><div><span className={styles.smallLabel}>Request 1 / create</span><code>demo-visit-000001</code><div className={styles.lostResponse}><span aria-hidden="true">↛</span><strong>Response lost</strong></div></div><div className={styles.sharedWorkspace}><span className={styles.smallLabel}>Stored once</span><strong>Workspace W1</strong><span className={styles.readyState}>READY</span><p>Original owner + expiry</p></div><div><span className={styles.smallLabel}>Same-key retry</span><code>demo-visit-000001</code><strong>{retried ? '↳ Return W1' : 'Ready to retry'}</strong><p>{retried ? 'Reuse the stored identity.' : 'W1 remains ready.'}</p></div></div>
    <div className={styles.retryResult} role="status" aria-live="polite"><strong>{retried ? 'One visitor. One ready workspace.' : 'A lost response is not a lost creation.'}</strong><button type="button" onClick={() => setRetried(!retried)}>{retried ? 'Inspect before retry' : 'Retry the same key'} <span aria-hidden="true">→</span></button></div>
    <figcaption>Contract illustration, not a live session. PROVISIONING precedes seeding; READY permits replay. A fresh-key visit receives a different owner. Signed 24-hour expiry ends access; TTL cleanup is eventual.</figcaption>
  </figure>
}
