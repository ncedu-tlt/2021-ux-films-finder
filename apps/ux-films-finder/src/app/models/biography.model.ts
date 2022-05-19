import { FilmModel } from './film.model';
import { SpousesModel } from './spouses.model';

export interface BiographyModel {
  kinopoiskId: number;
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
  deathplace: string | null;
  spouses: SpousesModel[];
  hasAwards: number;
  profession: string;
  facts: string[];
  films: FilmModel[];
}
