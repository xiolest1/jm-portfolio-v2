import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
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

export function HeroProduct() {
  return <figure className={styles.heroVisual} data-scene>
    <div className={styles.heroVisualStage}>
      <div className={styles.heroRecordLabel}><span className={styles.smallLabel}>The record</span><strong>One opportunity. <br />A changing context.</strong></div>
      <div className={styles.heroWindow}><div className={styles.windowBar}><span aria-hidden="true">● ● ●</span><span>HireFlux / opportunity</span></div><ProductCrop image="/projects/hireflux-opportunity-dark.png" alt="HireFlux application detail for fictional Northwind Robotics: Applied stage, a saved September 26 check-back date, and an opportunity journey." x={270} y={155} width={1140} height={620} eager /></div>
      <div className={styles.heroMeaning}><span className={styles.smallLabel}>The useful interpretation</span><strong><span aria-hidden="true">↳</span> Follow up</strong><p>A saved date supports the prompt.</p></div>
      <svg className={styles.heroConnection} viewBox="0 0 600 430" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M70 70 H220 Q250 70 250 100 V140 M440 310 V370 Q440 390 420 390 H340" /></svg>
    </div>
    <figcaption>Actual local product; fictional data, Sep 29, 2026. Surrounding labels are case-study annotations.</figcaption>
  </figure>
}

export function CompetingPriorities() {
  return <figure className={styles.problemBoard} data-scene>
    <div className={styles.boardLabel}><span>Home / source & runtime audit</span><span>Illustrated reconstruction</span></div>
    <div className={styles.signalField}>
      <svg className={styles.signalPaths} viewBox="0 0 640 400" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M130 80 C130 155 320 80 320 200" /><path d="M510 95 C430 95 400 160 320 200" /><path d="M155 325 C150 245 290 280 320 200" /><path d="M510 315 C410 320 350 275 320 200" /></svg>
      <div className={styles.signalHeader}><span>Header action</span><strong>Start here</strong><small>Dashboard producer</small></div>
      <div className={styles.signalComing}><span>Coming next</span><strong>Or here</strong><small>Another next-step surface</small></div>
      <div className={styles.signalCenter}><span>Action Center</span><strong>Needs attention</strong><small>Undated work gained urgency</small></div>
      <div className={styles.signalFocus}><span>Progress focus</span><strong>What about this?</strong><small>Analytics / different thresholds</small></div>
      <div className={styles.signalQuestion}><span aria-hidden="true">?</span><strong>Which answer<br />should I trust?</strong></div>
    </div>
    <figcaption>Four priority surfaces made the candidate reconcile the interface. This illustrates the audit; it is not a historical screenshot or verbatim UI copy.</figcaption>
  </figure>
}

const meaningExamples = [
  { label: 'Time in stage', fact: '14+ days in Applied', field: 'Saved deadline', value: 'Not recorded', earlier: 'Overdue', now: 'Suggested review', explanation: 'Age can justify a review cue. It cannot create a missed deadline.', code: 'STALE_APPLICATION', kind: 'suggested' },
  { label: 'Undated next step', fact: 'Candidate owns the next step', field: 'Due date', value: 'Not recorded', earlier: 'Today', now: 'Undated next step', explanation: 'Useful work stays visible without acquiring a date the candidate never saved.', code: 'CANDIDATE_ACTION_UNDATED', kind: 'undated' },
  { label: 'Recorded follow-up', fact: 'Check back on September 26', field: 'Reference day', value: 'September 29', earlier: 'Saved date', now: 'Overdue follow-up', explanation: 'A recorded date supports a time-based prompt. This is different from time in stage.', code: 'FOLLOW_UP_OVERDUE', kind: 'dated' },
] as const

