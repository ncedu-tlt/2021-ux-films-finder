import { FilmGenreModel } from './film-genre.model';
import { FilmCountryModel } from './film-country.model';

export interface FilmModel extends BaseFilmModel {
  kinopoiskId: number;
  imdbId: string;
  countries: FilmCountryModel[];
  genres: FilmGenreModel[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: string;
  description: string;
  slogan: string;
  professionKey: string;
  rating: string;
  filmLength: number;
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
