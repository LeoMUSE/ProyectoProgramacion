import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrl: './add-icon.component.css'
})
export class AddIconComponent {
  @Output() addEvent = new EventEmitter<void>();

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

  addClick() {
    this.addEvent.emit();
  }
}