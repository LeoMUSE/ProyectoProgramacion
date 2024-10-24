import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(page: number, params?: {rol?:string, nombre?:string, dni?:string, telefono?:string, email?:string}) {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let httpParams = new HttpParams().set('page', page.toString());

    if (params) {
      if (params.rol) {
        httpParams = httpParams.set('rol', params.rol)
      }
    }
    if (params) {
      if (params.nombre) {
        httpParams = httpParams.set('nombre', params.nombre)
      }
    }
    if (params) {
      if (params.dni) {
        httpParams = httpParams.set('dni', params.dni)
      }
    }
    if (params) {
      if (params.telefono) {
        httpParams = httpParams.set('telefono', params.telefono)
      }
    }
    if (params) {
      if (params.email) {
        httpParams = httpParams.set('rol', params.email)
      }
    }
    return this.httpClient.get(`${this.url}/usuarios`, {headers: headers, params: httpParams}).pipe(first())
  }

  getUserById(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/usuario/${id}`, {headers: headers}).pipe(first())
  }

  postUser(userDate:any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/usuarios`, {headers : headers})
  }

  updateUser(id: number, userData: any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(userData)
    return this.httpClient.put(`${this.url}/usuario/${id}`, userData, {headers: headers}).pipe(first())
  }

  deleteUser(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/usuario/${id}`, {headers: headers}).pipe(first())
  }

}
