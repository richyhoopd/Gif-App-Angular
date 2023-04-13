import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'tiWOkgnv8r9HvOFtXlwejDQ7LfODV5PL';
  private _historial: string[] = [];

  // todo cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    this._historial = this._historial.splice(0, 10);
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }


    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=tiWOkgnv8r9HvOFtXlwejDQ7LfODV5PL&q=${query}&limit=10`)
    .subscribe( (resp) => {
      console.log(resp);
      this.resultados = resp.data;
      this.resultados = resp.data;
    })

    console.log(this._historial);
  }
}
