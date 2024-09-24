import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarPerfilComponent } from '../../components/modals/user-modals/editar-perfil/editar-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(private dialog: MatDialog) {}

  openEditPerfilDialog(): void {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });
  }
}
