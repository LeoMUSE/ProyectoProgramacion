import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = '/api'

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(dataLogin: any) : Observable<any> {
    return this.httpClient.post(this.url + '/auth/login', dataLogin).pipe(take(1))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_rol')
    localStorage.removeItem('user_id')
    this.router.navigateByUrl("login")
  }
}
