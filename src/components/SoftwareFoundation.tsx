import { softwareFoundation } from '../content/softwareFoundation'
import styles from './SoftwareFoundation.module.css'

type SkillGroupProps = {
  title: string
  titleId: string
  context: string
  technologies: string[]
  id?: string
  primary?: boolean
}

function SkillGroup({ title, titleId, context, technologies, id, primary = false }: SkillGroupProps) {
  return (
    <section className={styles.skillGroup} data-primary={primary || undefined} id={id} aria-labelledby={titleId}>
      <h5 id={titleId}>{title}</h5>
      <p className={styles.skillContext}>{context}</p>
      <ul className={styles.technologies}>
        {technologies.map(name => <li key={name}>{name}</li>)}
      </ul>
    </section>
  )
}

export function SoftwareFoundation() {
  return (
    <section className={styles.section} id="software-foundation" aria-labelledby="engineering-profile-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.eyebrow}>Technical skills + coursework</p>
        <div className={styles.openingComposition}>
          <h3 id="engineering-profile-title">Software engineering<br />foundation<span>.</span></h3>
          <p className={styles.direction}>Backend development.<br /><span>Full-stack perspective.</span></p>
        </div>
      </header>

      <section className={styles.skills} id="foundation-application-engineering" aria-labelledby="foundation-stack-title">
        <header className={styles.chapterHeading} data-journey-reveal>
          <span className={styles.chapterNumber} aria-hidden="true">01</span>
          <h4 id="foundation-stack-title">Technical skills</h4>
        </header>

        <div className={styles.languageLine} aria-labelledby="foundation-languages-title" data-journey-reveal>
          <h5 id="foundation-languages-title">Languages</h5>
          <ul className={styles.languages}>
            {softwareFoundation.languages.map(name => <li key={name}>{name}</li>)}
          </ul>
        </div>

        <div className={styles.applicationStack} data-journey-reveal>
          <SkillGroup title="Backend & APIs" titleId="foundation-backend-title" context="Application logic and service interfaces" technologies={softwareFoundation.backend} primary />
          <SkillGroup title="Frontend" titleId="foundation-frontend-title" context="Web interfaces and presentation" technologies={softwareFoundation.frontend} primary />
          <SkillGroup title="Databases" titleId="foundation-databases-title" context="Relational and NoSQL persistence" technologies={softwareFoundation.databases} id="foundation-data-persistence" />
          <SkillGroup title="Tools & systems" titleId="foundation-tools-title" context="Version control and working environment" technologies={softwareFoundation.tools} id="foundation-systems-software" />
        </div>

        <section className={styles.cloud} id="foundation-cloud-development-foundations" aria-labelledby="foundation-cloud-title" data-journey-reveal>
          <div className={styles.cloudIntroduction}>
            <h5 id="foundation-cloud-title">Cloud & development</h5>
            <p className={styles.cloudScope}>AWS architecture knowledge<br />{' '}and containerized development.</p>
            <p className={styles.docker}><strong>Docker</strong><span>Development containers</span></p>
            <a className={styles.credentialLink} href="#credentials">View completed AWS credentials <span aria-hidden="true">↑</span></a>
          </div>
          <div className={styles.cloudDetail}>
            <p className={styles.cloudLabel}>AWS service knowledge</p>
            <dl className={styles.cloudServices}>
              {softwareFoundation.cloudServices.map(group => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd><ul>{group.technologies.map(name => <li key={name}>{name}</li>)}</ul></dd>
                </div>
              ))}
            </dl>
            <p className={styles.cloudBoundary}>Credential-backed knowledge. HireFlux’s AWS deployment remains planned.</p>
          </div>
        </section>
      </section>

      <section className={styles.coursework} aria-labelledby="foundation-coursework-title">
        <header className={styles.courseHeader} data-journey-reveal>
          <div className={styles.chapterHeading}>
            <span className={styles.chapterNumber} aria-hidden="true">02</span>
            <h4 id="foundation-coursework-title">Relevant coursework</h4>
          </div>
          <p className={styles.courseSchool}>Montclair State University<span>Selected completed courses · Concepts studied</span></p>
        </header>

        <div className={styles.designSequence} id="foundation-design-title" data-journey-reveal>
          <p className={styles.groupLabel}>Software design → software quality</p>
          <ol className={styles.sequence} aria-label="Software engineering coursework sequence">
            {softwareFoundation.softwareCourses.map((course, index) => (
              <li key={course.name}>
                <span className={styles.sequenceNumber} aria-hidden="true">0{index + 1}</span>
                <h5>{course.name}</h5>
                <p className={styles.courseFocus}>{course.focus}</p>
                <p className={styles.courseLearning}>{course.learning}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.courseGroups} id="foundation-connected-courses">
          {softwareFoundation.courseGroups.map(group => (
            <div className={styles.courseGroup} key={group.label} data-journey-reveal>
              <p className={styles.groupLabel}>{group.label}</p>
              <ul>
                {group.courses.map(course => (
                  <li key={course.name} id={'id' in course ? course.id : undefined}>
                    <h5>{course.name}</h5>
                    <p className={styles.courseFocus}>{course.focus}</p>
                    <p className={styles.courseLearning}>{course.learning}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
