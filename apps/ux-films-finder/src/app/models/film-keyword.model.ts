import { FilmModel } from './film.model';

export interface FilmKeywordModel {
  keyword: string;
  pagesCount: number;
  films: FilmModel[];
  searchFilmsCountResult: number;
}
