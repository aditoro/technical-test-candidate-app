import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar esto
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CandidateSeniority } from '../../../../candidate';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  seniorityLevels: CandidateSeniority[] = ['junior', 'mid', 'senior'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      seniority: ['', Validators.required],
      years: [0, [Validators.required, Validators.min(0)]],
      availability: [false]
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Datos del formulario:', this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
