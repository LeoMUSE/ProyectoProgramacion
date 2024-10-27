import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrl: './loan-item.component.css'
})
export class LoanItemComponent {
  @Input() loan: any;

  @Output() resena = new EventEmitter<any>();
  @Output() actionEvent = new EventEmitter<{action: string, loan: any}>();

  isAdmin() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Admin")) {
    return true;
  } else {
    return false;
  }
  }

  isUser() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Usuario")) {
    return true;
  } else {
    return false;
  }
  }

  handleEditDelete(action: string) {
    this.actionEvent.emit({ action, loan: this.loan });
  }

  resenaClick(): void {
    this.resena.emit()
  }

}
