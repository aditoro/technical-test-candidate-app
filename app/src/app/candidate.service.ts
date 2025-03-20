import { Injectable, signal } from '@angular/core';
import { Candidate } from '../candidate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CandidateBase } from '../candidate';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;
  private candidates = signal<Candidate[]>([])

  constructor(private http: HttpClient) {}

  async fetchAllCandidates () {
    this.http.get<Candidate[]>(`${this.apiUrl}/candidates`).subscribe((candidates) => {
      this.candidates.set(candidates)
    })
  }

  async createCandidate (baseCandidate: CandidateBase) {
    console.log(baseCandidate)
  }
  getCandidates () {
    return this.candidates.asReadonly()
  }

}
