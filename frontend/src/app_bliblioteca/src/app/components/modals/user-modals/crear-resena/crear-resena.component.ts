import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-resena',
  templateUrl: './crear-resena.component.html',
  styleUrl: './crear-resena.component.css'
})
export class CrearResenaComponent {
  formResena!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrearResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formResena = this.formBuilder.group({
    usuario: ['', Validators.required],
    libro: ['', Validators.required],
    fecha: ['', Validators.required],
    descripcion: ['', Validators.required],
    valoracion: ['', Validators.required]
    })
  }

  closeModal(): void {
    this.dialogRef.close()
  }

  handleSave(formData: any): void {
    this.dialogRef.close(formData);
  }

  saveChanges(): void {
    if (this.formResena.valid) {
      console.log('Datos del formulario: ', this.formResena.value);
      this.handleSave(this.formResena.value)
    }
  }

  //Arreglar html
}
