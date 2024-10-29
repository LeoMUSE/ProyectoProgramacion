import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = '/api'
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  register (dataRegister: any): Observable<any>{
    return this.httpClient.post(this.url + 'auth/register', dataRegister).pipe(take(1))
  }
}
