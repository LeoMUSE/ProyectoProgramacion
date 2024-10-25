import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrl: './edit-delete.component.css'
})
export class EditDeleteComponent {
  @Output() editDelete = new EventEmitter<void>();


  isAdmin() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Admin")) {
    return true;
  } else {
    return false;
  }
  }

  addClick() {
    this.editDelete.emit();
  }

}
