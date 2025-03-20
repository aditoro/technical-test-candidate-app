export type CandidateSeniority = 'junior' | 'mid' | 'senior'

export interface CandidateBase {
  name: string
  surname: string
}

export interface Candidate extends CandidateBase {
  seniority: CandidateSeniority
  years: number
  availability: boolean
}