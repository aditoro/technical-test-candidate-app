import { Injectable, signal } from '@angular/core';
import { Candidate } from '../candidate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CandidateForm } from '../candidate';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;
  private candidates = signal<Candidate[]>([])

  constructor(private http: HttpClient) {}

  fetchAllCandidates () {
    return new Promise((resolve, reject) => {
      this.http.get<Candidate[]>(`${this.apiUrl}/candidates`).subscribe({
        next: (candidates) => {
          this.candidates.set(candidates);
          resolve(candidates);
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  createCandidate (baseCandidate: CandidateForm) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('name', baseCandidate.name);
      formData.append('surname', baseCandidate.surname);
      formData.append('file', baseCandidate.file);
      this.http.post<Candidate>(`${this.apiUrl}/candidates`, formData).subscribe({
        next: (response) => {
          resolve(response)
          this.addCandidate(response)
        },
        error: (error) => {
          reject(error.error.errors)
        }
      })
    })
  }

  addCandidate (candidate: Candidate) {
    this.candidates.update((candidates) => [...candidates, candidate] )
  }
  getCandidates () {
    return this.candidates.asReadonly()
  }

  deleteCandidate (candidate: Candidate) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/candidates/${candidate.id}`).subscribe({
        next: () => {
          this.candidates.update((candidates) =>  candidates.filter((c) => c.id !== candidate.id))
          resolve(true)
        },
        error: (error) => {
          reject(error)
        }
      })
    })

  }

}
