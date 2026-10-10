import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { hireFlux } from '../content/projects'
import styles from './HomeProjectScenes.module.css'

function CaptureCrop({ x, y, width, height, alt }: { x: number; y: number; width: number; height: number; alt: string }) {
  const style = { '--crop-ratio': `${width} / ${height}`, '--capture-width': `${1440 / width * 100}%`, '--capture-x': `${-x / 1440 * 100}%`, '--capture-y': `${-y / 900 * 100}%` } as CSSProperties
  return <div className={styles.crop} style={style}><img src={hireFlux.image} alt={alt} width="1440" height="900" loading="lazy" decoding="async" /></div>
}

const productDetails = [
  { label: 'Saved commitment', title: 'A recorded date gives the action its meaning.', note: 'Northwind’s saved check-back date supports an overdue follow-up. Responsibility stays labeled “Owner not recorded.”', x: 278, y: 280, width: 370, height: 220, alt: 'Actual HireFlux Home crop: Northwind Robotics has an overdue follow-up based on a saved September 26 check-back date.' },
  { label: 'Scheduled interview', title: 'The conversation belongs on the calendar.', note: 'A scheduled interview is presented as a recorded commitment, with its date, time, and destination.', x: 1030, y: 280, width: 375, height: 256, alt: 'Actual HireFlux Home crop: Orbit Systems has a scheduled October 1 interview, with the date and destination visible.' },
  { label: 'Suggested review', title: 'A suggestion is not a missed deadline.', note: 'Evergreen has spent time in the Applied stage. With no recorded deadline, HireFlux offers a quieter review cue.', x: 275, y: 545, width: 420, height: 155, alt: 'Actual HireFlux Home crop showing the suggested-review label and Evergreen Media application after time in stage.' },
] as const

export function HireFluxProductScene() {
  const [selected, setSelected] = useState(0)
  const detail = productDetails[selected]
  return <figure className={styles.productScene} data-home-scene>
    <div className={styles.productStage}>
      <div className={styles.productOverview}>
        <div className={styles.captureLabel}><span>HireFlux / Home</span><span>Actual local interface</span></div>
        <img src={hireFlux.image} alt={hireFlux.imageAlt} width="1440" height="900" loading="lazy" decoding="async" />
        <div className={styles.productMeaning}><span>Applications + interviews + next steps</span><strong>One place to decide what to work on.</strong></div>
      </div>
      <div className={styles.productDetail}>
        <p className={styles.label}>Read the interface</p>
        <div className={styles.lensControls} role="group" aria-label="Inspect actual HireFlux interface details">{productDetails.map((item, i) => <button type="button" key={item.label} aria-pressed={selected === i} onClick={() => setSelected(i)}><span aria-hidden="true">0{i + 1}</span><span>{item.label}</span></button>)}</div>
        <div className={styles.detailFrame} key={selected}><CaptureCrop {...detail} /></div>
        <div className={styles.detailExplanation} aria-live="polite" aria-atomic="true"><strong>{detail.title}</strong><p>{detail.note}</p></div>
      </div>
    </div>
    <div className={styles.productPrinciples}><div><span>01</span><strong>Recorded commitments</strong><p>Saved dates and scheduled interviews.</p></div><div><span>02</span><strong>Qualified suggestions</strong><p>Stage-age cues stay separate from deadlines.</p></div><div><span>03</span><strong>Honest uncertainty</strong><p>Missing information stays explicit.</p></div></div>
    <figcaption>Real product captures from the September 29, 2026 milestone, using fictional records. Detail controls inspect the image; they do not run the application. <a href={hireFlux.caseStudy}>Explore the current engineering case study <span aria-hidden="true">↗</span></a></figcaption>
  </figure>
}

export function LibraryContributionScene() {
  return <figure className={styles.libraryScene} data-home-scene>
    <div className={styles.libraryProduct}><img src="/projects/library-search.png" alt="Actual Library repository screenshot showing a title search, sorting, and book results with cover images." width="1907" height="904" loading="lazy" decoding="async" /><span>Actual application / repository screenshot</span></div>
    <div className={styles.libraryJourney}>
      <div><span className={styles.label}>Find a book</span><strong>Search the catalog.</strong><p>Flask connects search to the Open Library API.</p></div><span className={styles.pathArrow} aria-hidden="true">→</span>
      <div><span className={styles.label}>Make it personal</span><strong>Save it to a list.</strong><p>User-owned lists and book metadata persist in PostgreSQL.</p></div>
    </div>
    <figcaption>Repository capture from the team-built Library application.</figcaption>
  </figure>
}

const controlSteps = [
  { name: 'Camera input', short: 'Capture', technology: 'Camera + calibration', detail: 'Frames provide the visual input. Calibration supports the geometry.' },
  { name: 'Feature matching', short: 'Match', technology: 'Python · OpenCV', detail: 'The prototype matches visual features against a target template.' },
  { name: 'Positional analysis', short: 'Locate', technology: 'NumPy · position + distance', detail: 'The target’s position informs steering and speed decisions.' },
  { name: 'Serial communication', short: 'Send', technology: 'PySerial → Arduino', detail: 'Steering and velocity values cross the software/hardware boundary.' },
  { name: 'Vehicle control', short: 'Move', technology: 'Steering + motor', detail: 'The vehicle receives the steering and motor-control commands.' },
] as const

export function RcControlPath() {
  const [selected, setSelected] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timers = useRef<number[]>([])
  const cancelPlayback = () => { timers.current.forEach(window.clearTimeout); timers.current = [] }
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stop = () => { if (preference.matches) { timers.current.forEach(window.clearTimeout); timers.current = []; setPlaying(false) } }
    preference.addEventListener('change', stop)
    return () => { timers.current.forEach(window.clearTimeout); preference.removeEventListener('change', stop) }
  }, [])
  const select = (index: number) => { cancelPlayback(); setPlaying(false); setSelected(index) }
  const play = () => {
    cancelPlayback()
    if (playing) { setPlaying(false); return }
    setSelected(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPlaying(true)
    controlSteps.slice(1).forEach((_, i) => timers.current.push(window.setTimeout(() => setSelected(i + 1), (i + 1) * 430)))
    timers.current.push(window.setTimeout(() => setPlaying(false), 2100))
  }
  return <div className={styles.controlPath} data-home-scene>
    <div className={styles.controlHeader}><p className={styles.label}>Software → physical movement</p><button className={styles.playControl} type="button" onClick={play}><span>{playing ? 'Stop trace' : 'Trace the control path'}</span><span aria-hidden="true">{playing ? '■' : '→'}</span></button></div>
    <ol className={styles.controlSteps} aria-label="Conceptual RC vehicle signal path">{controlSteps.map((step, i) => <li key={step.name} data-active={selected === i}><button type="button" aria-pressed={selected === i} onClick={() => select(i)}><span className={styles.stepNumber}>0{i + 1}</span><strong>{step.short}</strong><span>{step.name}</span><small>{step.technology}</small></button></li>)}</ol>
    <p className={styles.controlExplanation} aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><span>{controlSteps[selected].name}</span>{controlSteps[selected].detail}</p>
    <p className={styles.sceneNote}>Conceptual path based on the implemented prototype. This is an explanation, not a live tracking feed.</p>
  </div>
}
