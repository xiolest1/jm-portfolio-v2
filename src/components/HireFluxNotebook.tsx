import { demoCommit, qualificationCommit, evidence } from '../content/hirefluxCaseStudy'
import { SourceLink } from './HireFluxVisuals'
import styles from './HireFluxCaseStudy.module.css'

export function HireFluxNotebook() {
  return (
    <section
      className={styles.sourceJournal}
      id="sources"
      aria-labelledby="sources-heading"
    >
      <div className={styles.journalHeading}>
        <h3 id="sources-heading">The engineering notebook</h3>
        <p>Primary story above. Contracts, alternatives, and proof below.</p>
      </div>
      <p className={styles.provenance}>
        Product captures: Sep 29, 2026. Product/source references:{' '}
        <code>{demoCommit.slice(0, 7)}</code>. Current qualification and preparation:{' '}
        <code>{qualificationCommit.slice(0, 7)}</code>. No candidate user study or
        measured usability gain is claimed.
      </p>

      <details className={styles.disclosure} id="evidence-product">
        <summary>Home investigation, alternatives, and meaning contracts</summary>
        <div className={styles.depthContent}>
          <h4>Why the first redesign needed another pass</h4>
          <p>
            Briefing hid peers behind expansion; Triage resembled another inbox; an
            Editorial command center risked inventing a winner. The selected hybrid
            permits a focal dated commitment only when evidence supports it,
            otherwise peers with compact classes and disclosure.
          </p>
          <p>
            The audit combines source inspection and one observed fictional demo.
            Its constructed inconsistent-payload probe is not an observed empty
            workspace or a user-test result.
          </p>
          <h4>The evidence ceiling</h4>
          <p>
            Follow-ups and interviews keep saved dates; undated work stays undated.
            Employer ownership identifies whose move it is, but a saved candidate
            check-back can still become due. Unknown owners remain labeled unknown.
            A failed refresh or ownership-source lookup cannot produce an all-clear.
          </p>
          <p>
            The operational source is bounded: up to 100 due follow-ups and five
            upcoming interviews. Disclosures reveal returned items, not an
            exhaustive search. Home’s 14-day Applied/Screening cue differs from
            Search Health’s 21/14/9-day patterns. Date labels can age on an open
            page; there is no midnight refresh timer.
          </p>
          <div className={styles.sourceLinks}>
            <SourceLink href={evidence.audit}>Stage 1 / audit</SourceLink>
            <SourceLink href={evidence.informationArchitecture}>Stage 2 / IA</SourceLink>
            <SourceLink href={evidence.compositionResearch}>Stage 3 / composition</SourceLink>
            <SourceLink href={evidence.homeContract}>Home contract</SourceLink>
            <SourceLink href={evidence.insights}>Server derivation</SourceLink>
            <SourceLink href={evidence.decisionModel}>Presentation model</SourceLink>
            <SourceLink href={evidence.decisionSection}>Decision component</SourceLink>
            <SourceLink href={evidence.homeImplementation}>Implementation commit</SourceLink>
            <SourceLink href={evidence.homeIteration}>Composition refinement</SourceLink>
          </div>
        </div>
      </details>

      <details className={styles.disclosure} id="evidence-system">
        <summary>Architecture, ownership, and consistency boundaries</summary>
        <div className={styles.depthContent}>
          <h4>Identity before access</h4>
          <p>
            A signed demo token determines owner scope; request bodies do not choose
            it. Owner-qualified keys prevent guessed IDs from addressing another
            workspace. Foreign and missing resources return 404.
          </p>
          <h4>Product questions determine access patterns</h4>
          <p>
            Normal requests use GetItem and Query rather than Scan. Sparse indexes
            support recent records, status views, and scheduled work. Canonical
            records, required projections, and activity are maintained by writes.
          </p>
          <p>
            Index reads may lag; pagination is not a cross-request snapshot.
            Logical cursors are scoped to identity and filters. Canonical write
            conditions do not depend on index freshness.
          </p>
          <div className={styles.sourceLinks}>
            <SourceLink href={evidence.architecture}>September architecture</SourceLink>
            <SourceLink href={evidence.accessPatterns}>Access patterns</SourceLink>
            <SourceLink href={evidence.repositories}>Persistence adapter</SourceLink>
            <SourceLink href={evidence.identity}>Identity verifier</SourceLink>
            <SourceLink href={evidence.currentArchitecture}>Current architecture</SourceLink>
          </div>
        </div>
      </details>

      <details className={styles.disclosure} id="evidence-correctness">
        <summary>Versioned writes, lifecycle, and retry failure handling</summary>
        <div className={styles.depthContent}>
          <div className={styles.payloadPair}>
            <div>
              <h4>B’s stale request</h4>
              <pre>
                <code>
                  {'PATCH /api/v1/applications/{id}\n{\n  "expected_version": 1,\n  "company_name": "Northwind Labs"\n}'}
                </code>
              </pre>
            </div>
            <div>
              <h4>Required outcome</h4>
              <pre>
                <code>
                  {'HTTP 409 Conflict\nStored version remains 2.\nNorthwind Robotics survives.'}
                </code>
              </pre>
              <p className={styles.provenance}>
                Explanatory outcome, not a verbatim response payload.
              </p>
            </div>
          </div>
          <p>
            Status has a separate transition contract. Repeating the current status
            is a no-op. Archive retains the prior status; restore is restricted to
            that status. Required activity and projections commit with the mutation.
          </p>
          <h4>Provisioning is a lifecycle, not a seed script</h4>
          <p>
            Reserve PROVISIONING and a hashed optional idempotency key before seeding
            through ordinary services. READY enables replay of the original identity
            and expiry. Seed failure returns 503 and attempts FAILED marking plus
            best-effort cleanup; failed-key replay and in-progress provisioning
            return defined 409 responses.
          </p>
          <p>
            The browser keeps tab-scoped demo sessions and clears identity-specific
            query state when switching workspaces. Signed-token expiry denies
            access; TTL does not promise exact-time deletion.
          </p>
          <div className={styles.sourceLinks}>
            <SourceLink href={evidence.concurrency}>Concurrency ADR</SourceLink>
            <SourceLink href={evidence.services}>Application services</SourceLink>
            <SourceLink href={evidence.policy}>Lifecycle policy</SourceLink>
            <SourceLink href={evidence.demoAdr}>Isolation / retry ADR</SourceLink>
            <SourceLink href={evidence.demo}>Provisioning service</SourceLink>
            <SourceLink href={evidence.demoRepository}>Provisioning repository</SourceLink>
          </div>
        </div>
      </details>

      <details className={styles.disclosure} id="evidence-verification">
        <summary>Test evidence, executed scope, and later preparation</summary>
        <div className={styles.depthContent}>
          <h4>Assertions and execution are different evidence</h4>
          <p>
            September source links document behavior and its tests. October 7 run
            #74 at <code>{qualificationCommit.slice(0, 7)}</code> passed five jobs.
            Python 3.14 logs show 422 tests passed with one warning; frontend logs
            show 364 passed in 46 files. The infrastructure job passed 119
            unit/topology tests and four real-artifact synthesis tests. The
            separate Lambda artifact probe also passed.
          </p>
          <p>
            Static checks, builds, backend/frontend dependency audits, and synthesis
            succeeded. Infrastructure retains a documented CDK advisory; passing
            qualification does not mean every dependency is free of advisories.
            This quality workflow does not run the Playwright Home suites or deploy
            the application. Browser and visual-regression test code is distinct
            from execution in this run.
          </p>
          <p>
            The connected landing presentation has responsive geometry and a
            reduced-motion fallback, but it is secondary to the application
            decision system.
          </p>
          <h4>Implemented preparation, planned runtime</h4>
          <p>
            Current preparation includes durable local workspace boundaries, bounded
            export, resumable erasure, deterministic Lambda packaging, and CDK
            infrastructure/hosting definitions. The intended runtime uses Amplify,
            API Gateway, one Lambda/FastAPI application, DynamoDB, and CloudWatch.
            Cognito, attachments, and reminders remain later capabilities.
          </p>
          <p>
            No production traffic, candidate outcome, or operational-security
            guarantee is established by these checks.
          </p>
          <div className={styles.sourceLinks}>
            <SourceLink href={evidence.decisionTests}>Meaning tests</SourceLink>
            <SourceLink href={evidence.compositionTests}>Composition tests</SourceLink>
            <SourceLink href={evidence.apiTests}>API / stale-write tests</SourceLink>
            <SourceLink href={evidence.policyTests}>Policy tests</SourceLink>
            <SourceLink href={evidence.demoTests}>Demo failure / retry tests</SourceLink>
            <SourceLink href={evidence.sessionTests}>Session-switch tests</SourceLink>
            <SourceLink href={evidence.browserTests}>Browser test code</SourceLink>
            <SourceLink href={evidence.visualTests}>Visual test code</SourceLink>
            <SourceLink href={evidence.landing}>Landing geometry</SourceLink>
            <SourceLink href={evidence.quality}>Executed workflow</SourceLink>
            <SourceLink href={evidence.run}>Run logs</SourceLink>
            <SourceLink href={evidence.durable}>Durable-workspace ADR</SourceLink>
            <SourceLink href={evidence.infrastructure}>Infrastructure preparation</SourceLink>
            <SourceLink href={evidence.roadmap}>Roadmap</SourceLink>
          </div>
        </div>
      </details>
    </section>
  )
}

