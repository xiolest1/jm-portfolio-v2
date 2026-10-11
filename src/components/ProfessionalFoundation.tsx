import { certifications, education, experience } from '../content/resume'
import { SoftwareFoundation } from './SoftwareFoundation'
import styles from './ProfessionalFoundation.module.css'

function MilestoneSymbol({ kind }: { kind: 'work' | 'education' | 'credential' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {kind === 'work' && <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12l9 3 9-3M12 12v5" /></>}
    {kind === 'education' && <><path d="m2 9 10-5 10 5-10 5-10-5ZM6 11v6c4 3 8 3 12 0v-6M22 9v8" /></>}
    {kind === 'credential' && <><path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>}
  </svg>
}

function VerificationArrow() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12" /></svg>
}

export function ProfessionalFoundation() {
  // Degrees are completion milestones, not study periods. Work and study overlapped.
  const completedDegrees = [...education].reverse()

  return (
    <section className={styles.foundation} id="foundation" aria-labelledby="foundation-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.label}>03 / Professional foundation</p>
        <h2 id="foundation-title">Professional journey<span>.</span></h2>
        <p>Professional work, formal Computer Science preparation, and verified industry credentials.</p>
      </header>

      <section className={styles.chapter} data-kind="work" aria-labelledby="experience-title">
        <header className={styles.chapterHeading}>
          <span className={styles.chapterSymbol}><MilestoneSymbol kind="work" /></span>
          <h3 id="experience-title">Professional experience</h3>
        </header>
        <div className={styles.roleList}>
          {experience.map(role => (
            <article className={styles.role} key={role.company} data-journey-reveal>
              <header>
                <p className={styles.roleDate}>{role.period}</p>
                <h4>{role.title}</h4>
                <p className={styles.employer}>{role.company}</p>
              </header>
              <div className={styles.roleContent}>
                <p className={styles.roleScope}>{role.summary}</p>
                {role.contribution && <p className={styles.contribution}>{role.contribution}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.chapter} data-kind="education" aria-labelledby="education-title">
        <header className={styles.chapterHeading}>
          <span className={styles.chapterSymbol}><MilestoneSymbol kind="education" /></span>
          <h3 id="education-title">Computer Science education</h3>
          <p>Completed degrees</p>
        </header>
        <ol className={styles.degreePath}>
          {completedDegrees.map(degree => (
            <li className={styles.degree} data-primary={degree.abbreviation === 'B.S.' ? 'true' : undefined} key={degree.degree} data-journey-reveal>
              <time dateTime={degree.completedOn}>{degree.completed}</time>
              <h4><abbr title={degree.degree.replace(' in Computer Science', '')}>{degree.abbreviation}</abbr>{' '}<span>Computer Science</span></h4>
              <p>{degree.school}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.chapter} data-kind="credential" id="credentials" aria-labelledby="credentials-title">
        <header className={styles.chapterHeading}>
          <span className={styles.chapterSymbol}><MilestoneSymbol kind="credential" /></span>
          <h3 id="credentials-title">Completed AWS certifications</h3>
          <p>Cloud architecture knowledge</p>
        </header>
        <div className={styles.credentialList}>
          {certifications.map(credential => (
            <article className={styles.credential} key={credential.name} data-journey-reveal>
              <header>
                <h4>{credential.name}</h4>
              </header>
              <div className={styles.credentialMeta}>
                <p>Earned <time dateTime={credential.completedOn}>{credential.completed}</time></p>
                <a href={credential.link} target="_blank" rel="noreferrer" aria-label={'Verify ' + credential.name + ' on Credly (opens in a new tab)'}>Verify credential <VerificationArrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SoftwareFoundation />
    </section>
  )
}
