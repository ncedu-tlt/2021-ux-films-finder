export interface FilmBannerModel {
  nameRu: string;
  nameEn: string;
  genres: string;
  year: string;
  countries: string;
  filmLength: string;
  posterUrl: string;
}

export type KinopoiskRequestModel = FilmBannerModel;
