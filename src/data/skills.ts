export type SkillEntry = {
  name: string
  /** 0–100 (a UI mostra `levelSquares` de 10). */
  proficiency: number
}

export type SkillCategory = {
  id: 'languages' | 'frontend' | 'backend' | 'tools' | 'methodologies'
  skills: SkillEntry[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    skills: [
      { name: 'JavaScript', proficiency: 80 },
      { name: 'TypeScript', proficiency: 95 },
      { name: 'Kotlin', proficiency: 50 },
      { name: 'Python', proficiency: 45 },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { name: 'React', proficiency: 95 },
      { name: 'React Native', proficiency: 80 },
      { name: 'Angular', proficiency: 60 },
      { name: 'Expo', proficiency: 75 },
      { name: 'Vue', proficiency: 50 },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', proficiency: 90 },
      { name: 'Firebase', proficiency: 90 },
      { name: 'AWS', proficiency: 55 },
      { name: 'Docker', proficiency: 60 },
      { name: 'CI/CD', proficiency: 82 },
      { name: 'PostgreSQL', proficiency: 70 },
    ],
  },
  {
    id: 'tools',
    skills: [
      { name: 'Git', proficiency: 95 },
      { name: 'GitHub', proficiency: 90 },
      { name: 'GitLab', proficiency: 80 },
      { name: 'Figma', proficiency: 50 },
    ],
  },
  {
    id: 'methodologies',
    skills: [
      { name: 'Scrum', proficiency: 88 },
      { name: 'Agile', proficiency: 85 },
    ],
  },
]
