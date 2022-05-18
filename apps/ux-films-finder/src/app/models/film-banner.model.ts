import { FilmGenreModel } from './film-genre.model';
import { FilmCountryModel } from './film-country.model';

export interface FilmBaseModel {
  filmId: number;
  nameRu: string;
  nameEn: string;
  genres: FilmGenreModel[];
  year: string;
  countries: FilmCountryModel[];
  filmLength: string;
  posterUrl: string;
  rating: string;
}
