import { hireFlux } from '../content/projects'
import styles from './HomeProjectScenes.module.css'

export function HireFluxProductScene() {
  return (
    <figure className={styles.productScene}>
      <a className={styles.captureLink} href={hireFlux.caseStudy} aria-label="Explore the HireFlux engineering case study">
        <div className={styles.captureLabel} aria-hidden="true"><span>HireFlux / Action Center</span><span>Local demo</span></div>
        <img src={hireFlux.image} alt={hireFlux.imageAlt} width="1440" height="900" loading="lazy" decoding="async" />
        <span className={styles.captureInvitation}>Explore the engineering <span aria-hidden="true">↗</span></span>
      </a>
      <figcaption>Actual interface · fictional records · September 29, 2026 capture</figcaption>
    </figure>
  )
}

export function LibraryContributionScene() {
  return (
    <figure className={styles.libraryScene}>
      <div className={styles.libraryProduct}><img src="/projects/library-search.png" alt="Actual Library repository screenshot showing a title search, sorting, and book results with cover images." width="1907" height="904" loading="lazy" decoding="async" /></div>
      <figcaption>Actual application screenshot from the team repository</figcaption>
    </figure>
  )
}

const controlSteps = [
  ['Find the target', 'Camera + feature matching'],
  ['Locate it', 'Position + distance analysis'],
  ['Move toward it', 'Serial steering + motor commands'],
] as const

export function RcControlPath() {
  return (
    <ol className={styles.controlPath} aria-label="RC vehicle signal path">
      {controlSteps.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}
    </ol>
  )
}
