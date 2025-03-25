import { Component, inject, computed, signal } from '@angular/core';
import { CandidateListComponent } from '../components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from '../components/candidate-form/candidate-form.component';
import {CandidateService} from '../candidate.service';
import {MatButtonModule} from '@angular/material/button';
import { Candidate } from '../../candidate';
@Component({
  selector: 'app-home',
  imports: [CandidateListComponent, CandidateFormComponent, MatButtonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private candidateService = inject(CandidateService)
  isFormOpen = signal<boolean>(false)
  candidatesList = computed(() => {
    return this.candidateService.getCandidates()()
  });
  constructor () {
    this.candidateService.fetchAllCandidates()
  }

  openForm () {
    this.isFormOpen.set(true)
  }
  closeForm () {
    this.isFormOpen.set(false)
  }

  deleteCandidate (candidate: Candidate) {
    this.candidateService.deleteCandidate(candidate)
  }
}