export function MeaningCorrection() {
  const [selected, setSelected] = useState(0)
  const example = meaningExamples[selected]
  return <figure className={styles.meaningCorrection} id="decision-model" data-scene>
    <div className={styles.scenarioControls} aria-label="Inspect an action classification">{meaningExamples.map((item, i) => <button type="button" key={item.label} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.label}</button>)}</div>
    <div className={styles.meaningScene} data-kind={example.kind}>
      <div className={styles.savedFact}><span className={styles.smallLabel}>Recorded evidence</span><strong>{example.fact}</strong><dl><dt>{example.field}</dt><dd>{example.value}</dd></dl></div>
      <div className={styles.evidenceBridge} aria-hidden="true"><span /><b>Evidence boundary</b><span /></div>
      <div className={styles.meaningOutput} aria-live="polite" aria-atomic="true"><span className={styles.smallLabel}>Implemented interpretation</span><strong key={selected}>{example.now}</strong><code>{example.code}</code></div>
    </div>
    <div className={styles.meaningFoot}><p>{selected === 2 ? <><span className={styles.smallLabel}>The distinction</span> A deadline is known here.</> : <><span className={styles.smallLabel}>The rejected shortcut</span> <s>{example.earlier}</s></>}</p><strong>{example.explanation}</strong></div>
    <figcaption>Inspect one rule at a time. Contract illustration, not a live request or predictive ranking.</figcaption>
  </figure>
}

export function IterationSketches() {
  const [focal, setFocal] = useState(false)
  return <ol className={styles.iterationSketches} aria-label="Documented Home design progression" data-scene>
    <li><div className={styles.sketchMany} aria-hidden="true"><i /><i /><i /><i /></div><span>Investigate / source + runtime</span><strong>Four competing answers</strong><p>Different producers and timing rules.</p></li>
    <li><div className={styles.sketchQueue} aria-hidden="true"><i /><i /><i /><i /></div><span>Consolidate / first design review</span><strong>One area, still a queue</strong><p>Correct authority. Too much to scan.</p></li>
    <li><div className={styles.sketchPeers} data-focal={focal} aria-hidden="true"><i /><i /><i /><b /></div><span>Refine / implemented hybrid</span><strong>Peers, unless focus is earned</strong><p aria-live="polite">{focal ? 'One due commitment; healthy Dashboard source. Other classes step back.' : 'Multiple recorded commitments remain peers. No invented winner.'}</p><button type="button" className={styles.sketchControl} aria-pressed={focal} onClick={() => setFocal(value => !value)}>{focal ? 'Return to peers' : 'Inspect supported focus'} <span aria-hidden="true">↔</span></button></li>
  </ol>
}

const productViews = [
  { label: 'The whole decision area', x: 270, y: 200, width: 1140, height: 500, alt: 'Actual light Home: saved overdue and due-today follow-ups, a scheduled interview, and a separate suggested review with no recorded deadline.' },
  { label: 'A recorded commitment', x: 278, y: 275, width: 374, height: 242, alt: 'Northwind Robotics follow-up card: saved September 26 check-back, marked overdue relative to the September 29 capture, with owner not recorded.' },
  { label: 'A qualified suggestion', x: 278, y: 545, width: 660, height: 148, alt: 'Evergreen appears under Suggested review: fourteen days in stage, no recorded deadline, a review cue rather than a dated commitment.' },
] as const

export function ProductEvidence() {
  const [view, setView] = useState(0)
  const crop = productViews[view]
  return <figure className={styles.productEvidence} data-scene>
    <div className={styles.productStage}>
      <div className={styles.captureTop}><span>Home / Action Center</span><span>Actual product · Sep 29 milestone</span></div>
      <div className={styles.desktopProduct} data-view={view}><ProductCrop image="/projects/hireflux-home-light.png" {...crop} /></div>
      <div className={styles.mobileProduct}><div className={styles.mobileHomeCrop}><img src="/projects/hireflux-home-mobile.png" alt="Cropped actual dark mobile Home: Northwind’s saved-date follow-up stays beside the date and unknown ownership." width="390" height="844" loading="lazy" /></div><div className={styles.mobileSuggestion}><span className={styles.smallLabel}>A suggestion / desktop detail</span><ProductCrop image="/projects/hireflux-home-light.png" alt="Actual product sentence: No recorded deadline." x={635} y={617} width={280} height={30} /></div></div>
      <div className={styles.productLens} aria-label="Inspect the real desktop product">{productViews.map((item, i) => <button type="button" key={item.label} aria-pressed={view === i} onClick={() => setView(i)}>{i === 0 ? 'Overview' : i === 1 ? 'Commitment' : 'Suggestion'}<span className={styles.srOnly}>: {item.label}</span></button>)}</div>
    </div>
    <div className={styles.productAnnotations}><div><span className={styles.annotationNumber}>01</span><div><strong>A date is a commitment.</strong><p>Saved dates and responsibility stay beside the next step. Unknown ownership stays unknown.</p></div></div><div><span className={styles.annotationNumber}>02</span><div><strong>A suggestion is a suggestion.</strong><p>Stage age stays visible with quieter emphasis and an explicit “No recorded deadline” boundary.</p></div></div></div>
    <figcaption>Fictional local data. These September captures are not the latest HEAD. Light desktop and dark mobile are actual HireFlux modes. <SourceLink href="/projects/hireflux-home-light.png">Open full Home capture</SourceLink></figcaption>
  </figure>
}

