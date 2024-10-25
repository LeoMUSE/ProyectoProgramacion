import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      contraseña: ['', Validators.required]
    })
  }

  irLogin(dataLogin: any) {
    this.authService.login(dataLogin).subscribe({
      next: (rta: any) => {
        alert('Credenciales Correctas');
        console.log('Exito: ', rta);

        // Almacena el token
        localStorage.setItem('token', rta.access_token);

        // Decodifica el token para obtener roles y demas cosas
        let tokenPayload: any = jwtDecode(rta.access_token);
        localStorage.setItem('token_rol', tokenPayload.rol);
        localStorage.setItem('user_id', tokenPayload.id)
        this.router.navigateByUrl('home')
      }, error: (err: any) => {
        alert('Usuario o constraseña Incorrecta');
        console.log('Error: ' + err);
        localStorage.removeItem('token');
      }, complete: () => {
        console.log('Finalizo');
      }
    })
  }

  submit() { 
    if(this.loginForm.valid) {
      console.log('Dato del formulario: ', this.loginForm.value);
      this.irLogin(this.loginForm.value);
    } else {
      alert('Los valores son requeridos');
    }   
  }
}
