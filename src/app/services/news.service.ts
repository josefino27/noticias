import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../interface/index';

const apiKey = environment.apikey
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headLinesPages = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  getToHeadLines() {
    this.headLinesPages++;
    return this.http.get<NewsResponse>(`${apiUrl}/top-headlines?country=co&page=${this.headLinesPages}`, {
      params: {
        apiKey: apiKey
      }
    });
  }

  getToHeadLinesByCategory(categoria: string) {

    if(this.categoriaActual === categoria){

      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.http.get<NewsResponse>(`${apiUrl}/top-headlines?country=co`, {
      params: {
        apiKey: apiKey, category: categoria, page: this.categoriaPage
      }
    });
  }

}
