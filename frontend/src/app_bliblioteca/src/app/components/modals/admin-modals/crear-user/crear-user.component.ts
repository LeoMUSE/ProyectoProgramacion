import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrl: './crear-user.component.css'
})
export class CrearUserComponent {

  constructor(
    public dialogRef: MatDialogRef<CrearUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close()
  }

  saveChanges(): void {
    this.dialogRef.close()
  }
}
