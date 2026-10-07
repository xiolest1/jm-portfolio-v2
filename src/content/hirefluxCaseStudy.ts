import { hireFlux } from './projects'

// Reviewed demo milestone: these sources and CI results do not describe latest HEAD.
export const demoCommit = '533cee182dc1a20ef7edb45db5d2c0ee21635dfd'
export const continuationCommit = '645e834b7e6f45e7ccfd8bc0fff0b61b17ec7050'
const source = (path: string, commit = demoCommit) => `${hireFlux.repository}/blob/${commit}/${path}`
export const evidence = {
  architecture: source('ARCHITECTURE.md'),
  insights: source('backend/src/hireflux_backend/application/insights.py'),
  decisionModel: source('frontend/src/features/workspace/homeDecisionModel.ts'),
  decisionTests: source('frontend/src/features/workspace/homeDecisionModel.test.ts'),
  compositionTests: source('frontend/src/pages/HomeComposition.test.tsx'),
  audit: source('docs/home-stage-1-cognition-information-audit.md'),
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
  quality: source('.github/workflows/quality.yml'),
  run: `${hireFlux.repository}/actions/runs/36665312626`,
  currentArchitecture: source('ARCHITECTURE.md', continuationCommit),
  durable: source('docs/adr/0007-durable-workspace-manifest-and-erasure.md', continuationCommit),
  infrastructure: source('infra/README.md', continuationCommit),
  roadmap: source('docs/roadmap.md', continuationCommit),
}
export const chapters = [
  { id: 'workflow', label: 'Product', question: 'What does the candidate need to know?' },
  { id: 'system', label: 'Architecture', question: 'Where do the rules live?' },
  { id: 'engineering', label: 'Correctness', question: 'What happens when state or requests collide?' },
  { id: 'verification', label: 'Proof', question: 'What was actually checked?' },
  { id: 'limits', label: 'Boundaries', question: 'What is ready, and what is next?' },
] as const
