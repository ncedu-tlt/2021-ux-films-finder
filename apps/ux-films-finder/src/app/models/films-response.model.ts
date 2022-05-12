import { FilmModel } from './film.model';
import {FilmCountryModel} from "./film-country.model";
import {FilmGenreModel} from "./film-genre.model";

export interface FilmsResponseModel {

  items: FilmModel[];
  total: number;
  totalPages: number;
}

export type KinopoiskRequestModel = FilmsResponseModel;
