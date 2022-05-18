import { FilmGenreModel } from './film-genre.model';
import { FilmCountryModel } from './film-country.model';
import { FilmBaseModel } from './film-banner.model';

export interface FilmModel extends FilmBaseModel, BaseFilmModel {
  kinopoiskId: number;
  imdbId: string;
  nameOriginal: string;
  ratingKinopoisk: number;
  ratingImdb: number;
  type: string;
  posterUrlPreview: string;
  slogan: string;
  professionKey: string;
  description: string;
}

export interface BaseFilmModel {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export type KinopoiskRequestModel = FilmModel;
