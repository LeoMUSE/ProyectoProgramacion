import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  formPerfil!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formPerfil = this.formBuilder.group({
      user: ['', Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required, Validators.maxLength(10)],
      email: ['', Validators.required],
      rol: ['', Validators.required],
    })
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
    this.dialogRef.close(formData);
  }

  saveChanges(): void {
    if (this.formPerfil.valid) {
      console.log('Datos del formulario: ', this.formPerfil.value);
      this.handleSave(this.formPerfil.value)
    }
  }
}
