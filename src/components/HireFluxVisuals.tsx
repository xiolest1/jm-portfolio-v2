import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './HireFluxCaseStudy.module.css'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])
  return reduced
}

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
    <div className={styles.boardLabel}><span>Candidate situation / fictional demo data</span><span>Earlier Home / conceptual reconstruction</span></div>
    <div className={styles.beforeExperience}>
      <div className={styles.beforeRecords}><span className={styles.smallLabel}>Two applications in the same search</span><div><strong>Northwind Robotics</strong><span>Check back Sep 26 · saved date</span></div><div><strong>Evergreen Media</strong><span>Applied 14+ days · no saved date</span></div><p>One is a recorded commitment. The other might be worth reviewing.</p></div>
      <div className={styles.beforePrompts}><span className={styles.smallLabel}>Earlier Home could point in several directions</span><div><span>Header action</span><strong>A next step</strong></div><div><span>Coming next</span><strong>Another next step</strong></div><div><span>Action Center</span><strong>Undated work appeared urgent</strong></div><div><span>Progress focus</span><strong>Time in stage appeared overdue</strong></div></div>
    </div>
    <div className={styles.beforeConsequence}><strong>What is actually due?</strong><p>The screen asked the candidate to reconcile four sources of guidance. The audit found different producers and timing rules behind them.</p></div>
    <figcaption>Reconstructed from source inspection and one fictional demo session. The panels show the documented conflict, not a historical screenshot or verbatim UI copy.</figcaption>
  </figure>
}

const meaningExamples = [
  { label: 'No follow-up date', date: 'None saved', result: 'Suggested review', message: 'Review application after at least 14 days in this stage. No recorded deadline.', rule: 'Time in Applied supports a review suggestion. With no saved date, there is no missed deadline.', why: 'HireFlux can suggest that the candidate look again. It cannot call this application overdue.', announcement: 'No saved follow-up date. HireFlux suggests a review without a due date.', kind: 'suggested' },
  { label: 'Add a past follow-up date', date: 'Sep 26, 2026', result: 'Overdue follow-up', message: 'Check back on the saved September 26 date.', rule: 'A recorded follow-up date is earlier than the September 29 reference day.', why: 'The saved date supports a time-based prompt. The stage-age review cue may also remain available separately.', announcement: 'Past follow-up date saved. HireFlux returns an overdue follow-up; the stage-age suggestion may also remain.', kind: 'dated' },
] as const

export function MeaningCorrection() {
  const [selected, setSelected] = useState(0)
  const example = meaningExamples[selected]
  return <figure className={styles.meaningCorrection} id="decision-model" data-scene>
    <div className={styles.exampleHeader}><div><span className={styles.smallLabel}>Follow one fictional application</span><h4>Evergreen Media · Data Analyst</h4><p>Applied for at least 14 days. Reference day: September 29, 2026.</p></div><span className={styles.exampleTag}>Illustrated contract</span></div>
    <div className={styles.scenarioControls} aria-label="Change the saved follow-up date">{meaningExamples.map((item, i) => <button type="button" key={item.label} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.label}</button>)}</div>
    <div className={styles.meaningJourney} data-kind={example.kind}>
      <div className={styles.exampleRecord}><span className={styles.smallLabel}>01 / Saved application</span><strong>Evergreen Media</strong><dl><div><dt>Current stage</dt><dd>Applied · 14+ days</dd></div><div className={styles.variableFact}><dt>Follow-up date</dt><dd key={selected}>{example.date}</dd></div></dl></div>
      <div className={styles.exampleRule}><span className={styles.smallLabel}>02 / What HireFlux knows</span><p key={selected}>{example.rule}</p></div>
      <div className={styles.exampleHome}><span className={styles.smallLabel}>03 / What the candidate sees on Home</span><div key={selected} className={styles.exampleHomeMessage}><span>{example.kind === 'dated' ? 'Recorded commitment' : 'Time in stage'}</span><strong>{example.result}</strong><p>{example.message}</p></div></div>
      <span className={styles.meaningHandoff} key={selected} aria-hidden="true" />
    </div>
    <div className={styles.exampleWhy}><span className={styles.smallLabel}>Why this is right</span><p key={selected}>{example.why}</p></div>
    <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{example.announcement}</p>
    <figcaption>The default no-date example matches Evergreen’s actual September Home capture below. Adding a date here is an illustrated variation of the implemented rules, not a screenshot of Evergreen changing state. The precise action kinds are in the <a href="#evidence-product">Home contract</a>.</figcaption>
  </figure>
}

