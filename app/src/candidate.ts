export interface Candidate {
  name: string
  surname: string
  seniority: 'junior' | 'mid' | 'senior',
  years: number
  availability: boolean
}