import { FilmGenreModel } from './film-genre.model';
import { FilmCountryModel } from './film-country.model';

export interface FilmModel {
  kinopoiskId: number;
  filmId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: FilmCountryModel[];
  genres: FilmGenreModel[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  description: string;
  slogan: string;
  professionKey: string;
  rating: string;
  filmLength: number;
}

export type KinopoiskRequestModel = FilmModel;
