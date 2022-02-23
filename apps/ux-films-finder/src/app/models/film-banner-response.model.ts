import { FilmBannerModel } from './film-banner.model';
export interface FilmBannerResponseModel {
  films: FilmBannerModel[];
}

export type KinopoiskRequestModel = FilmBannerResponseModel;
