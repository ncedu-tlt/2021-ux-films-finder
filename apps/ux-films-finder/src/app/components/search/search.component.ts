import { Component, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmKeywordModel } from '../../models/film-keyword.model';
import { FilmModel } from '../../models/film.model';
import { Subject } from 'rxjs';
import { FilmActorModel } from '../../models/film-actor.model';
import { ActorModel } from '../../models/actor.model';

@Component({
  selector: 'ff-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  searchInput = '';
  films$: Subject<FilmModel[]> = new Subject();
  actors$: Subject<ActorModel[]> = new Subject();
  constructor(private filmDataService: FilmDataService) {}
  public getListFilms() {
    this.filmDataService
      .getFilmByKeyWord(this.searchInput, 1)
      .subscribe((info: FilmKeywordModel) => {
        this.films$.next(info.films);
        console.log(info);
      });
  }
  public getActorFilms() {
    this.filmDataService
      .getActorByKeyWord(this.searchInput, 1)
      .subscribe((info: FilmActorModel) => {
        this.actors$.next(info.items);
        console.log(info);
      });
  }
}
