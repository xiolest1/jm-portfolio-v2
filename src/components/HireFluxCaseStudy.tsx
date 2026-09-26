import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import styles from './HireFluxCaseStudy.module.css'

const evidence = {
  architecture: 'https://github.com/xiolest1/HireFlux/blob/main/docs/ARCHITECTURE.md',
  concurrency: 'https://github.com/xiolest1/HireFlux/blob/main/docs/adr/0003-archive-and-optimistic-concurrency.md',
  demo: 'https://github.com/xiolest1/HireFlux/blob/main/docs/adr/0004-isolated-recruiter-demo-sessions.md',
  demoTests: 'https://github.com/xiolest1/HireFlux/blob/main/backend/tests/integration/test_demo_sessions.py',
  lifecycleTests: 'https://github.com/xiolest1/HireFlux/blob/main/backend/tests/unit/test_status_policy.py',
}

function SourceLink({ href, children }: { href: string; children: string }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span className={styles.srOnly}> (opens in a new tab)</span></a>
}

export function HireFluxCaseStudy() {
  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <a className={styles.backLink} href="/#work">← Selected work</a>
        <p className={styles.eyebrow}>Engineering case study · Personal project</p>
        <h1>HireFlux</h1>
        <p className={styles.dek}>
          A candidate-focused job-search workspace designed to keep application status,
          interview context, notes, and next actions connected.
        </p>
        <ul className={styles.statuses} aria-label="Project status">
          <li>Local demo implementation</li>
          <li>AWS infrastructure not deployed</li>
        </ul>
        <div className={styles.heroFacts}>
          <p><span>Ownership</span><strong>Personal project</strong></p>
          <p><span>Client</span><strong>React · TypeScript · Vite</strong></p>
          <p><span>Service + data</span><strong>FastAPI · DynamoDB Local</strong></p>
        </div>
      </header>

      <section className={styles.overview} aria-labelledby="overview-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>01 / System at a glance</p>
          <h2 id="overview-title">A small system with meaningful boundaries.</h2>
          <p>The browser presents the workflow; the API owns rules and data access.</p>
        </div>
        <ol className={styles.systemFlow} aria-label="HireFlux local demo request and data flow">
          <li><span className={styles.nodeType}>Client</span><strong>React + TypeScript</strong><span>Vite application</span></li>
          <li className={styles.connector} aria-hidden="true">→</li>
          <li><span className={styles.nodeType}>API</span><strong>FastAPI</strong><span>validation · domain rules · ownership</span></li>
          <li className={styles.connector} aria-hidden="true">→</li>
          <li><span className={styles.nodeType}>Persistence</span><strong>DynamoDB Local</strong><span>local development and demo data</span></li>
        </ol>
        <p className={styles.caption}>This depicts the implemented local/demo system. It does not depict deployed AWS infrastructure.</p>
        <p className={styles.sourceLine}><SourceLink href={evidence.architecture}>Architecture notes</SourceLink></p>
      </section>

      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>02 / Product context</p>
          <h2 id="workflow-title">From application record to next action.</h2>
          <p>HireFlux brings the supporting context for a job search into one focused workspace.</p>
        </div>
        <figure className={styles.productImage}>
          <img src={hireFlux.image} alt={hireFlux.imageAlt} width="1440" height="900" loading="lazy" decoding="async" />
          <figcaption>HireFlux local demo workspace · fictional records, not a public deployment.</figcaption>
        </figure>
      </section>

      <section className={styles.decisions} aria-labelledby="decisions-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>03 / Engineering decisions</p>
          <h2 id="decisions-title">Rules live where they can be enforced.</h2>
          <p>Three implementation choices shape how the workflow stays coherent as it changes.</p>
        </div>
        <div className={styles.decisionList}>
          <article className={styles.decision}>
            <p className={styles.decisionIndex}>01</p>
            <div>
              <h3>Keep lifecycle rules in the backend.</h3>
              <p>Application status changes are validated against allowed transitions at the API boundary. The client can present options, but the service remains responsible for enforcing the domain policy.</p>
              <p className={styles.tradeoff}><strong>Why it matters</strong> One rule source helps prevent invalid state changes across client interactions.</p>
              <p className={styles.sourceLine}><SourceLink href={evidence.lifecycleTests}>Status policy tests</SourceLink></p>
            </div>
          </article>
          <article className={styles.decision}>
            <p className={styles.decisionIndex}>02</p>
            <div>
              <h3>Derive data scope from the authenticated context.</h3>
              <p>The demo uses an isolated temporary workspace. The server associates requests with the verified demo identity instead of trusting a client-supplied owner identifier.</p>
              <p className={styles.tradeoff}><strong>Why it matters</strong> The demo path can exercise owner-scoped behavior without exposing one visitor’s records to another.</p>
              <p className={styles.sourceLine}><SourceLink href={evidence.demo}>Isolated demo session decision</SourceLink> · <SourceLink href={evidence.demoTests}>Demo session integration tests</SourceLink></p>
            </div>
          </article>
          <article className={styles.decision}>
            <p className={styles.decisionIndex}>03</p>
            <div>
              <h3>Make conflicting updates explicit.</h3>
              <p>Conditional writes and version-aware updates provide a way to detect stale changes. Idempotency support helps keep retries from silently becoming duplicate operations.</p>
              <p className={styles.tradeoff}><strong>Why it matters</strong> Concurrent edits and network retries are treated as expected conditions, with behavior documented for review.</p>
              <p className={styles.sourceLine}><SourceLink href={evidence.concurrency}>Concurrency and archive decision record</SourceLink></p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.quality} aria-labelledby="quality-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>04 / Verification</p>
          <h2 id="quality-title">Claims have a source trail.</h2>
          <p>The public repository includes automated checks and engineering documentation for the behavior shown here.</p>
        </div>
        <ul className={styles.proofList}>
          <li><strong>Domain policy</strong><SourceLink href={evidence.lifecycleTests}>Status transition unit tests</SourceLink></li>
          <li><strong>Demo isolation</strong><SourceLink href={evidence.demoTests}>Demo session integration tests</SourceLink></li>
          <li><strong>System boundaries</strong><SourceLink href={evidence.architecture}>Architecture documentation</SourceLink></li>
          <li><strong>Concurrency behavior</strong><SourceLink href={evidence.concurrency}>Architecture decision record</SourceLink></li>
        </ul>
        <p className={styles.repositoryLink}><SourceLink href={hireFlux.repository}>Review the HireFlux repository on GitHub ↗</SourceLink></p>
      </section>

      <section className={styles.statusSection} aria-labelledby="status-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>05 / Scope and next direction</p>
          <h2 id="status-title">Current implementation, clearly bounded.</h2>
        </div>
        <div className={styles.scopeGrid}>
          <div>
            <h3>Implemented and demonstrable</h3>
            <ul>
              <li>Local React, TypeScript, and Vite application</li>
              <li>FastAPI service with validation and domain rules</li>
              <li>DynamoDB Local persistence for development/demo</li>
              <li>Isolated temporary demo workflow and automated tests</li>
            </ul>
          </div>
          <div className={styles.planned}>
            <p className={styles.plannedLabel}>Planned direction</p>
            <h3>AWS evolution</h3>
            <p>AWS deployment and infrastructure remain future work. No AWS environment is provisioned for HireFlux, and this case study makes no claim that the local system is running in the cloud.</p>
          </div>
        </div>
      </section>

      <section className={styles.nextStep} aria-labelledby="next-title">
        <div>
          <p className={styles.eyebrow}>Continue</p>
          <h2 id="next-title">Explore the code or get in touch.</h2>
        </div>
        <div className={styles.nextLinks}>
          <SourceLink href={hireFlux.repository}>HireFlux on GitHub</SourceLink>
          <a href={`mailto:${site.email}`}>Email Joan</a>
          <a href="/">Back to portfolio</a>
        </div>
      </section>
    </article>
  )
}
