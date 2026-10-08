import { hireFlux } from './projects'

// Product captures are September 29 fixtures. Current qualification has its own revision.
export const demoCommit = '533cee182dc1a20ef7edb45db5d2c0ee21635dfd'
export const qualificationCommit = '0ef61b75e60def13db78bde17cbbb70d36981b08'
const source = (path: string, commit = demoCommit) => `${hireFlux.repository}/blob/${commit}/${path}`
export const evidence = {
  architecture: source('ARCHITECTURE.md'),
  insights: source('backend/src/hireflux_backend/application/insights.py'),
  decisionModel: source('frontend/src/features/workspace/homeDecisionModel.ts'),
  decisionTests: source('frontend/src/features/workspace/homeDecisionModel.test.ts'),
  compositionTests: source('frontend/src/pages/HomeComposition.test.tsx'),
  audit: source('docs/home-stage-1-cognition-information-audit.md'),
  informationArchitecture: source('docs/home-stage-2-cognitive-information-architecture.md'),
  compositionResearch: source('docs/home-stage-3-visual-composition-research.md'),
  decisionSection: source('frontend/src/features/workspace/HomeDecisionSection.tsx'),
  homeContract: source('docs/home-implementation-contract.md'),
  policy: source('backend/src/hireflux_backend/domain/status_policy.py'),
  policyTests: source('backend/tests/unit/test_status_policy.py'),
  services: source('backend/src/hireflux_backend/application/services.py'),
  apiTests: source('backend/tests/integration/test_api_flow.py'),
  repositories: source('backend/src/hireflux_backend/infrastructure/dynamodb/repositories.py'),
  concurrency: source('docs/adr/0003-archive-and-optimistic-concurrency.md'),
  accessPatterns: source('docs/dynamodb-access-patterns.md'),
  demo: source('backend/src/hireflux_backend/application/demo_sessions.py'),
  demoRepository: source('backend/src/hireflux_backend/infrastructure/dynamodb/demo_workspace_repository.py'),
  demoTests: source('backend/tests/integration/test_demo_sessions.py'),
  identity: source('backend/src/hireflux_backend/auth/demo.py'),
  demoAdr: source('docs/adr/0004-isolated-recruiter-demo-sessions.md'),
  sessionTests: source('frontend/src/pages/DemoSessionFlow.test.tsx'),
  landing: source('frontend/src/features/landing/useConnectedStoryArchitecture.ts'),
  browserTests: source('frontend/e2e/home-redesign.spec.ts'),
  visualTests: source('frontend/e2e/visual-regression.spec.ts'),
  quality: source('.github/workflows/quality.yml', qualificationCommit),
  run: `${hireFlux.repository}/actions/runs/37647631455`,
  currentArchitecture: source('ARCHITECTURE.md', qualificationCommit),
  durable: source('docs/adr/0007-durable-workspace-manifest-and-erasure.md', qualificationCommit),
  infrastructure: source('infra/README.md', qualificationCommit),
  roadmap: source('docs/roadmap.md', qualificationCommit),
  readiness: source('docs/production-account-readiness.md', qualificationCommit),
  homeImplementation: `${hireFlux.repository}/commit/4b9963035dc91d747b3aea5c08483848b4014c48`,
  homeIteration: `${hireFlux.repository}/commit/1ad1ccc704c080692ac92c7e1624fcaaf2d47bae`,
}
export const chapters = [
  { id: 'investigation', label: 'The problem', question: 'Which answer should a candidate trust?' },
  { id: 'workflow', label: 'The product', question: 'What changed when meaning led the design?' },
  { id: 'system', label: 'The system', question: 'Where is that meaning enforced?' },
  { id: 'engineering', label: 'Under pressure', question: 'What happens when edits and requests collide?' },
  { id: 'verification', label: 'The proof', question: 'What was checked, and what remains?' },
] as const
