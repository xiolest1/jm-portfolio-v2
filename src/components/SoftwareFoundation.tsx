import { softwareFoundation } from '../content/softwareFoundation'
import { CourseworkExperience } from './CourseworkExperience'
import { TechnicalGlyph } from './TechnicalGlyph'
import styles from './SoftwareFoundation.module.css'

function TechnologyNames({ names, secondary = false }: { names: string[]; secondary?: boolean }) {
  return <ul role="list" className={secondary ? styles.supportingNames : styles.technologyNames}>
    {names.map(name => <li key={name}>{name}</li>)}
  </ul>
}

// Preserve earlier deep links beside the related skills and course material.
function AnchorAliases({ ids }: { ids: string[] }) {
  return <>{ids.map(id => <span className={styles.anchor} id={id} key={id} aria-hidden="true" />)}</>
}

export function SoftwareFoundation() {
  return (
    <section className={styles.section} id="software-foundation" aria-labelledby="engineering-profile-title">
      <header className={styles.opening}>
        <p className={styles.eyebrow}>Software engineering foundation</p>
        <div className={styles.headingLine}>
          <h3 id="engineering-profile-title">Technical foundation<span>.</span></h3>
          <a className={styles.projectEvidence} href="#work">Explore project evidence <span aria-hidden="true">↑</span></a>
        </div>
      </header>

      <section className={styles.skills} id="foundation-application-engineering" aria-labelledby="foundation-stack-title">
        <h4 className={styles.srOnly} id="foundation-stack-title">Technical skills</h4>
        <div className={styles.languageLine}>
          <h5 id="foundation-languages-title">Programming languages</h5>
          <ul role="list">{softwareFoundation.languages.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
        <div className={styles.toolkitOpening}><p>Application toolkit</p><span>Interface / Logic / Persistence</span></div>
        <div className={styles.applicationStack}>
            <section className={styles.stackLayer} aria-labelledby="foundation-frontend-title">
              <p className={styles.layerLabel}>01 / Interface</p>
              <h5 id="foundation-frontend-title">Frontend development</h5>
              <div className={styles.layerIllustration}><TechnicalGlyph kind="frontend" /></div>
              <TechnologyNames names={['React', 'TypeScript']} />
              <TechnologyNames names={softwareFoundation.frontend.filter(name => name !== 'React')} secondary />
            </section>
            <section className={styles.stackLayer} aria-labelledby="foundation-backend-title">
              <AnchorAliases ids={['foundation-layer-detail','foundation-trace-note']} />
              <p className={styles.layerLabel}>02 / Logic</p>
              <h5 id="foundation-backend-title">Backend &amp; APIs</h5>
              <div className={styles.layerIllustration}><TechnicalGlyph kind="backend" /></div>
              <TechnologyNames names={softwareFoundation.backend.filter(name => name === 'FastAPI' || name === 'Flask')} />
              <TechnologyNames names={softwareFoundation.backend.filter(name => name !== 'FastAPI' && name !== 'Flask')} secondary />
            </section>
            <section className={styles.stackLayer} id="foundation-data-persistence" aria-labelledby="foundation-databases-title">
              <p className={styles.layerLabel}>03 / Persistence</p>
              <h5 id="foundation-databases-title">Databases</h5>
              <div className={styles.layerIllustration}><TechnicalGlyph kind="data" /></div>
              <TechnologyNames names={softwareFoundation.databases} />
              <TechnologyNames names={['SQLAlchemy']} secondary />
            </section>
        </div>
        <div className={styles.supportingStack}>
            <section className={styles.supportingGroup} id="foundation-systems-software" aria-labelledby="foundation-tools-title">
              <div className={styles.supportingIllustration}><TechnicalGlyph kind="tools" /></div>
              <div><h5 id="foundation-tools-title">Development tools</h5>
              <TechnologyNames names={[...softwareFoundation.tools, 'Docker']} secondary /></div>
            </section>
            <section className={styles.supportingGroup} aria-labelledby="foundation-specialized-title">
              <div className={styles.supportingIllustration}><TechnicalGlyph kind="vision" /></div>
              <div><h5 id="foundation-specialized-title">Computer vision &amp; integration</h5>
              <TechnologyNames names={['OpenCV', 'NumPy', 'PySerial']} secondary /></div>
            </section>
            <section className={styles.cloudKnowledge} id="foundation-cloud-development-foundations" aria-labelledby="foundation-cloud-title">
              <div className={styles.cloudIdentity}><h5 id="foundation-cloud-title">Cloud knowledge</h5>
              <p className={styles.technologies}>AWS architecture &amp; services</p>
              <div className={styles.cloudIllustration}><TechnicalGlyph kind="cloud" /></div></div>
              <TechnologyNames names={softwareFoundation.cloudServices} secondary />
            </section>
        </div>
      </section>

      <CourseworkExperience />
    </section>
  )
}
