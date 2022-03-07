import { FilmModel } from './film.model';

export interface ActorModel {
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth: number;
  birthday: string;
  death: string;
  age: number;
  birthplace: string;
  deathplace: string;
  hasAwards: number;
  profession: string;
  films: FilmModel[];
}
export type KinopoiskRequestModel = ActorModel;
