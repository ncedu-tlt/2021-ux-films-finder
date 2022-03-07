import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmModel } from '../models/film.model';
import { FilmsResponseModel } from '../models/films-response.model';
import { FilmKeywordModel } from '../models/film-keyword.model';
import { FilmActorModel } from '../models/film-actor.model';
// import * as url from 'url';

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

  public getFilmByGenre(
    genre: number,
    page: number
  ): Observable<FilmsResponseModel> {
    return this.http.get<FilmsResponseModel>(
      this.kinopoiskUrl + '/api/v2.2/films?genres=' + genre + '&page=' + page
    );
  }
  public getFilmByKeyWord(
    keyword: string,
    page: number
  ): Observable<FilmKeywordModel> {
    return this.http.get<FilmKeywordModel>(
      this.kinopoiskUrl +
        '/api/v2.1/films/search-by-keyword?keyword=' +
        keyword +
        '&page=' +
        page
    );
  }
  public getActorByKeyWord(
    name: string,
    page: number
  ): Observable<FilmActorModel> {
    return this.http.get<FilmActorModel>(
      this.kinopoiskUrl + '/api/v1/persons?name=' + name + '&page=' + page
    );
  }
}
