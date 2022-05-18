import { BaseFilmModel, FilmModel } from './film.model';

export interface FilmsResponseModel {
  items: FilmModel[];
  total: number;
  totalPages?: number;
}

export interface BaseFilmsResponseModel {
  items: BaseFilmModel[];
  total: number;
}

export type KinopoiskRequestModel = FilmsResponseModel;
