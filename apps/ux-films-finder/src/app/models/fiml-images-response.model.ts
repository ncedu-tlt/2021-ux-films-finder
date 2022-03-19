import { FilmImagesModel } from './film-images.model';

export interface FilmImagesResponseModel {
  items: FilmImagesModel[];
  total: number;
  totalPages: number;
}

export type KinopoiskRequestModel = FilmImagesResponseModel;
