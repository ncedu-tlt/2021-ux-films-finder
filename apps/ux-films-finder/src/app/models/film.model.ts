import { FilmGenreModel } from './film-genre.model';

export interface FilmModel {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: object[];
  genres: FilmGenreModel[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  description: string;
}

export type KinopoiskRequestModel = FilmModel;
