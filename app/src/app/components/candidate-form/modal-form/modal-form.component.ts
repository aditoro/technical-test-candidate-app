import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
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
// import { CandidateForm } from '../../../../candidate';
import {MatIconModule} from '@angular/material/icon';
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
    MatCheckboxModule,
    MatIconModule
  ]
})
export class ModalFormComponent {
  form: FormGroup;
  private candidateService = inject(CandidateService)
  serverErrors = signal<string[]>([])
  @ViewChild('excel') excelFileInput!: ElementRef<HTMLInputElement>;

  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<ModalFormComponent>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      file: [null, Validators.required]
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.form.patchValue({ file: input.files[0] });
    }
  }

  clearFile() {
    this.form.patchValue({ file: null });
    if (this.excelFileInput) {
      this.excelFileInput.nativeElement.value = ''; // Borra el archivo seleccionado
    }
  }
  submitForm() {
    if (this.form.valid) {
      this.candidateService.createCandidate(this.form.value).then(() => {
        this.dialogRef.close(this.form.value);
      }).catch((errors) => {
        this.serverErrors.set(errors)
        console.log(this.serverErrors())
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
