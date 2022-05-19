import { FilmGenreModel } from './film-genre.model';
import { FilmCountryModel } from './film-country.model';

export interface FilmFilterModel {
  nameRu: string;
  genres: FilmGenreModel[];
  countries: FilmCountryModel[];
}
