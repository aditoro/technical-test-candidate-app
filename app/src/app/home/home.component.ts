import { Component } from '@angular/core';
import { CandidateListComponent } from '../components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from '../components/candidate-form/candidate-form.component';
@Component({
  selector: 'app-home',
  imports: [CandidateListComponent, CandidateFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
