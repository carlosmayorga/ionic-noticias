import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0;
  categoriaPage = 0;
  categoriaActual = '';

  constructor(private http: HttpClient) { }

  getTopHeadlines(next?: boolean) {
    if (next) {
      this.headlinesPage++;
    } else {
      this.headlinesPage = 0;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

/**
 * Private and utils
 */

  private ejecutarQuery<T>( query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }
}
