export type Education = {
  degree: string
  school: string
  detail?: string
}

export type Experience = {
  title: string
  company: string
  evidence: string
}

export type Certification = {
  name: string
  link: string
}

export type EngineeringEvidence = {
  label: string
  href: string
}

export type EngineeringMapping = {
  capability: string
  paths: EngineeringEvidencePath[]
}

export type EngineeringEvidencePath = {
  technologies: string[]
  evidence: EngineeringEvidence[]
}

export type EngineeringGroup = {
  name: string
  level: 'lead' | 'standard' | 'quiet'
  mappings: EngineeringMapping[]
}

export const education: Education[] = [
  {
    degree: 'B.S. Computer Science',
    school: 'Montclair State University',
    detail: 'May 2025',
  },
  {
    degree: 'A.S. Computer Science',
    school: 'Bergen Community College',
  },
]

export const experience: Experience[] = [
  {
    title: 'Office Manager',
    company: 'Integrated Counseling',
    evidence:
      'Built practical internal Python workflow tooling while carrying day-to-day professional responsibility.',
  },
  {
    title: 'Technical Support',
    company: 'Conduent',
    evidence:
      'Diagnosed technical issues, communicated troubleshooting steps, and used judgment to escalate cases.',
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    link: 'https://www.credly.com/badges/bd0d1ee6-6c5c-41fd-a1bd-9bad353054b2/public_url',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    link: 'https://www.credly.com/badges/7d78d2c9-b16f-4106-b786-109033563ae1/public_url',
  },
]

export const engineeringGroups: EngineeringGroup[] = [
  {
    name: 'Application engineering',
    level: 'lead',
    mappings: [
      {
        capability: 'API development',
        paths: [
          {
            technologies: ['Python', 'FastAPI'],
            evidence: [{ label: 'HireFlux', href: '/hireflux' }],
          },
          {
            technologies: ['Flask'],
            evidence: [{ label: 'Library', href: '#project-library' }],
          },
        ],
      },
      {
        capability: 'Product UI',
        paths: [
          {
            technologies: ['React', 'TypeScript', 'Vite'],
            evidence: [{ label: 'HireFlux', href: '/hireflux' }],
          },
        ],
      },
    ],
  },
  {
    name: 'Data & persistence',
    level: 'standard',
    mappings: [
      {
        capability: 'Local NoSQL persistence',
        paths: [
          {
            technologies: ['DynamoDB Local'],
            evidence: [{ label: 'HireFlux', href: '/hireflux' }],
          },
        ],
      },
      {
        capability: 'Relational data access',
        paths: [
          {
            technologies: ['PostgreSQL', 'SQLAlchemy'],
            evidence: [{ label: 'Library', href: '#project-library' }],
          },
        ],
      },
    ],
  },
  {
    name: 'Computer vision & integration',
    level: 'standard',
    mappings: [
      {
        capability: 'Vision & device control',
        paths: [
          {
            technologies: ['OpenCV', 'NumPy', 'PySerial'],
            evidence: [{ label: 'RCDetection', href: '#project-rcdetection' }],
          },
        ],
      },
    ],
  },
  {
    name: 'Cloud & delivery foundations',
    level: 'quiet',
    mappings: [
      {
        capability: 'Container delivery',
        paths: [
          {
            technologies: ['Docker'],
            evidence: [{ label: 'Library', href: '#project-library' }],
          },
        ],
      },
      {
        capability: 'Cloud credentials · complete',
        paths: [
          {
            technologies: ['AWS'],
            evidence: [{ label: 'Credentials', href: '#credentials' }],
          },
        ],
      },
      {
        capability: 'Cloud deployment · planned',
        paths: [
          {
            technologies: ['AWS'],
            evidence: [{ label: 'HireFlux · planned', href: '/hireflux' }],
          },
        ],
      },
    ],
  },
]
