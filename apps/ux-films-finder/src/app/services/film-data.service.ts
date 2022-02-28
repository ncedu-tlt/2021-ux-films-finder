import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmModel } from '../models/film.model';
import { FilmsResponseModel } from '../models/films-response.model';
import { PersonInfoResponseModel } from '../models/person-info-response.model';
import { BiographyModel } from '../models/biography.model';

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
  public getInfoByPersonName(
    name: string,
    page: number
  ): Observable<PersonInfoResponseModel> {
    return this.http.get<PersonInfoResponseModel>(
      this.kinopoiskUrl + '/api/v1/persons?name=' + name + '&page=' + page
    );
  }
  public getPersonsInfoById(id: number): Observable<BiographyModel> {
    return this.http.get<BiographyModel>(
      this.kinopoiskUrl + '/api/v1/staff/' + id
    );
  }
}
