import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getNotification() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    this.httpClient.get(`${this.url}/reseñas`, {headers: headers})
  }

  updateNotification(id: number, userData: any): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(userData)
    return this.httpClient.put(`${this.url}/reseñas/${id}`, userData, {headers: headers}).pipe(first())
  }

}
