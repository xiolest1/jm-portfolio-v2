export const hireFlux = {
  id: 'project-hireflux',
  title: 'HireFlux',
  type: 'Personal project',
  status: 'Local demo · AWS infrastructure not deployed',
  summary:
    'A job-search workspace for candidates to organize applications, plan follow-ups, prepare for interviews, and see what needs attention next.',
  image: '/projects/hireflux-home-light.png',
  imageAlt:
    'Light-mode HireFlux Action Center in a fictional local demo, with recorded commitments separated from a stage-age suggestion.',
  stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'DynamoDB Local'],
  signals: [
    'Server-derived actions with explicit uncertainty',
    'Owner-scoped data access',
    'Concurrency handling and idempotency',
    'Validation and automated tests',
  ],
  repository: 'https://github.com/xiolest1/HireFlux',
  caseStudy: '/hireflux',
}

export const libraryProject = {
  id: 'project-library',
  title: 'Library Web Application',
  type: 'Team project',
  summary:
    'Search for books, save favorites, and organize personal reading lists, with accounts and different access for readers and library staff.',
  contribution:
    'Backend APIs, PostgreSQL and SQLAlchemy data work, session authentication and roles, and Docker setup.',
  stack: ['Flask', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
  repository: 'https://github.com/xiolest1/library-app',
}

export const rcProject = {
  id: 'project-rcdetection',
  title: 'Autonomous RC Vehicle',
  type: 'Team project',
  summary:
    'A camera-guided RC vehicle designed to find a known visual target and steer toward it. The software estimates target position and distance, then sends movement commands to an Arduino.',
  contribution:
    'Camera calibration, feature matching and positional analysis, with Arduino serial control.',
  stack: ['Python', 'OpenCV', 'NumPy', 'PySerial', 'Arduino'],
  image: '/projects/rc-detection.jpg',
  imageAlt: 'RC vehicle used in the computer-vision and control project.',
  repository: 'https://github.com/xiolest1/RCDetection',
}
