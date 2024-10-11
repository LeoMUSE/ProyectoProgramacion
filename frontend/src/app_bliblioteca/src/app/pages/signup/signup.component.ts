import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  loginForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  irLogin(dataLogin: any) {
    this.authService.login(dataLogin).subscribe({
      next: (rta: any) => {
        alert('Credenciales Correctas');
        console.log('Exito: ', rta);
        localStorage.setItem('token', rta.access_token);
        let tokenPayload: any = jwtDecode(rta.access_token);
        localStorage.setItem('token_rol', tokenPayload.rol);
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
