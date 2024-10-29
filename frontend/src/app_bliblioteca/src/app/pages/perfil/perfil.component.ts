import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarPerfilComponent } from '../../components/modals/user-modals/editar-perfil/editar-perfil.component';
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/users/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
      this.loadUserData();
  }

  loadUserData() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.usuariosService.getUserById(Number(userId)).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (err) => {
          console.error('Error al cargar los datos del usuario:', err);
        }
      });
    }
  }

  cerrarSesion() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

  openEditPerfilDialog(perfilData: any): void {
    const dialogRef = this.dialog.open(EditarPerfilComponent, {
      width: '500px',
      data: {...perfilData}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result)
    })
  }
}
