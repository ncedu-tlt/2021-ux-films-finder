import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmModel } from '../models/film.model';
import { FilmsResponseModel } from '../models/films-response.model';

@Injectable({
  providedIn: 'root'
})
export class FilmDataService {
  private readonly kinopoiskUrl: string = 'https://kinopoiskapiunofficial.tech';

  constructor(private http: HttpClient) {}

  public getFilmById(id: number): Observable<FilmModel> {
    return this.http.get<FilmModel>(
      this.kinopoiskUrl + '/api/v2.2/films/' + id
    );
  }
  public getFilmByGenre(genre: number): Observable<FilmsResponseModel | null> {
    return this.http.get<FilmsResponseModel>(
      this.kinopoiskUrl + '/api/v2.2/films?genres=' + genre + '&page=1'
    );
  }
}
