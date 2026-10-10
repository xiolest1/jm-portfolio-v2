import { certifications, education, experience } from '../content/resume'
import { SoftwareFoundation } from './SoftwareFoundation'
import styles from './ProfessionalFoundation.module.css'

function VerificationArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 16 16 4M4 4h12v12" />
    </svg>
  )
}

export function ProfessionalFoundation() {
  return (
    <section className={styles.foundation} id="foundation" aria-labelledby="foundation-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.label}>03 / Professional foundation</p>
        <div className={styles.introduction}>
          <h2 id="foundation-title">Work, study,<br /><span>and credentials.</span></h2>
          <p>
            Professional responsibility in office operations and technical support,
            supported by Computer Science study and completed AWS certifications.
          </p>
        </div>
      </header>

      <section className={styles.experience} aria-labelledby="experience-title">
        <header className={styles.experienceHeading} data-journey-reveal>
          <div>
            <p className={styles.sectionIndex}>01 / In practice</p>
            <h3 id="experience-title">Professional experience</h3>
          </div>
          <p>Operational ownership and technical problem-solving in real professional roles.</p>
        </header>

        <div className={styles.roleGrid} data-journey-reveal>
          {experience.map((role) => (
            <article className={styles.role} key={role.company}>
              <header className={styles.roleHeading}>
                <p className={styles.roleDate}>{role.period}</p>
                <h4>{role.title}</h4>
                <p className={styles.employer}>{role.company}</p>
              </header>
              <p className={styles.roleScope}>{role.summary}</p>
              <div className={styles.accomplishment}>
                <p className={styles.smallLabel}>{role.contributionLabel}</p>
                <p>{role.contribution}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.qualificationBand}>
        <p className={styles.sectionIndex}>02 / Formal preparation</p>

        <div className={styles.qualifications} data-journey-reveal>
          <section className={styles.education} aria-labelledby="education-title">
            <header className={styles.columnHeading}>
              <p className={styles.smallLabel}>Academic foundation</p>
              <h3 id="education-title">Computer Science education</h3>
            </header>
            <div className={styles.degreeList}>
              {education.map((degree, index) => (
                <article className={styles.degree} data-primary={index === 0 ? 'true' : undefined} key={degree.degree}>
                  <h4>
                    <abbr title={degree.degree.replace(' in Computer Science', '')}>{degree.abbreviation}</abbr>
                    <span>Computer Science</span>
                  </h4>
                  <div className={styles.degreeMeta}>
                    <p>{degree.school}</p>
                    <time dateTime={degree.completedOn}>{degree.completed}</time>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.credentials} id="credentials" aria-labelledby="credentials-title">
            <header className={styles.columnHeading}>
              <p className={styles.smallLabel}>Amazon Web Services</p>
              <h3 id="credentials-title">Completed certifications</h3>
            </header>
            <div className={styles.credentialList}>
              {certifications.map((credential, index) => (
                <article className={styles.credential} data-primary={index === 0 ? 'true' : undefined} key={credential.name}>
                  <div className={styles.credentialTitle}>
                    <span className={styles.earnedMark} aria-hidden="true">✓</span>
                    <h4>{credential.name}</h4>
                  </div>
                  <div className={styles.credentialMeta}>
                    <p>Earned <time dateTime={credential.completedOn}>{credential.completed}</time></p>
                    <a
                      href={credential.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={'Verify ' + credential.name + ' on Credly (opens in a new tab)'}
                    >
                      Verify credential <VerificationArrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <SoftwareFoundation />
    </section>
  )
}