export function IterationSketches() {
  const [focal, setFocal] = useState(false)
  return <ol className={styles.iterationSketches} aria-label="Documented Home design progression" data-scene>
    <li><div className={styles.iterationMock}><span>Before · separate guidance</span><div><small>Header</small><strong>Start here</strong></div><div><small>Coming next</small><strong>Then here?</strong></div><div><small>Action Center</small><strong>Needs attention</strong></div></div><span>01 / investigate</span><strong>Several sources proposed the next step.</strong><p>The candidate had to reconcile them.</p></li>
    <li><div className={styles.iterationMock}><span>First pass · one authority</span><div><small>01</small><strong>Follow up</strong></div><div><small>02</small><strong>Interview</strong></div><div><small>03</small><strong>Review application</strong></div></div><span>02 / consolidate</span><strong>The rules agreed; the layout still read as a queue.</strong><p>Correct meaning alone did not make the scan easy.</p></li>
    <li><div className={styles.iterationMock} data-focal={focal}><span>Refined · current structure</span><div className={styles.iterationPrimary}><small>{focal ? 'One saved date is due' : 'Recorded commitments'}</small><strong>{focal ? 'Follow up today' : 'Follow-ups · interviews'}</strong></div><div><small>{focal ? 'Still available' : 'Separate class'}</small><strong>Suggested review</strong></div></div><span>03 / compose</span><strong>Emphasis follows the record.</strong><p aria-live="polite">{focal ? 'One qualifying due commitment can lead when Dashboard evidence is healthy.' : 'Multiple commitments remain peers; suggestions are visibly quieter.'}</p><button type="button" className={styles.sketchControl} aria-pressed={focal} onClick={() => setFocal(value => !value)}>{focal ? 'Show peer state' : 'See supported focus'} <span aria-hidden="true">↔</span></button></li>
  </ol>
}

const productViews = [
  { label: 'Evergreen suggestion', note: 'An undated review stays quieter than recorded commitments.', x: 278, y: 545, width: 660, height: 148, alt: 'Actual Home: Evergreen Media appears under Suggested review after at least 14 days in stage, with no recorded deadline.' },
  { label: 'A recorded commitment', note: 'Northwind’s saved September 26 date supports an overdue follow-up.', x: 278, y: 275, width: 374, height: 242, alt: 'Northwind Robotics follow-up card: saved September 26 check-back, marked overdue relative to the September 29 capture, with owner not recorded.' },
  { label: 'The whole decision area', note: 'Dated commitments and quieter suggestions share one decision area.', x: 270, y: 200, width: 1140, height: 500, alt: 'Actual light Home: saved overdue and due-today follow-ups, a scheduled interview, and a separate suggested review with no recorded deadline.' },
] as const

