import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { RegisterService } from '../../services/auth/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signInForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private registerService: RegisterService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      user: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  register(registerData: any) {
    this.registerService.register(registerData).subscribe({
      next: (rta: any) => {
        alert('Registro Exitoso');
        console.log('Exito: ', rta);
        this.router.navigateByUrl('login')
      }, error: (err: any) => {
        alert('Error al Registrarse');
        console.log('Error: ' + err);
      }, complete: () => {
        console.log('Finalizo');
      }
    })
  }

  submit() { 
    if (this.signInForm.valid) {
      const registerData = {
        ...this.signInForm.value,
        img: 'assets/user.jpeg',
        rol: 'Pendiente',
        estado: false
      };
      this.register(registerData);
    } else {
      alert('Todos los campos son requeridos');
    }   
  }

}
