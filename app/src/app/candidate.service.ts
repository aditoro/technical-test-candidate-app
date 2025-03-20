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
    this.http.get<Candidate[]>(`${this.apiUrl}/candidates`).subscribe((candidates) => {
      this.candidates.set(candidates)
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
          this.candidates.update((candidates) => [...candidates, response] )
        },
        error: (error) => {
          console.log(error.error.errors)
          reject(error.error.errors)
        }
      })

    })
  }
  getCandidates () {
    return this.candidates.asReadonly()
  }

}
