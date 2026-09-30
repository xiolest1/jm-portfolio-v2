import { hireFlux } from '../content/projects'
import { site } from '../content/site'
import styles from './HireFluxCaseStudy.module.css'

const sourceRoot = 'https://github.com/xiolest1/HireFlux/blob/18a1760c891f271c2c004c269c07a8462bacd29a/'

const evidence = {
  architecture: `${sourceRoot}ARCHITECTURE.md`,
  decisionBuilder: `${sourceRoot}backend/src/hireflux_backend/application/insights.py`,
  decisionModel: `${sourceRoot}frontend/src/features/workspace/homeDecisionModel.ts`,
  decisionTests: `${sourceRoot}frontend/src/features/workspace/homeDecisionModel.test.ts`,
  opportunityClassifier: `${sourceRoot}backend/src/hireflux_backend/application/opportunity_workspace.py`,
  homeAudit: `${sourceRoot}docs/home-stage-1-cognition-information-audit.md`,
  homeContract: `${sourceRoot}docs/home-implementation-contract.md`,
  statusPolicy: `${sourceRoot}backend/src/hireflux_backend/domain/status_policy.py`,
  statusTests: `${sourceRoot}backend/tests/unit/test_status_policy.py`,
  applicationService: `${sourceRoot}backend/src/hireflux_backend/application/services.py`,
  concurrency: `${sourceRoot}docs/adr/0003-archive-and-optimistic-concurrency.md`,
  demoService: `${sourceRoot}backend/src/hireflux_backend/application/demo_sessions.py`,
  demoTests: `${sourceRoot}backend/tests/integration/test_demo_sessions.py`,
  connectedStory: `${sourceRoot}frontend/src/features/landing/useConnectedStoryArchitecture.ts`,
  browserTests: `${sourceRoot}frontend/e2e/visual-regression.spec.ts`,
  qualityWorkflow: `${sourceRoot}.github/workflows/quality.yml`,
  roadmap: `${sourceRoot}docs/roadmap.md`,
}

function SourceLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true"> ↗</span>
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  )
}

function SectionIntro({ number, label, id, title, children }: {
  number: string
  label: string
  id: string
  title: string
  children: string
}) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.eyebrow}>{number} / {label}</p>
      <h2 id={id}>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

