import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-prestamo',
  templateUrl: './editar-prestamo.component.html',
  styleUrl: './editar-prestamo.component.css'
})
export class EditarPrestamoComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close()
  }

  saveChanges(): void {
    this.dialogRef.close(this.data)
  }
}
