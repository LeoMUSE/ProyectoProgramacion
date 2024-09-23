import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrl: './add-icon.component.css'
})
export class AddIconComponent {
  @Output() addLoan = new EventEmitter<void>();

  addLoanClick() {
    this.addLoan.emit();
  }
}