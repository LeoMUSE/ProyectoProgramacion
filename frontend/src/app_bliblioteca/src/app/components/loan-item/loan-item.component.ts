import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrl: './loan-item.component.css'
})
export class LoanItemComponent {
  @Input() loan: any; //prestamo como objeto
  @Input() id: string = '';
  @Input() rol: string = 'user';

  @Output() editLoan = new EventEmitter<any>();
  @Output() resena = new EventEmitter<any>();

  constructor(
    private authService: AuthService
  ) { }

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

  editClick(): void {
    this.editLoan.emit(this.loan);
  }

  resenaClick(): void {
    this.resena.emit()
  }

}
