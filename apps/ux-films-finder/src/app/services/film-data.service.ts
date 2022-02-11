import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmDataService {
  private readonly kinopoiskUrl: string = 'https://kinopoiskapiunofficial.tech';

  constructor(private http: HttpClient) {}

  public getFilmById(id: number): Observable<any> {
    return this.http.get<any>(this.kinopoiskUrl + '/api/v2.2/films/' + id);
  }
}
