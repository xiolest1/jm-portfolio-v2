import { softwareFoundation } from '../content/softwareFoundation'
import styles from './SoftwareFoundation.module.css'

function LayerMark({ kind }: { kind: 'frontend' | 'backend' | 'data' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {kind === 'frontend' && <><rect x="6" y="8" width="28" height="24" rx="3" /><path d="M6 15h28M11 11.5h1m3 0h1M11 21h8m-8 5h17" /></>}
      {kind === 'backend' && <><path d="m14 11-8 9 8 9m12-18 8 9-8 9m-3-20-6 22" /><path d="M3 20H0m40 0h-3" /></>}
      {kind === 'data' && <><ellipse cx="20" cy="10" rx="13" ry="5" /><path d="M7 10v19c0 3 6 5 13 5s13-2 13-5V10M7 19c0 3 6 5 13 5s13-2 13-5" /></>}
    </svg>
  )
}

export function SoftwareFoundation() {
  return (
    <section className={styles.section} id="software-foundation" aria-labelledby="engineering-profile-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.eyebrow}>Technical skills + coursework</p>
        <h3 id="engineering-profile-title">Software engineering foundation<span>.</span></h3>
        <div className={styles.orientation}>
          <p className={styles.direction}>Backend focus.<br /><span>Full-stack perspective.</span></p>
          <div className={styles.languageBase}>
            <h4 id="foundation-languages-title">Languages</h4>
            <ul className={styles.languages} aria-labelledby="foundation-languages-title">
              {softwareFoundation.languages.map(name => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </div>
      </header>

      <section className={styles.stackMoment} id="foundation-application-engineering" aria-labelledby="foundation-stack-title" data-journey-reveal>
        <header className={styles.momentHeading}>
          <p className={styles.eyebrow}>01 / Technical skills</p>
          <h4 id="foundation-stack-title">Across the application layers.</h4>
        </header>
        <div className={styles.technicalComposition}>
          <div className={styles.applicationLayers}>
            <section className={styles.layer} aria-labelledby="foundation-frontend-title">
              <div className={styles.layerHeading}><LayerMark kind="frontend" /><div><p className={styles.layerContext}>Interface</p><h5 id="foundation-frontend-title">Frontend</h5></div></div>
              <ul className={styles.technologies}>{softwareFoundation.frontend.map(name => <li key={name}>{name}</li>)}</ul>
            </section>
            <section className={`${styles.layer} ${styles.backend}`} aria-labelledby="foundation-backend-title">
              <div className={styles.layerHeading}><LayerMark kind="backend" /><div><p className={styles.layerContext}>Application logic &amp; APIs</p><h5 id="foundation-backend-title">Backend</h5></div></div>
              <ul className={styles.technologies}>{softwareFoundation.backend.map(name => <li key={name}>{name}</li>)}</ul>
            </section>
            <section className={`${styles.layer} ${styles.dataLayer}`} id="foundation-data-persistence" aria-labelledby="foundation-databases-title">
              <div className={styles.layerHeading}><LayerMark kind="data" /><div><p className={styles.layerContext}>Persistence</p><h5 id="foundation-databases-title">Databases</h5></div></div>
              <ul className={styles.technologies}>{softwareFoundation.databases.map(database => <li key={database.name}>{database.name}{database.context && <span className={styles.technologyContext}>{database.context}</span>}</li>)}</ul>
            </section>
          </div>
          <aside className={styles.developmentRail} aria-label="Supporting development knowledge and tools">
            <span className={styles.railLabel}>Supporting the stack</span>
            <section id="foundation-cloud-development-foundations" aria-labelledby="foundation-cloud-title">
              <h5 id="foundation-cloud-title">Cloud &amp; development</h5>
              <ul className={styles.cloudNames}>{softwareFoundation.cloudDevelopment.map(technology => <li key={technology.name}><span>{technology.name}</span><p>{technology.context}</p></li>)}</ul>
            </section>
            <section className={styles.tools} id="foundation-systems-software" aria-labelledby="foundation-tools-title">
              <h5 id="foundation-tools-title">Tools &amp; systems</h5>
              <ul>{softwareFoundation.tools.map(name => <li key={name}>{name}</li>)}</ul>
            </section>
          </aside>
        </div>
      </section>

      <section className={styles.courseMoment} aria-labelledby="foundation-coursework-title" data-journey-reveal>
        <header className={styles.courseHeader}>
          <div><p className={styles.eyebrow}>02 / Academic depth</p><h4 id="foundation-coursework-title">Relevant coursework</h4></div>
          <p className={styles.university}>Montclair State University<span>Selected completed courses</span></p>
        </header>
        <ul className={styles.featuredCourses} id="foundation-design-title" aria-label="Software engineering coursework">
          {softwareFoundation.softwareCourses.map(course => (
            <li key={course.name}>
              <h5>{course.name}</h5>
              <p>{course.context}</p>
            </li>
          ))}
        </ul>
        <ul className={styles.foundationCourses} id="foundation-connected-courses" aria-label="Systems, data, and web coursework">
          {softwareFoundation.foundationCourses.map(course => (
            <li key={course.name} id={course.name === 'Operating Systems' ? 'foundation-systems-courses' : undefined}>
              <h5>{course.name}</h5>
              {course.context && <p>{course.context}</p>}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
