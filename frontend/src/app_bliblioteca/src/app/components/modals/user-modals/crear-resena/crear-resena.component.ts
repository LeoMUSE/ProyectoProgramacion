import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-resena',
  templateUrl: './crear-resena.component.html',
  styleUrl: './crear-resena.component.css'
})
export class CrearResenaComponent {

  constructor(
    public dialogRef: MatDialogRef<CrearResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close()
  }

  saveChanges(): void {
    this.dialogRef.close()
  }
}
