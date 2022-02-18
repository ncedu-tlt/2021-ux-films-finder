export interface FilmModel {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: string[];
  genres: string[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export type KinopoiskRequestModel = FilmModel;
