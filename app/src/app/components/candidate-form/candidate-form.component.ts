import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
@Component({
  selector: 'candidate-form',
  imports: [],
  template: '',
})
export class CandidateFormComponent {
  @Input() isFomOpen!: boolean;
  @Output() closeForm = new EventEmitter<boolean>(); 

  constructor(private dialog: MatDialog) {}
  onCloseForm() {
    this.closeForm.emit();
  }

  ngOnChanges() {
    if (this.isFomOpen) {
      this.openDialog();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      maxWidth: '800px',
      minWidth: '500px',
      minHeight: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onCloseForm()
      console.log('El formulario se cerró');
    });
  }
}
