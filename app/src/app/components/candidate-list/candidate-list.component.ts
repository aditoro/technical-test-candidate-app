import { Component, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Candidate } from '../../../candidate';

@Component({
  selector: 'candidate-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './candidate-list.component.html',
})

export class CandidateListComponent {
  @Input() candidates!: Candidate[];
  @Output() deleteCandidate = new EventEmitter<Candidate>(); 

  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability', 'actions'];
  dataSource = new MatTableDataSource<Candidate>(this.candidates);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['candidates']) {
      this.dataSource.data = this.candidates;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteCandidate (candidate: Candidate) {
    this.deleteCandidate.emit(candidate)
  }
}
