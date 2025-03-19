import { Component, Input, SimpleChanges } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Candidate } from '../../../candidate';


@Component({
  selector: 'candidate-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})

export class CandidateListComponent {
  @Input() candidates!: Candidate[];

  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability'];
  dataSource = new MatTableDataSource(this.candidates);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['candidates']) {
      this.dataSource = new MatTableDataSource(this.candidates);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
