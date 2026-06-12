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

export type SkillCategory = {
  name: string
  items: string[]
  note?: string
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

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++'],
  },
  {
    name: 'Frontend',
    items: ['React', 'HTML5', 'CSS3'],
  },
  {
    name: 'Backend',
    items: ['Flask', 'Node.js', 'REST APIs'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    name: 'Cloud & DevOps',
    note: 'AWS Certified · Solutions Architect – Associate & Cloud Practitioner',
    items: [
      'AWS',
      'EC2',
      'S3',
      'IAM',
      'VPC',
      'RDS',
      'Lambda',
      'CloudFront',
      'Route 53',
      'Auto Scaling',
      'Elastic Load Balancing',
      'Docker',
    ],
  },
  {
    name: 'Tools',
    items: ['Git', 'Linux'],
  },
]
