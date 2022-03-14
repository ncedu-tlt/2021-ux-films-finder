import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { FilmModel } from '../models/film.model';
import { FilmsResponseModel } from '../models/films-response.model';
import { FilmBannerResponseModel } from '../models/film-banner-response.model';
import { PersonInfoResponseModel } from '../models/person-info-response.model';
import { BiographyModel } from '../models/biography.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilmDataService {
  private readonly kinopoiskUrl: string = 'https://kinopoiskapiunofficial.tech';

  constructor(private http: HttpClient, private router: Router) {}

  public getFilmById(id: number): Observable<FilmModel> {
    return this.http
      .get<FilmModel>(this.kinopoiskUrl + '/api/v2.2/films/' + id)
      .pipe(catchError(this.handleError));
  }
  public getFilmByGenre(
    genre: number,
    page: number
  ): Observable<FilmsResponseModel> {
    return this.http.get<FilmsResponseModel>(
      this.kinopoiskUrl + '/api/v2.2/films?genres=' + genre + '&page=' + page
    );
  }
  public getInfoByPersonName(
    name: string,
    page: number
  ): Observable<PersonInfoResponseModel> {
    return this.http.get<PersonInfoResponseModel>(
      this.kinopoiskUrl + '/api/v1/persons?name=' + name + '&page=' + page
    );
  }
  public getPersonsInfoById(id: number): Observable<BiographyModel> {
    return this.http
      .get<BiographyModel>(this.kinopoiskUrl + '/api/v1/staff/' + id)
      .pipe(catchError(this.handleError));
  }
  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 404 || error.status === 400) {
      this.router.navigate(['/not-found']);
    }
    return throwError(() => new Error('No such path exists.'));
  };
  public getTopFilms(
    top: string,
    page: number
  ): Observable<FilmBannerResponseModel> {
    return this.http.get<FilmBannerResponseModel>(
      this.kinopoiskUrl + '/api/v2.2/films/top?type=' + top + '&page=' + page
    );
  }
}
