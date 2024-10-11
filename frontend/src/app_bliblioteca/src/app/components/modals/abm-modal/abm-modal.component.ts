import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-modal',
  templateUrl: './abm-modal.component.html',
  styleUrl: './abm-modal.component.css'
})
export class AbmModalComponent {
  formEntity!: FormGroup;
  formTitle: string = '';
  formOperation: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AbmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formOperation = this.data.formOperation || 'create';
    this.formControl(this.data.formType);
  }

  formControl(formType: string): void {
    switch (formType) {
      case 'book':
        this.formTitle = this.formOperation === 'edit' ? 'Editar Libro' : 'Agregar Libro';
        this.formEntity = this.formBuilder.group({
          bookTitle: [this.data.bookTitle || '', Validators.required],
          bookAutor: [this.data.bookAutor || '', Validators.required],
          bookEditorial: [this.data.bookEditorial || '', Validators.required],
          bookGenero: [this.data.bookGenero || '', Validators.required],
          bookSinopsis: [this.data.bookSinopsis || '', Validators.required],
          bookCantidad: [this.data.bookCantidad || '', Validators.required],
        });
        break;
      case 'loan':
        this.formTitle = this.formOperation === 'edit' ? 'Editar Préstamo' : 'Crear Prestamo';
        this.formEntity = this.formBuilder.group({
          bookTitle: [this.data.bookTitle || '', Validators.required],
          username: [this.data.username || '', Validators.required],
          startDate: [this.data.startDate || '', Validators.required],
          endDate: [this.data.endDate || '', Validators.required],
          status: [this.data.status || '', Validators.required]
        })
        break;
      case 'user':
        this.formTitle = this.formOperation === 'edit' ? 'Editar Usuario' : 'Agregar Usuario';
        this.formEntity = this.formBuilder.group({
          username: [this.data.username || '', Validators.required],
          name: [this.data.user || '', Validators.required],
          lastname: [this.data.user || '', Validators.required],
          dni: [this.data.dni || '', Validators.required],
          telefono: [this.data.telefono || '', Validators.required],
          email: [this.data.email || '', Validators.required],
          rol: [this.data.rol || '', Validators.required],
        })
        break;
      
        default:
          throw new Error('Tipo de formulario desconocido');
    }
  }

  isAdmin() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Admin")) {
    return true;
  } else {
    return false;
  }
  }

  closeModal(): void {
    this.dialogRef.close()
  }

  handleSave(formData: any): void {
    console.log('Guardando datos...', formData);
    this.dialogRef.close(formData);
  }

  saveChanges(): void {
    if (this.formEntity.valid) {
      console.log('Datos del formulario: ', this.formEntity.value);
      this.handleSave(this.formEntity.value)
    }
  }
}
