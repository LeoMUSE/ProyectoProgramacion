import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getBooks(page: number, params?: {genero?:string, autor?:string, titulo?:string, editorial?:string}) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let httpParams = new HttpParams().set('page', page.toString());
    // Probar que las paginas puedan ser opcionales
    // let httpParams = new HttpParams();
    
    // // Añadir 'page' solo si está definido
    // if (page !== undefined) {
    //     httpParams = httpParams.set('page', page.toString());
    // }
    if (params) {
      if (params.genero) {
        httpParams = httpParams.set('genero', params.genero)
      }
    }
    if (params) {
      if (params.autor) {
        httpParams = httpParams.set('autor', params.autor)
      }
    }
    if (params) {
      if (params.titulo) {
        httpParams = httpParams.set('titulo', params.titulo)
      }
    }
    if (params) {
      if (params.editorial) {
        httpParams = httpParams.set('editorial', params.editorial)
      }
    }

    return this.httpClient.get(`${this.url}/libros`, {headers: headers, params: httpParams})
  }

  getBooksById(id : number)  {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/libro/${id}`, {headers: headers}).pipe(first())
  }

  postBook(bookData:any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(bookData)
    return this.httpClient.post(`${this.url}/libros`, bookData, {headers: headers}).pipe(first())
  }

  updateBook(id: number, bookData: any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(bookData)
    return this.httpClient.put(`${this.url}/libro/${id}`, bookData, {headers: headers}).pipe(first())
  }

  deleteBook(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/libro/${id}`, {headers: headers}).pipe(first())
  }
}