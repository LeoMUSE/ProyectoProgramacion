import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  url = '/api'

  constructor(
    private httpClient: HttpClient,
  ) { }

  getNotification(page: number, params?: {usuario:string}) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let httpParams = new HttpParams().set('page', page.toString());

    if (params) {
      if (params.usuario) {
        httpParams = httpParams.set('usuario', params.usuario)
      }
    }

    this.httpClient.get(`${this.url}/notificacion`, {headers: headers})
  }

  postNotification(page: number, params?: {idUsuario:string}) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    this.httpClient.post(`${this.url}/notificacion`, {headers: headers})
  }

}
