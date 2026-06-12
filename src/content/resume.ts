export type Education = {
  degree: string
  years: string
  school: string
  location: string
  highlights: string[]
}

export type Experience = {
  title: string
  dates: string
  company: string
  bullets: string[]
}

export type Certification = {
  name: string
  status: string
  description: string
  link?: { label: string; href: string }
}

export type Skill = {
  name: string
  tenure: string
  detail: string
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    years: '2022 – 2025',
    school: 'Montclair State University',
    location: 'Montclair, NJ',
    highlights: [
      'Data Structures & Algorithms',
      'Web Development',
      'Database Systems',
      'Software Engineering',
      'Computer Networks',
      'Operating Systems',
      'Artificial Intelligence',
      'Computer Security',
    ],
  },
  {
    degree: 'Associate of Science in Computer Science',
    years: '2017 – 2022',
    school: 'Bergen Community College',
    location: 'Paramus, NJ',
    highlights: [
      'Programming Fundamentals',
      'Object-Oriented Programming',
      'Computer Architecture',
    ],
  },
]

export const experience: Experience[] = [
  {
    title: 'Office Manager',
    dates: 'October 2021 – December 2023',
    company: 'Integrated Counseling LCSW PLLC',
    bullets: [
      'Handled appointment scheduling, phone calls, and day-to-day office tasks.',
      'Organized patient information and kept records up to date.',
      'Helped connect patients with psychiatrists and outside providers.',
      'Developed a lightweight internal scheduling tool using Python to manage therapy notes and replace manual tracking processes.',
    ],
  },
  {
    title: 'Technical Support',
    dates: 'June 2021 – September 2021',
    company: 'Conduent',
    bullets: [
      'Improved remote troubleshooting by identifying patterns in common issues and refining escalation processes.',
      'Collaborated with technical teams to resolve complex support cases and improve overall workflow efficiency.',
      'Reviewed past cases to identify recurring problems and implement solutions that reduced repeat issues.',
    ],
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    status: 'Completed · December 2025',
    description:
      'Foundational AWS cloud concepts, services, security, and billing.',
    link: {
      label: 'View verified badge on Credly',
      href: 'https://www.credly.com/badges/7d78d2c9-b16f-4106-b786-109033563ae1/public_url',
    },
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    status: 'Completed · June 2026',
    description:
      'Designing resilient, high-performing, secure, and cost-optimized architectures on AWS.',
    link: {
      label: 'View verified badge on Credly',
      href: 'https://www.credly.com/badges/bd0d1ee6-6c5c-41fd-a1bd-9bad353054b2/public_url',
    },
  },
  {
    name: 'AWS Certified Developer – Associate',
    status: 'In progress',
    description: 'Studying for this certification; exam not yet attempted.',
  },
]

export const skills: Skill[] = [
  { name: 'C++', tenure: '2+ Years', detail: 'OOP, Data Structures, Algorithms' },
  {
    name: 'CSS3',
    tenure: '2+ Years',
    detail: 'Flexbox, Grid, Animations, Responsive Design',
  },
  {
    name: 'Docker',
    tenure: '1+ Years',
    detail: 'Containerization, Docker Compose, CI/CD',
  },
  {
    name: 'REST APIs',
    tenure: '1+ Years',
    detail: 'HTTP, JSON, auth patterns, integration',
  },
  { name: 'Git', tenure: '1+ Years', detail: 'Version control, Branching, CI/CD' },
  {
    name: 'HTML5',
    tenure: '2+ Years',
    detail: 'Semantic markup, accessibility, SEO best practices',
  },
  {
    name: 'JavaScript',
    tenure: '1+ Years',
    detail: 'ES6+, DOM manipulation, Async/Await',
  },
  {
    name: 'Linux',
    tenure: '1+ Years',
    detail: 'Shell scripting, System administration',
  },
  {
    name: 'MySQL',
    tenure: '2+ Years',
    detail: 'Relational databases, SQL queries, Optimization',
  },
  {
    name: 'PHP',
    tenure: '1+ Years',
    detail: 'Server-side scripting, OOP, Web development',
  },
  {
    name: 'Python',
    tenure: '2+ Years',
    detail: 'Data analysis, Automation, Web Scraping',
  },
  {
    name: 'React',
    tenure: '1+ Years',
    detail: 'Hooks, Context, Redux, Next.js',
  },
  {
    name: 'TypeScript',
    tenure: '1+ Years',
    detail: 'Static typing, Interfaces, Generics',
  },
  {
    name: 'AWS',
    tenure: 'Solutions Architect',
    detail: 'Certified · Architecture design, core services & security',
  },
]
