import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmModel } from '../models/film.model';
import { FilmsResponseModel } from '../models/films-response.model';
import { FilmBannerResponseModel } from '../models/film-banner-response.model';

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
  public getTopFilms(
    top: string,
    page: number
  ): Observable<FilmBannerResponseModel> {
    return this.http.get<FilmBannerResponseModel>(
      this.kinopoiskUrl + '/api/v2.2/films/top?type=' + top + '&page=' + page
    );
  }
}
