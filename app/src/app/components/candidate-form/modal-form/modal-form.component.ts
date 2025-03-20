import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar esto
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {CandidateService} from '../../../candidate.service';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  templateUrl: './modal-form.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class ModalFormComponent {
  form: FormGroup;
  private candidateService = inject(CandidateService)

  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<ModalFormComponent>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.candidateService.createCandidate(this.form.value).then(() => {
        this.dialogRef.close(this.form.value);
      }).catch(() => {
        alert('error!!!!')
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
