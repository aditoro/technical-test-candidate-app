export type CandidateSeniority = 'junior' | 'senior'

export interface CandidateBase {
  name: string
  surname: string
}

export interface CandidateForm extends CandidateBase {
  file: File
}

export interface Candidate extends CandidateBase {
  seniority: CandidateSeniority
  years: number
  availability: boolean
}