export function ProductEvidence() {
  const [view, setView] = useState(0)
  return <figure className={styles.productEvidence} data-scene>
    <div className={styles.productStage}>
      <div className={styles.captureTop}><span>Home / Action Center</span><span>Actual product · Sep 29 milestone</span></div>
      <div className={styles.desktopProduct}>{productViews.map((crop, i) => <div className={styles.productView} data-view={i} data-active={view === i} aria-hidden={view !== i} key={crop.label}><ProductCrop image="/projects/hireflux-home-light.png" {...crop} /></div>)}</div>
      <div className={styles.mobileProduct}><span className={styles.smallLabel}>Mobile capture / Northwind’s saved follow-up</span><div className={styles.mobileHomeCrop}><img src="/projects/hireflux-home-mobile.png" alt="Cropped actual dark mobile Home: Northwind’s saved September 26 follow-up is marked overdue, with the date and unknown responsibility visible." width="390" height="844" loading="lazy" /></div><div className={styles.mobileProductNote}><span className={styles.smallLabel}>Another opportunity in the actual desktop capture</span><strong>Evergreen Media · Suggested review</strong><p>Applied at least 14 days. No recorded deadline. This remains a quieter review cue below the dated commitments.</p></div></div>
      <p className={styles.lensExplanation} key={view} aria-live="polite">{productViews[view].note}</p>
      <div className={styles.productLens} aria-label="Inspect the real desktop product">{productViews.map((item, i) => <button type="button" key={item.label} aria-pressed={view === i} onClick={() => setView(i)}>{i === 0 ? 'Evergreen suggestion' : i === 1 ? 'Northwind follow-up' : 'Whole Home'}<span className={styles.srOnly}>: {item.label}</span></button>)}</div>
    </div>
    <div className={styles.productAnnotations}><div><span className={styles.annotationNumber}>01</span><div><strong>Evergreen: review, no due date.</strong><p>Time in Applied appears below the dated commitments as a quieter suggestion with “No recorded deadline.”</p></div></div><div><span className={styles.annotationNumber}>02</span><div><strong>Northwind: a saved commitment.</strong><p>The September 26 check-back appears as an overdue follow-up. Unknown responsibility stays labeled unknown.</p></div></div></div>
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
  const [phase, setPhase] = useState(2)
  const [tracing, setTracing] = useState(false)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopOnPreferenceChange = () => {
      if (preference.matches) { setTracing(false); setPhase(2) }
    }
    preference.addEventListener('change', stopOnPreferenceChange)
    return () => preference.removeEventListener('change', stopOnPreferenceChange)
  }, [])
  useEffect(() => {
    if (!tracing || reducedMotion) return
    const action = window.setTimeout(() => setPhase(1), 440)
    const prompt = window.setTimeout(() => setPhase(2), 880)
    const finish = window.setTimeout(() => setTracing(false), 1200)
    return () => { clearTimeout(action); clearTimeout(prompt); clearTimeout(finish) }
  }, [tracing, reducedMotion])
  const traceDate = () => { if (tracing) { setTracing(false); return }; setPhase(0); if (!reducedMotion) setTracing(true) }
  const stations = [
    { label: 'Saved application', title: 'Northwind · Sep 26', note: 'A check-back date was recorded on the opportunity.', role: 'DynamoDB Local' },
    { label: 'Backend decision', title: 'Overdue follow-up', note: 'FastAPI compares the saved date with September 29 and returns an action.', role: 'FastAPI' },
    { label: 'Home presentation', title: 'Follow up · Overdue', note: 'React displays that dated action, including the saved date and unknown responsibility.', role: 'React + TypeScript' },
  ]
  return <figure className={styles.systemBlueprint} data-scene>
    <div className={styles.flowControls}><div role="group" aria-label="Inspect the saved date through the system">{stations.map((station, i) => <button type="button" key={station.label} aria-pressed={phase === i} onClick={() => { setTracing(false); setPhase(i) }}>{i + 1}. {station.label}</button>)}</div><button type="button" onClick={traceDate}>{tracing ? 'Stop sequence' : reducedMotion ? 'Inspect starting fact' : 'Play the three steps'} <span aria-hidden="true">{tracing ? '■' : '↗'}</span></button></div>
    <div className={styles.systemFactFlow} data-phase={phase}>
      {stations.map((station, i) => <div key={station.label} className={styles.flowStation} data-active={phase === i} data-traversed={phase > i}><span className={styles.smallLabel}>0{i + 1} / {station.label}</span><strong>{station.title}</strong><p>{station.note}</p><small>{station.role}</small></div>)}
    </div>
    <div className={styles.architectureBand} data-layer={selected}><div><span className={styles.smallLabel}>How the local application makes that possible</span><h3>One backend decides.<br />The browser explains.</h3><p>The React client requests Home data. One FastAPI application reads the saved facts through repository protocols, applies the action rules, and returns the result. DynamoDB Local stores the record.</p></div><div className={styles.architecturePicker}><div role="group" aria-label="Inspect an implementation layer">{layers.map((layer, i) => <button type="button" key={layer.name} aria-pressed={selected === i} aria-controls="layer-detail" onClick={() => setSelected(i)}>{layer.name}</button>)}</div><div id="layer-detail" aria-live="polite" aria-atomic="true"><span className={styles.smallLabel}>{layers[selected].role}</span><p key={selected}>{layers[selected].detail}</p></div></div></div>
    <figcaption>The upper sequence follows one saved fact conceptually; it is not a live request trace. The lower band names the implemented local layers. FastAPI's routes, services, and repository protocols are modules within one application. <a href="#evidence-system">Inspect the architecture and identity boundary</a>.</figcaption>
  </figure>
}