const layers = [
  { name: 'React + TypeScript', role: 'Explain the action', detail: 'Zod validates responses; TanStack Query manages server state and invalidation. The client groups explicit action kinds and renders server-provided transitions.' },
  { name: 'FastAPI', role: 'Derive and enforce', detail: 'Routes → application/domain services → repository protocols. The signed identity chooses owner scope. One modular monolith owns action derivation and lifecycle rules.' },
  { name: 'DynamoDB Local', role: 'Keep the facts', detail: 'Owner-qualified keys, keyed reads, sparse indexes, and conditional transactions. Canonical version checks do not rely on eventually consistent index reads.' },
] as const

export function SystemBlueprint() {
  const [selected, setSelected] = useState(1)
  const [trace, setTrace] = useState(0)
  const [phase, setPhase] = useState(2)
  const [tracing, setTracing] = useState(false)
  useEffect(() => {
    if (!tracing) return
    const action = window.setTimeout(() => setPhase(1), 700)
    const prompt = window.setTimeout(() => setPhase(2), 1400)
    const finish = window.setTimeout(() => setTracing(false), 2100)
    return () => { clearTimeout(action); clearTimeout(prompt); clearTimeout(finish) }
  }, [tracing])
  const traceDate = () => {
    if (tracing) { setTracing(false); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase(n => (n + 1) % 3); return }
    setPhase(0); setTrace(n => n + 1); setTracing(true)
  }
  const stations = [{ label: '01 / Saved fact', value: 'September 26', note: 'A check-back date recorded on the application.' }, { label: '02 / Server action', value: 'FOLLOW_UP_OVERDUE', note: 'Derived against the September 29 reference day.' }, { label: '03 / Human prompt', value: 'Follow up · Overdue', note: 'The date stays explicit; ownership stays unknown.' }]
  return <figure className={styles.systemBlueprint} data-scene>
    <div className={styles.systemCutaway} data-trace={trace} data-phase={phase} data-tracing={tracing}>
      <div className={styles.browserLayer}><button type="button" aria-pressed={selected === 0} aria-controls="layer-detail" onClick={() => setSelected(0)}><span className={styles.smallLabel}>Browser</span><strong>React + TypeScript</strong><span>Validated responses · server-state handling</span></button><div className={styles.traceArtifact}><span>Candidate sees</span><strong>Follow up · Overdue</strong><small>Sep 26 / owner not recorded</small></div></div>
      <div className={styles.transportLine}><span>HTTP / JSON <span aria-hidden="true">↓</span></span><span className={styles.returnMeaning}>Qualified meaning <span aria-hidden="true">↑</span></span></div>
      <div className={styles.backendBoundary}><div className={styles.backendTitle}><button type="button" aria-pressed={selected === 1} aria-controls="layer-detail" onClick={() => setSelected(1)}><span className={styles.smallLabel}>One backend / modular monolith</span><strong>FastAPI</strong></button><span className={styles.identityGate}>Signed demo identity → owner scope</span></div><ol className={styles.backendModules}><li><span>Routes</span><strong>Validate access</strong></li><li><span>Application + domain</span><strong>Derive action · enforce rules</strong><code>FOLLOW_UP_OVERDUE</code></li><li><span>Repository protocols</span><strong>Request keyed persistence</strong></li></ol></div>
      <div className={styles.transportLine}><span>Keyed access <span aria-hidden="true">↓</span></span><span>Saved facts <span aria-hidden="true">↑</span></span></div>
      <div className={styles.storageLayer}><button type="button" aria-pressed={selected === 2} aria-controls="layer-detail" onClick={() => setSelected(2)}><span className={styles.smallLabel}>Local persistence</span><strong>DynamoDB Local</strong><span>Owner-qualified keys · conditional writes</span></button><div className={styles.traceArtifact}><span>Stored record</span><strong>Follow-up: Sep 26</strong><small>No priority score stored</small></div></div>
      <span className={styles.traceRunner} key={trace} data-running={tracing} aria-hidden="true" />
    </div>
    <div className={styles.systemInspection}><div id="layer-detail" aria-live="polite" aria-atomic="true"><span className={styles.smallLabel}>{layers[selected].role}</span><h3>{layers[selected].name}</h3><p key={selected}>{layers[selected].detail}</p></div><div className={styles.traceReadout} data-phase={phase}><span className={styles.smallLabel}>{stations[phase].label}</span><strong key={phase}>{stations[phase].value}</strong><p>{stations[phase].note}</p><div className={styles.traceSteps} aria-label="Inspect a trace station">{stations.map((station, i) => <button type="button" key={station.label} aria-pressed={phase === i} onClick={() => { setTracing(false); setPhase(i) }}><span className={styles.srOnly}>{station.label}</span><span aria-hidden="true">0{i + 1}</span></button>)}</div></div><button type="button" className={styles.traceButton} onClick={traceDate}><span aria-hidden="true">↥</span>{tracing ? 'Stop trace' : 'Trace the saved date'}</button><p className={styles.provenance}>One fact, three representations. Illustration, not a live request. With reduced motion, use the station controls or advance with Trace.</p><p className={styles.srOnly} role="status">{tracing ? 'Tracing the saved date.' : `Trace station: ${stations[phase].label}. ${stations[phase].value}.`}</p></div>
    <figcaption>Implemented local runtime. The inner modules are boundaries within one FastAPI application, not separate services. Select a layer for implementation detail.</figcaption>
  </figure>
}

