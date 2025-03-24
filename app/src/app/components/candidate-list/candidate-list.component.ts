import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Candidate } from '../../../candidate';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'candidate-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule, MatPaginatorModule],
  templateUrl: './candidate-list.component.html',
})

export class CandidateListComponent {
  @Input() candidates!: Candidate[];

  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability'];
  dataSource = new MatTableDataSource<Candidate>(this.candidates);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator)
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
}
