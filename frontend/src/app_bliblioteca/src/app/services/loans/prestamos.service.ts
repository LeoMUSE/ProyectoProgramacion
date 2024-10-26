import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getLoans(page: number, params?: {idUsuario?:string, inicio_prestamo?:string, fin_prestamo?:string, cant_libros?:string, libro_id?:string, cant_prestamos?:string, estado?:string, fecha_proxima?:string}) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let httpParams = new HttpParams().set('page', page.toString());

    if (params) {
      if (params.idUsuario) {
        httpParams = httpParams.set('idUsuario', params.idUsuario)
      }
    }

    if (params) {
      if (params.inicio_prestamo) {
        httpParams = httpParams.set('inicio_prestamo', params.inicio_prestamo)
      }
    }

    if (params) {
      if (params.fin_prestamo) {
        httpParams = httpParams.set('fin_prestamo', params.fin_prestamo)
      }
    }

    if (params) {
      if (params.cant_libros) {
        httpParams = httpParams.set('cant_libros', params.cant_libros)
      }
    }

    if (params) {
      if (params.libro_id) {
        httpParams = httpParams.set('libro_id', params.libro_id)
      }
    }

    if (params) {
      if (params.cant_prestamos) {
        httpParams = httpParams.set('cant_prestamos', params.cant_prestamos)
      }
    }

    if (params) {
      if (params.estado) {
        httpParams = httpParams.set('estado', params.estado)
      }
    }

    if (params) {
      if (params.fecha_proxima) {
        httpParams = httpParams.set('fecha_proxima', params.fecha_proxima)
      }
    }
    return this.httpClient.get(`${this.url}/prestamos`, {headers: headers, params:httpParams}).pipe(first())
  }

  getLoanById(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/prestamo/${id}`, {headers: headers}).pipe(first())
  } 

  postLoan(loanData:any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(loanData)
    return this.httpClient.post(`${this.url}/prestamos`, loanData, {headers: headers}).pipe(first())
  }

  updateLoanInfo(id: number, loanData: any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(loanData)
    return this.httpClient.put(`${this.url}/prestamo/${id}`, loanData, {headers: headers}).pipe(first())
  }

  deleteLoan(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/prestamo/${id}`, {headers: headers}).pipe(first())
  }
}
