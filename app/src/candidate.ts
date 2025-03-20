export type CandidateSeniority = 'junior' | 'mid' | 'senior'
export interface Candidate {
  name: string
  surname: string
  seniority: CandidateSeniority
  years: number
  availability: boolean
}