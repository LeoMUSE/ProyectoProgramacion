import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close()
  }
}