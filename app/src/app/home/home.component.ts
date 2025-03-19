import { Component, inject, computed } from '@angular/core';
import { CandidateListComponent } from '../components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from '../components/candidate-form/candidate-form.component';
import {CandidateService} from '../candidate.service';
@Component({
  selector: 'app-home',
  imports: [CandidateListComponent, CandidateFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private candidateService = inject(CandidateService)
  candidatesList = computed(() => {
    return this.candidateService.getCandidates()()
  });
  constructor () {
    this.candidateService.fetchAllCandidates()
  }

}