export function ConcurrencyScene() {
  // The final outcome is the baseline. Playback is optional and cancellable.
  const [step, setStep] = useState(2)
  const [playing, setPlaying] = useState(false)
  const [flight, setFlight] = useState<'a' | 'b' | null>(null)
  useEffect(() => {
    if (!playing) return
    const a = window.setTimeout(() => { setStep(1); setFlight(null) }, 650)
    const sendB = window.setTimeout(() => setFlight('b'), 950)
    const b = window.setTimeout(() => { setStep(2); setFlight(null) }, 1550)
    const finish = window.setTimeout(() => setPlaying(false), 1750)
    return () => { clearTimeout(a); clearTimeout(sendB); clearTimeout(b); clearTimeout(finish) }
  }, [playing])
  const choose = (value: number) => { setPlaying(false); setFlight(null); setStep(value) }
  const replay = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { choose(0); return }
    setStep(0); setFlight('a'); setPlaying(true)
  }
  return <figure className={styles.concurrencyScene} id="concurrency" data-scene data-step={step} data-playing={playing} data-flight={flight}>
    <div className={styles.sceneCaption}><span>One application / two open tabs</span><span>Contract illustration · no live backend</span></div>
    <div className={styles.collisionStage}>
      <div className={styles.editTabs}>
        <div className={styles.editTab} data-result={step >= 1 ? 'accepted' : 'ready'}><div className={styles.tabChrome}><span>Tab A</span><code>Loaded v1</code></div><span className={styles.fieldLabel}>Company name</span><strong>Northwind Robotics</strong><p>Expected version <b>1</b></p><span className={styles.writeOutcome}>{step >= 1 ? '✓ A commits version 2' : flight === 'a' ? 'Sending A’s version 1 edit…' : 'Both tabs started at v1'}</span></div>
        <div className={styles.editTab} data-result={step === 2 ? 'conflict' : 'ready'}><div className={styles.tabChrome}><span>Tab B</span><code>Loaded v1</code></div><span className={styles.fieldLabel}>Company name</span><strong>Northwind Labs</strong><p>Expected version <b>1</b></p><span className={styles.writeOutcome}>{step === 2 ? '↳ B receives HTTP 409' : flight === 'b' ? 'Checking B’s v1 against stored v2…' : 'B still holds the old form'}</span></div>
      </div>
      <div className={styles.writeTracks} aria-hidden="true"><svg viewBox="0 0 800 115" preserveAspectRatio="none" fill="none"><path className={styles.acceptedPath} d="M200 0 V30 Q200 55 225 55 H370 Q400 55 400 85 V115" /><path className={styles.conflictPath} d="M600 0 V30 Q600 55 575 55 H430" /><path d="M440 38 V72 M449 38 V72" /></svg><span className={styles.acceptedPacket} key={`a-${flight}`} /><span className={styles.conflictPacket} key={`b-${flight}`} /></div>
      <div className={styles.conditionGate}><code>expected_version</code><span>{step >= 1 ? 'B: 1 ≠ stored 2' : 'Stored version: 1'}</span><strong>Atomic write condition</strong></div>
      <div className={styles.preservedRecord} role="status" aria-live="polite" aria-atomic="true"><div><span className={styles.smallLabel}>Canonical record / survives</span><strong key={step}>{step === 0 ? 'Northwind' : 'Northwind Robotics'}</strong></div><span className={styles.versionSeal}>v{step === 0 ? '1' : '2'}</span><p>{step === 0 ? 'Version 1 · both tabs have the same starting point.' : step === 1 ? 'Version 2 · A’s edit is saved. B still holds version 1.' : 'Version 2 · A’s newer edit survives B’s stale request.'}</p></div>
    </div>
    <div className={styles.playbackControls} aria-label="Inspect the write sequence"><div>{['Same starting point', 'A saves first', 'B is rejected'].map((label, i) => <button type="button" key={label} aria-pressed={step === i} onClick={() => choose(i)}><span aria-hidden="true">0{i + 1}</span>{label}</button>)}</div><button type="button" onClick={playing ? () => { setPlaying(false); setFlight(null) } : replay}>{playing ? 'Stop replay' : 'Replay collision'} <span aria-hidden="true">{playing ? '■' : '↺'}</span></button></div>
    <figcaption><strong>Protect newer work rather than silently merge stale edits.</strong> Conditional persistence checks the version atomically. A conflict needs fresh state and retry; it is not a read-then-check guarantee.</figcaption>
  </figure>
}

