import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  url = '/api'

  constructor(
    private httpClient: HttpClient,
  ) { }

  getReviews() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    this.httpClient.get(`${this.url}/reseñas`, {headers: headers})
  }
}