export function ConcurrencyScene() {
  // The final outcome is the baseline. Playback is optional and cancellable.
  const reducedMotion = useReducedMotion()
  const [step, setStep] = useState(2)
  const [playing, setPlaying] = useState(false)
  const [flight, setFlight] = useState<'a' | 'b' | null>(null)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopOnPreferenceChange = () => {
      if (preference.matches) { setPlaying(false); setFlight(null); setStep(2) }
    }
    preference.addEventListener('change', stopOnPreferenceChange)
    return () => preference.removeEventListener('change', stopOnPreferenceChange)
  }, [])
  useEffect(() => {
    if (!playing || reducedMotion) return
    const a = window.setTimeout(() => { setStep(1); setFlight(null) }, 650)
    const sendB = window.setTimeout(() => setFlight('b'), 950)
    const b = window.setTimeout(() => { setStep(2); setFlight(null) }, 1550)
    const finish = window.setTimeout(() => setPlaying(false), 1750)
    return () => { clearTimeout(a); clearTimeout(sendB); clearTimeout(b); clearTimeout(finish) }
  }, [playing, reducedMotion])
  const choose = (value: number) => { setPlaying(false); setFlight(null); setStep(value) }
  const replay = () => {
    if (reducedMotion) { choose(0); return }
    setStep(0); setFlight('a'); setPlaying(true)
  }
  return <figure className={styles.concurrencyScene} id="concurrency" data-scene data-step={step} data-playing={playing} data-flight={flight}>
    <div className={styles.sceneCaption}><span>One application / two open tabs</span><span>Contract illustration · no live backend</span></div>
    <div className={styles.playbackControls} aria-label="Inspect the write sequence"><div>{['Both tabs read v1', 'A saves version 2', 'B’s old save is rejected'].map((label, i) => <button type="button" key={label} aria-pressed={step === i} onClick={() => choose(i)}><span aria-hidden="true">0{i + 1}</span>{label}</button>)}</div><button type="button" onClick={playing ? () => { setPlaying(false); setFlight(null) } : replay}>{playing ? 'Stop replay' : reducedMotion ? 'Inspect starting state' : 'Replay the two writes'} <span aria-hidden="true">{playing ? '■' : '↺'}</span></button></div>
    <div className={styles.collisionStage}>
      <div className={styles.editTabs}>
        <div className={styles.editTab} data-result={step >= 1 ? 'accepted' : 'ready'}><div className={styles.tabChrome}><span>Tab A</span><code>Loaded v1</code></div><span className={styles.fieldLabel}>Company name</span><strong>Northwind Robotics</strong><p>Expected version <b>1</b></p><span className={styles.writeOutcome}>{step >= 1 ? '✓ A commits version 2' : flight === 'a' ? 'Sending A’s version 1 edit…' : 'Both tabs started at v1'}</span></div>
        <div className={styles.editTab} data-result={step === 2 ? 'conflict' : 'ready'}><div className={styles.tabChrome}><span>Tab B</span><code>Loaded v1</code></div><span className={styles.fieldLabel}>Company name</span><strong>Northwind Labs</strong><p>Expected version <b>1</b></p><span className={styles.writeOutcome}>{step === 2 ? '↳ B receives HTTP 409' : flight === 'b' ? 'Checking B’s v1 against stored v2…' : 'B still holds the old form'}</span></div>
      </div>
      <div className={styles.writeTracks} aria-hidden="true"><svg viewBox="0 0 800 115" preserveAspectRatio="none" fill="none"><path className={styles.acceptedPath} d="M200 0 V30 Q200 55 225 55 H370 Q400 55 400 85 V115" /><path className={styles.conflictPath} d="M600 0 V30 Q600 55 575 55 H430" /><path d="M440 38 V72 M449 38 V72" /></svg><span className={styles.acceptedPacket} key={`a-${flight}`} /><span className={styles.conflictPacket} key={`b-${flight}`} /></div>
      <div className={styles.conditionGate}><code>expected_version</code><span>{step === 0 ? 'Stored version: 1' : step === 1 ? 'Stored version: 2' : 'B: 1 ≠ stored 2'}</span><strong>Atomic write condition</strong></div>
      <div className={styles.preservedRecord} role="status" aria-live="polite" aria-atomic="true"><div><span className={styles.smallLabel}>Canonical record / survives</span><strong key={step}>{step === 0 ? 'Northwind' : 'Northwind Robotics'}</strong></div><span className={styles.versionSeal}>v{step === 0 ? '1' : '2'}</span><p>{step === 0 ? 'Version 1 · both tabs have the same starting point.' : step === 1 ? 'Version 2 · A’s edit is saved. B still holds version 1.' : 'Version 2 · A’s newer edit survives B’s stale request.'}</p></div>
    </div>
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
        <div className={styles.newWorkspace} data-visible={fresh} aria-hidden={!fresh}><span aria-hidden="true">↓</span><strong>W2</strong><span>Separate owner + expiry</span></div>
      </div>
      <svg className={styles.retryLoop} viewBox="0 0 1000 220" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d={fresh ? 'M250 65 H400' : 'M250 65 H400 M600 65 H750 M750 145 V175 Q750 200 725 200 H525 Q500 200 500 175 V145'} /></svg>
    </div>
    <div className={styles.retryControls} aria-label="Inspect demo identity behavior"><button type="button" aria-pressed={!fresh} onClick={() => setFresh(false)}>Same key / same workspace</button><button type="button" aria-pressed={fresh} onClick={() => setFresh(true)}>Fresh key / different owner</button></div>
    <figcaption>Contract illustration, not a live session. PROVISIONING precedes seeding; READY and unexpired permits replay. Signed 24-hour expiry denies access; TTL cleanup is eventual. Seed failure never grants a usable session.</figcaption>
  </figure>
}
