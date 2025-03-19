import { Injectable, signal } from '@angular/core';
import { Candidate } from '../candidate';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candidates = signal<Candidate[]>([])

  async fetchAllCandidates () {
    setTimeout(() => {
      console.log('---> push')
      const can1: Candidate = {
        name: 'Paco',
        surname: 'De Lucia',
        seniority: 'senior',
        years: 56,
        availability: true
      }
      const can2: Candidate = {
        name: 'Mario',
        surname: 'Bruno',
        seniority: 'junior',
        years: 12,
        availability: true
      }
      this.candidates.update(candidates => [...candidates, can1, can2])
    }, 3000)
  }

  getCandidates () {
    return this.candidates.asReadonly()
  }
  constructor() {

    this.fetchAllCandidates()
  }
}
