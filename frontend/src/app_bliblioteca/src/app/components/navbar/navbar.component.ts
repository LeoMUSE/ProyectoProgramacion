import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UsuariosService } from '../../services/users/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user: any; //datos del usuario actual

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
      this.loadUserData();
  }

  loadUserData(){
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.usuarioService.getUserById(Number(userId)).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (err) => {
          console.log('Error al cargar los datos del usuario: ', err)
        }
      });
    }
  }


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
}