export function HireFluxCaseStudy() {
  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <div className={styles.heroMain}>
          <a className={styles.backLink} href="/#work">← Selected work</a>
          <p className={styles.eyebrow}>Personal project / Engineering case study</p>
          <h1>HireFlux</h1>
          <p className={styles.dek}>
            A job-search workspace that turns recorded application context into a clearer next step.
          </p>
          <p className={styles.heroContext}>
            I built the product workflow, React client, FastAPI service, data model, and tests
            for a candidate managing applications, interviews, follow-ups, and history.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#product">Explore the case study <span aria-hidden="true">↓</span></a>
            <SourceLink href={hireFlux.repository}>Review the repository</SourceLink>
          </div>
        </div>
        <aside className={styles.heroAside} aria-label="HireFlux project snapshot">
          <p className={styles.asideTitle}>At a glance</p>
          <dl>
            <div><dt>Current state</dt><dd>Local, isolated 24-hour demo</dd></div>
            <div><dt>Built with</dt><dd>React · TypeScript · FastAPI · DynamoDB Local</dd></div>
            <div><dt>Production AWS</dt><dd>Planned, not deployed</dd></div>
          </dl>
        </aside>
      </header>

      <nav className={styles.jumpNav} aria-label="Case study sections">
        <span>Read by interest</span>
        <a href="#product">Product</a>
        <a href="#decision-model">Decision model</a>
        <a href="#system">System</a>
        <a href="#engineering">Engineering</a>
        <a href="#proof">Proof & scope</a>
      </nav>

      <div className={styles.signalStrip} aria-label="Primary engineering evidence">
        <p><strong>Decision model</strong><span>Recorded dates stay distinct from suggestions.</span></p>
        <p><strong>Server-owned rules</strong><span>Lifecycle, ownership, and write conflicts are enforced.</span></p>
        <p><strong>Usable demo</strong><span>Fictional workspaces are isolated and temporary.</span></p>
      </div>

      <section className={styles.section} id="product" aria-labelledby="product-title">
        <SectionIntro number="01" label="The product" id="product-title" title="Keep the whole opportunity connected.">
          Applications are more than a list of company names. The next move depends on status,
          saved commitments, interview context, and who owns the response.
        </SectionIntro>
        <ol className={styles.journey} aria-label="Candidate workflow">
          <li><span>01</span><strong>Record</strong><p>Save the role and application context.</p></li>
          <li><span>02</span><strong>Plan</strong><p>Set a next step, check-back date, or interview.</p></li>
          <li><span>03</span><strong>Return</strong><p>See recorded work and separate suggestions.</p></li>
          <li><span>04</span><strong>Act</strong><p>Open the opportunity with its history intact.</p></li>
        </ol>
        <figure className={styles.heroFigure}>
          <div className={styles.screenFrame}>
            <img
              src="/projects/hireflux-home-light.png"
              alt="Light-mode HireFlux Home showing overdue and due-today follow-ups, scheduled interviews, and a separate stage-age review suggestion."
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>Current local demo, light mode. The visible records and companies are fictional. <a className={styles.imageLink} href="/projects/hireflux-home-light.png" target="_blank" rel="noreferrer">Open full-size capture <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a></figcaption>
        </figure>
        <div className={styles.annotationRow} aria-label="What to notice in the Home screenshot">
          <p><span>01</span><strong>Recorded timing leads.</strong> Due follow-ups and scheduled interviews have dates.</p>
          <p><span>02</span><strong>Review stays separate.</strong> Time in stage suggests inspection; it is not a missed deadline.</p>
          <p><span>03</span><strong>Coverage is bounded.</strong> Home previews work and points to the full record.</p>
        </div>
      </section>

      <section className={styles.section} id="decision-model" aria-labelledby="decision-title">
        <SectionIntro number="02" label="Decision model" id="decision-title" title="Raw records become a defensible decision surface.">
          HireFlux does not claim to know which opportunity matters most to a person. It derives
          recorded conditions, preserves their limits, and leaves the final choice with the candidate.
        </SectionIntro>
        <ol className={styles.decisionFlow} aria-label="How HireFlux turns recorded data into Home decisions">
          <li><span className={styles.flowStep}>Input</span><strong>Application facts</strong><p>Status, follow-up date, next-step owner, interview time, and stage entry.</p></li>
          <li><span className={styles.flowStep}>Server</span><strong>Derived conditions</strong><p>Due follow-ups, upcoming interviews, undated candidate steps, and stage-age review cues.</p></li>
          <li><span className={styles.flowStep}>Client</span><strong>Honest grouping</strong><p>Recorded commitments lead; suggestions and waiting retain different meanings.</p></li>
          <li><span className={styles.flowStep}>Outcome</span><strong>Candidate choice</strong><p>Open the relevant opportunity, complete a follow-up, or inspect more context.</p></li>
        </ol>
        <div className={styles.decisionMeaning}>
          <div>
            <h3>Timing is not importance</h3>
            <p>A saved date justifies “due” or “overdue.” An undated candidate step remains useful work without a fabricated deadline. A 14-day stage-age cue is a review suggestion.</p>
          </div>
          <div>
            <h3>Unknown is a real state</h3>
            <p>When operational evidence fails or ownership cannot be checked, Home avoids an all-clear. Waiting for an employer can also be a legitimate outcome.</p>
          </div>
        </div>
        <p className={styles.evidenceLine}>Inspect the model: <SourceLink href={evidence.decisionBuilder}>server action builder</SourceLink> · <SourceLink href={evidence.decisionModel}>Home presentation model</SourceLink> · <SourceLink href={evidence.opportunityClassifier}>opportunity classifier</SourceLink></p>
      </section>

      <section className={styles.section} id="system" aria-labelledby="system-title">
        <SectionIntro number="03" label="Current system" id="system-title" title="The boundaries make the rules enforceable.">
          The browser presents and validates responses. The API verifies identity and owns business policy;
          DynamoDB-specific access stays behind repository interfaces.
        </SectionIntro>
        <p className={styles.diagramStatus}>Implemented local/demo architecture</p>
        <ol className={styles.systemFlow} aria-label="HireFlux current local system architecture">
          <li><span>01 / Browser</span><strong>React + TypeScript</strong><p>React Router, TanStack Query, and Zod-validated API responses.</p></li>
          <li><span>02 / HTTP boundary</span><strong>FastAPI routes</strong><p>Validated requests and verified demo identity.</p></li>
          <li><span>03 / Policy</span><strong>Services + domain</strong><p>Transitions, ownership-sensitive rules, metrics, and activity meaning.</p></li>
          <li><span>04 / Storage</span><strong>Repository adapters</strong><p>Owner-scoped keys, conditional transactions, and DynamoDB Local.</p></li>
        </ol>
        <p className={styles.systemNote}>A signed token identifies each temporary workspace. Every protected request derives ownership from that identity; the browser does not supply an authoritative owner ID.</p>
        <p className={styles.evidenceLine}><SourceLink href={evidence.architecture}>Full architecture and current-versus-planned boundary</SourceLink></p>
      </section>

      <section className={styles.section} id="engineering" aria-labelledby="engineering-title">
        <SectionIntro number="04" label="Engineering decisions" id="engineering-title" title="The difficult parts were the boundaries and their consequences.">
          These choices connect product meaning to implementation behavior, including the costs each choice introduces.
        </SectionIntro>
        <div className={styles.storyLead}>
          <p className={styles.storyNumber}>01 / Product + frontend</p>
          <div>
            <h3>One Home decision area, not several competing answers.</h3>
            <p>Earlier Home versions placed a header action, Action Center, and progress recommendation in separate priority positions. The documented audit found that their sources and timing did not always mean the same thing. The redesign gives recorded work one leading area, with strategic analysis and recent updates quieter below it.</p>
            <p className={styles.tradeoff}><strong>Tradeoff</strong> Home shows bounded previews rather than every record. The full Applications and Interviews workspaces remain available.</p>
            <p className={styles.evidenceLine}><SourceLink href={evidence.homeAudit}>Original information audit</SourceLink> · <SourceLink href={evidence.homeContract}>Implemented Home contract</SourceLink></p>
          </div>
        </div>
        <div className={styles.storyPair}>
          <article>
            <p className={styles.storyNumber}>02 / Backend + data</p>
            <h3>Keep lifecycle rules and history on the server.</h3>
            <p>Status transitions pass through a central policy. Version checks reject stale edits; conditional writes keep required activity and projections tied to canonical changes. Archiving preserves the former status so restore does not invent a new transition.</p>
            <p className={styles.tradeoff}><strong>Tradeoff</strong> DynamoDB access patterns and denormalized projections require deliberate transactional maintenance.</p>
            <p className={styles.evidenceLine}><SourceLink href={evidence.statusPolicy}>Transition policy</SourceLink> · <SourceLink href={evidence.applicationService}>Application service</SourceLink> · <SourceLink href={evidence.concurrency}>Decision record</SourceLink></p>
          </article>
          <article>
            <p className={styles.storyNumber}>03 / Demo architecture</p>
            <h3>Make a realistic demo safe to explore.</h3>
            <p>Starting a demo creates a separate fictional workspace with a signed 24-hour identity. Server-derived ownership isolates records, and an idempotency key protects a successful provisioning retry from creating another workspace. Token expiry ends authorization independently of eventual TTL cleanup.</p>
            <p className={styles.tradeoff}><strong>Tradeoff</strong> The demo adds provisioning and cleanup work, while persistent accounts and production traffic controls remain future milestones.</p>
            <p className={styles.evidenceLine}><SourceLink href={evidence.demoService}>Demo service</SourceLink> · <SourceLink href={evidence.demoTests}>Isolation and retry tests</SourceLink></p>
          </article>
        </div>
        <figure className={styles.detailFigure}>
          <div className={styles.screenFrame}>
            <img
              src="/projects/hireflux-opportunity-dark.png"
              alt="Dark-mode HireFlux application workspace connecting a role's journey, check-back date, next-step action, and opportunity details."
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>Application workspace, dark mode. History and a next-step action remain attached to the same fictional opportunity. <a className={styles.imageLink} href="/projects/hireflux-opportunity-dark.png" target="_blank" rel="noreferrer">Open full-size capture <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a></figcaption>
        </figure>
      </section>

      <section className={styles.section} id="proof" aria-labelledby="proof-title">
        <SectionIntro number="05" label="Verification + limits" id="proof-title" title="Evidence is visible; the boundary is explicit.">
          The repository protects meaningful behavior with unit, integration, browser, and accessibility checks. This is an implemented local product slice, not a deployed AWS service.
        </SectionIntro>
        <div className={styles.proofGrid}>
          <div>
            <h3>What is tested</h3>
            <ul className={styles.proofList}>
              <li><strong>Decision meaning</strong><span>Recorded commitments, waiting, partial evidence, and suggestions.</span><SourceLink href={evidence.decisionTests}>Home model tests</SourceLink></li>
              <li><strong>Domain policy</strong><span>The full transition matrix, archive/restore, and applied-date constraints.</span><SourceLink href={evidence.statusTests}>Policy tests</SourceLink></li>
              <li><strong>Demo isolation</strong><span>Owner scope, tampered tokens, provisioning failure, and retry behavior.</span><SourceLink href={evidence.demoTests}>Integration tests</SourceLink></li>
              <li><strong>Delivery quality</strong><span>Lint, types, tests, builds, and dependency checks run on pushes and pull requests.</span><SourceLink href={evidence.qualityWorkflow}>Quality workflow</SourceLink></li>
            </ul>
          </div>
          <aside className={styles.mobileProof}>
            <img
              src="/projects/hireflux-home-mobile.png"
              alt="Narrow dark-mode HireFlux Home with recorded work stacked above the mobile navigation."
              width="390"
              height="844"
              loading="lazy"
              decoding="async"
            />
            <p><strong>The hierarchy survives on a phone.</strong> Recorded work remains ahead of secondary context, while navigation moves to the bottom edge. <a className={styles.imageLink} href="/projects/hireflux-home-mobile.png" target="_blank" rel="noreferrer">Open full-size capture <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a></p>
          </aside>
        </div>
        <div className={styles.secondaryProof}>
          <h3>One more frontend challenge</h3>
          <p>The public landing page has a connected, scroll-led workspace story. It measures viewport and content geometry, changes presentation for smaller spaces, and uses a normal-flow fallback for reduced motion. That work is separate from the authenticated decision model.</p>
          <p className={styles.evidenceLine}><SourceLink href={evidence.connectedStory}>Responsive story selection</SourceLink> · <SourceLink href={evidence.browserTests}>Browser and accessibility checks</SourceLink></p>
        </div>
        <div className={styles.scopeSplit}>
          <div>
            <p className={styles.scopeLabel}>Implemented locally</p>
            <h3>What exists today</h3>
            <p>A React workspace, FastAPI API, DynamoDB Local persistence, temporary seeded sessions, application and interview workflows, analytics, and automated quality checks. There are no production usage metrics to claim.</p>
          </div>
          <div>
            <p className={styles.scopeLabel}>Planned architecture</p>
            <h3>What comes next</h3>
            <p>AWS staging is documented, but no HireFlux AWS environment is provisioned. Persistent accounts, private attachments, reminders, email delivery, and deployment automation remain later work.</p>
            <p className={styles.evidenceLine}><SourceLink href={evidence.roadmap}>Project roadmap</SourceLink></p>
          </div>
        </div>
      </section>

      <footer className={styles.closing}>
        <div>
          <p className={styles.eyebrow}>Continue the evidence trail</p>
          <h2>See the implementation behind the decisions.</h2>
        </div>
        <div className={styles.closingLinks}>
          <SourceLink href={hireFlux.repository}>HireFlux repository</SourceLink>
          <a href={`mailto:${site.email}`}>Email Joan <span aria-hidden="true">↗</span></a>
          <a href="/#work">Return to selected work</a>
        </div>
      </footer>
    </article>
  )
}