export function RetryScene() {
  const [fresh, setFresh] = useState(false)
  return <figure className={styles.retryScene} data-scene data-fresh={fresh}>
    <div className={styles.retryStory}>
      <div className={styles.retryRequest}><span className={styles.smallLabel}>First creation / response lost</span><code>demo-visit-000001</code><strong>Created W1. <br />The reply never arrives.</strong></div>
      <div className={styles.workspaceSeal}><span className={styles.smallLabel}>Already stored</span><strong>W1</strong><span className={styles.readyState}>READY</span><small>Original owner + expiry</small></div>
      <div className={styles.retryReturn} aria-live="polite" aria-atomic="true">
        <span className={styles.smallLabel}>{fresh ? 'New-key visitor' : 'Same-key retry'}</span>
        <code>{fresh ? 'demo-visit-000002' : 'demo-visit-000001'}</code>
        <strong key={String(fresh)}>{fresh ? 'Create W2.' : 'Return W1.'}</strong>
        <p>{fresh ? 'A different owner. W1 stays isolated.' : 'Recover the original identity and expiry.'}</p>
        {fresh && <div className={styles.newWorkspace}><span aria-hidden="true">↓</span><strong>W2</strong><span>Separate owner + expiry</span></div>}
      </div>
      <svg className={styles.retryLoop} viewBox="0 0 1000 220" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d={fresh ? 'M250 65 H400' : 'M250 65 H400 M600 65 H750 M750 145 V175 Q750 200 725 200 H525 Q500 200 500 175 V145'} /></svg>
    </div>
    <div className={styles.retryControls} aria-label="Inspect demo identity behavior"><button type="button" aria-pressed={!fresh} onClick={() => setFresh(false)}>Same key / same workspace</button><button type="button" aria-pressed={fresh} onClick={() => setFresh(true)}>Fresh key / different owner</button></div>
    <figcaption>Contract illustration, not a live session. PROVISIONING precedes seeding; READY and unexpired permits replay. Signed 24-hour expiry denies access; TTL cleanup is eventual. Seed failure never grants a usable session.</figcaption>
  </figure>
}
