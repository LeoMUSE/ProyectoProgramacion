import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  closeModal(){
    this.dialogRef.close();
  }

  irALogin(): void {
    this.router.navigate(['/login']);
    this.closeModal();
  }

}
