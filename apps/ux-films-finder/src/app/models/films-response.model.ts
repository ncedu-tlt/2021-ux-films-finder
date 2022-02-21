import { FilmModel } from './film.model';

export interface FilmsResponseModel {
  items: FilmModel[];
  total: number;
  totalPages: number;
}

export type KinopoiskRequestModel = FilmsResponseModel;
