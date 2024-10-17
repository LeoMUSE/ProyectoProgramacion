import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  url = '/api'

  constructor(
    private httpClient: HttpClient,
  ) { }

  getLoans(): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/prestamos`, {headers: headers})
  }

  getLoanById(id: number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/prestamo/${id}`, {headers: headers}).pipe(first())
  } 

  updateLoanInfo(id: number, loanData: any): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(loanData)
    return this.httpClient.put(`${this.url}/usuario/${id}`, loanData, {headers: headers}).pipe(first())
  }
}
