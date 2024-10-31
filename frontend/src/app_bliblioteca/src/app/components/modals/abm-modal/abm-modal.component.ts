import { Component, Inject } from '@angular/core';
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
          img: [this.data.img || '', Validators.required],
          titulo: [this.data.titulo || '', Validators.required],
          cantidad: [this.data.cantidad || '', Validators.required],
          autor: [this.formOperation === 'edit' ? this.data.autor[0].id : '', Validators.required],
          editorial: [this.data.editorial || '', Validators.required],
          genero: [this.data.genero || '', Validators.required],
          sinopsis: [this.data.sinopsis || '', Validators.required],
        });
        break;
      case 'loan':
        this.formTitle = this.formOperation === 'edit' ? 'Editar Préstamo' : 'Crear Prestamo';
        this.formEntity = this.formBuilder.group({
          usuario: [this.formOperation === 'edit' ? this.data.usuario.id : '', Validators.required],
          libro: [this.formOperation === 'edit' ? this.data.libro[0].id : '', Validators.required],
          inicio_prestamo: [this.data.inicio_prestamo || '', Validators.required],
          fin_prestamo: [this.data.fin_prestamo || '', Validators.required],
          estado: [this.data.estado || '', Validators.required]
        })
        break;
      case 'user':
        this.formTitle = this.formOperation === 'edit' ? 'Editar Usuario' : 'Agregar Usuario';
        this.formEntity = this.formBuilder.group({
          user: [this.data.user || '', Validators.required],
          ...(this.formOperation !== 'edit' && {contraseña: ['', Validators.required]}),
          nombre: [this.data.nombre || '', Validators.required],
          apellido: [this.data.apellido || '', Validators.required],
          dni: [this.data.dni || '', Validators.required],
          telefono: [this.data.telefono || '', Validators.required],
          email: [this.data.email || '', Validators.required],
          rol: [this.data.rol || '', Validators.required],
          img: [this.data.img || '', Validators.required],
          estado: [this.data.estado || '', Validators.required],
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
    this.dialogRef.close(null);
  }

  handleSave(formData: any): void {
    this.dialogRef.close(formData);
  }

saveChanges(): void {
  if (this.formEntity.valid) {
    const formData = { ...this.formEntity.value };

    // Si el formulario es de préstamo, parsea las fechas
    if (formData.inicio_prestamo && formData.fin_prestamo) {
      formData.inicio_prestamo = this.formatDate(formData.inicio_prestamo);
      formData.fin_prestamo = this.formatDate(formData.fin_prestamo);
    }
    this.handleSave(formData);
  }
}

  formatDate(date: string | Date): string {
    const parsedDate = new Date(date);
    const day = (parsedDate.getDate() + 1).toString().padStart(2, '0'); 
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); 
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
