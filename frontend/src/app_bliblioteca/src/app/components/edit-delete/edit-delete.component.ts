import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrl: './edit-delete.component.css'
})
export class EditDeleteComponent {
  @Input() userRol: string = '';
  @Input() loanStatus: string = '';
  @Output() editDelete = new EventEmitter<string>();


  isAdmin() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Admin")) {
    return true;
  } else {
    return false;
  }
  }

  isPending() {
    return this.userRol === 'Pendiente' || this.loanStatus === 'Pendiente';
  }

  emitEditClick(){
    this.editDelete.emit('edit')
  }

  emitDeleteClick() {
    this.editDelete.emit('delete')
  }

  emitAcceptClick() {
    this.editDelete.emit('accept')
  }

  emitDeclineClick() {
    this.editDelete.emit('decline')
  }

}
