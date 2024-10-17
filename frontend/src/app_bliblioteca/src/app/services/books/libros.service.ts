import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  url = '/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  getBooks() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/libros`, {headers: headers})
  }

  getBooksById(id : number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/libro/${id}`, {headers: headers})
  }

  updateBook(id: number, bookData: any): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(bookData)
    return this.httpClient.put(`${this.url}/libro/${id}`, bookData, {headers: headers}).pipe(first())
  }
}