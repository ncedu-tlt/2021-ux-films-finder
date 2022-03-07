import { Component } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmKeywordModel } from '../../models/film-keyword.model';
import { FilmModel } from '../../models/film.model';
import { Subject } from 'rxjs';
import { FilmActorModel } from '../../models/film-actor.model';
import { ActorModel } from '../../models/actor.model';

@Component({
  selector: 'ff-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent {
  _searchInput = '';
  films$: Subject<FilmModel[]> = new Subject();
  actors$: Subject<ActorModel[]> = new Subject();

  constructor(private filmDataService: FilmDataService) {}
  public getListFilms() {
    this.filmDataService
      .getFilmByKeyWord(this._searchInput, 1)
      .subscribe((info: FilmKeywordModel) => {
        console.log(info);
        this.films$.next(info.films);
      });
  }
  public getActorFilms() {
    this.filmDataService
      .getActorByKeyWord(this._searchInput, 1)
      .subscribe((info: FilmActorModel) => {
        console.log(info);
        this.actors$.next(info.items);
      });
  }
}
