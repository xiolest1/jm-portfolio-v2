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
        <code>{demoCommit.slice(0, 7)}</code>. Public source qualification:{' '}
        <code>{qualificationCommit.slice(0, 7)}</code> on Oct 7. The Oct 8 readiness
        assessment is local, uncommitted documentation. No candidate user study or
        measured usability gain is claimed.
      </p>

      <nav className={styles.notebookMap} aria-label="Engineering notebook topics">
        <a href="#evidence-problem"><span>01 / Problem</span><strong>Why Home needed another pass</strong></a>
        <a href="#evidence-product"><span>02 / Product</span><strong>What the guidance can say</strong></a>
        <a href="#evidence-system"><span>03 / System</span><strong>How facts stay scoped</strong></a>
        <a href="#evidence-correctness"><span>04 / Correctness</span><strong>How newer work survives</strong></a>
        <a href="#evidence-verification"><span>05 / Proof</span><strong>What ran and what remains</strong></a>
      </nav>

      <details className={styles.disclosure} id="evidence-problem">
        <summary>Problem / the audit and design alternatives</summary>
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
          <div className={styles.sourceLinks}>
            <SourceLink href={evidence.audit}>Source and runtime audit</SourceLink>
            <SourceLink href={evidence.informationArchitecture}>Information architecture</SourceLink>
            <SourceLink href={evidence.compositionResearch}>Composition research</SourceLink>
            <SourceLink href={evidence.homeImplementation}>First implementation</SourceLink>
            <SourceLink href={evidence.homeIteration}>Composition refinement</SourceLink>
          </div>
        </div>
      </details>

      <details className={styles.disclosure} id="evidence-product">
        <summary>Product / action meaning and the evidence ceiling</summary>
        <div className={styles.depthContent}>
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
            <SourceLink href={evidence.homeContract}>Home contract</SourceLink>
            <SourceLink href={evidence.insights}>Server derivation</SourceLink>
            <SourceLink href={evidence.decisionModel}>Presentation model</SourceLink>
            <SourceLink href={evidence.decisionSection}>Decision component</SourceLink>
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

      <section className={styles.notebookProof} id="evidence-verification" aria-labelledby="notebook-proof-heading">
        <div className={styles.notebookProofHeading}>
          <h4 id="notebook-proof-heading">Proof / protected behavior and executed scope</h4>
          <p>Inspect the behavior, the test source, and the dated run separately. Preparation and deployment boundaries follow.</p>
        </div>

        <details className={styles.disclosure} id="proof-meaning">
          <summary>Meaning / no invented due date</summary>
          <div className={styles.depthContent}>
            <p>A 14-day stage cue without a saved deadline supports a suggested review, not an overdue follow-up. These links document the action rule and its presentation tests; they are not a claim that the browser suites ran in October 7’s quality workflow.</p>
            <div className={styles.sourceLinks}>
              <SourceLink href={evidence.decisionTests}>Action meaning tests</SourceLink>
              <SourceLink href={evidence.compositionTests}>Home composition tests</SourceLink>
            </div>
          </div>
        </details>

        <details className={styles.disclosure} id="proof-state">
          <summary>State / a stale write cannot replace newer work</summary>
          <div className={styles.depthContent}>
            <p>When Tab B submits expected version 1 after the stored application reaches version 2, the write conflicts and the newer record survives. Lifecycle transitions have separate policy checks.</p>
            <div className={styles.sourceLinks}>
              <SourceLink href={evidence.apiTests}>API and stale-write tests</SourceLink>
              <SourceLink href={evidence.policyTests}>Lifecycle policy tests</SourceLink>
            </div>
          </div>
        </details>

        <details className={styles.disclosure} id="proof-recovery">
          <summary>Recovery / a failed seed grants no usable session</summary>
          <div className={styles.depthContent}>
            <p>Injected seed failure returns 503 and attempts FAILED marking with best-effort cleanup. Session-switch tests separately protect identity-specific browser state.</p>
            <div className={styles.sourceLinks}>
              <SourceLink href={evidence.demoTests}>Demo failure and retry tests</SourceLink>
              <SourceLink href={evidence.sessionTests}>Session-switch tests</SourceLink>
            </div>
          </div>
        </details>

        <details className={styles.disclosure} id="proof-execution">
          <summary>Execution / October 7 quality run and its limits</summary>
          <div className={styles.depthContent}>
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
            <div className={styles.sourceLinks}>
              <SourceLink href={evidence.browserTests}>Browser test code</SourceLink>
              <SourceLink href={evidence.visualTests}>Visual test code</SourceLink>
              <SourceLink href={evidence.landing}>Landing geometry</SourceLink>
              <SourceLink href={evidence.quality}>Executed workflow</SourceLink>
              <SourceLink href={evidence.run}>October 7 run logs</SourceLink>
            </div>
          </div>
        </details>

        <details className={styles.disclosure} id="proof-readiness">
          <summary>Boundary / prepared runtime and October 8 assessment</summary>
          <div className={styles.depthContent}>
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
            <h4>October 8: read-only deployment assessment</h4>
            <p>
              The shared-account review reached fourteen service families and
              nineteen CloudFormation type schemas. Successful metadata reads do not
              prove permission or eligibility to create the proposed resources.
              Narrower IAM, trust, and bootstrap designs are review drafts; no policy,
              role, credential profile, stack, or hosting resource was created.
            </p>
            <p>
              Thirty-seven synthetic permission cases were evaluated: 36 matched
              expectations, while an SNS cleanup case remained denied. Simulation
              cannot establish live service behavior. Lambda concurrency headroom
              remains insufficient for the qualified reservation; a quota request and
              a staging-only fallback are proposals, not completed changes. Account
              plan and Billing evidence still need owner review. Deployment remains
              blocked pending these decisions and renewed qualification.
            </p>
            <p>
              This October 8 work exists in uncommitted HireFlux documentation and
              proposals. The linked readiness record below is the last committed
              preflight, dated October 7; no runtime, infrastructure source, lockfile,
              or quality workflow changed in the October 8 assessment.
            </p>
            <div className={styles.sourceLinks}>
              <SourceLink href={evidence.durable}>Durable-workspace ADR</SourceLink>
              <SourceLink href={evidence.infrastructure}>Committed infrastructure preparation</SourceLink>
              <SourceLink href={evidence.roadmap}>Roadmap</SourceLink>
              <SourceLink href={evidence.readiness}>Committed October 7 preflight</SourceLink>
            </div>
          </div>
        </details>
      </section>
    </section>
  )
}

