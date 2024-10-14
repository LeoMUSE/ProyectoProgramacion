import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarPerfilComponent } from '../../components/modals/user-modals/editar-perfil/editar-perfil.component';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { 
  }

  cerrarSesion() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

  openEditPerfilDialog(): void {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });
  }
}
