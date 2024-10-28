import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReseñasService {
  url = '/api'

  constructor(
    private httpClient: HttpClient
  ) { }

  getReviews(page: number, params?: {nroValoracion?:string, ordenValoracion?:string, idUserPost?:string, fechaReseña?:string, Valoraciones_desc?:string, Valoraciones_asc?:string, idLibro?: string}){
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let httpParams = new HttpParams().set('page', page.toString());

    if (params) {
      if (params.nroValoracion) {
        httpParams = httpParams.set('nroValoracion', params.nroValoracion)
      }
    }
    if (params) {
      if (params.ordenValoracion) {
        httpParams = httpParams.set('ordenValoracion', params.ordenValoracion)
      }
    }
    if (params) {
      if (params.idUserPost) {
        httpParams = httpParams.set('idUserPost', params.idUserPost)
      }
    }
    if (params) {
      if (params.idUserPost) {
        httpParams = httpParams.set('idUserPost', params.idUserPost)
      }
    }
    if (params) {
      if (params.Valoraciones_desc) {
        httpParams = httpParams.set('Valoraciones_desc', params.Valoraciones_desc)
      }
    }
    if (params) {
      if (params.Valoraciones_asc) {
        httpParams = httpParams.set('Valoraciones_asc', params.Valoraciones_asc)
      }
    }
    if (params) {
      if (params.idLibro) {
        httpParams = httpParams.set('idLibro', params.idLibro)
      }
    }
    
    return this.httpClient.get(`${this.url}/reseñas`, {headers: headers, params: httpParams}).pipe(first())
  }

  getReviewById(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/reseña/${id}`, {headers: headers}).pipe(first())
  }

  postReview(reviewData:any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(reviewData)
    return this.httpClient.post(`${this.url}/reseñas`, reviewData, {headers: headers}).pipe(first())
  }


  updateReview(id: number, reviewData: any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(reviewData)
    return this.httpClient.put(`${this.url}/reseña/${id}`, reviewData, {headers: headers}).pipe(first())
  }

  deleteReview(id: number) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/reseña/${id}`, {headers: headers}).pipe(first())
  }
}
