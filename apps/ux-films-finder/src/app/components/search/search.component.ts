import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmKeywordModel } from '../../models/film-keyword.model';
import { FilmModel } from '../../models/film.model';
import {
  debounceTime,
  fromEvent,
  Observable,
  take,
  zip,
  zipAll,
  zipWith
} from 'rxjs';
import { FilmActorModel } from '../../models/film-actor.model';
import { BiographyModel } from '../../models/biography.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ff-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  searchInput = '';
  films$: FilmModel[] = [];
  actors$: BiographyModel[] = [];
  advanceIsOpened = false;
  loading = false;

  constructor(
    private filmDataService: FilmDataService,
    private router: Router
  ) {}

  @ViewChild('text', { static: true }) text!: ElementRef;

  ngAfterViewInit() {
    fromEvent(this.text.nativeElement, 'keydown')
      .pipe(debounceTime(2000))
      .subscribe(res => this.getInfo());
  }

  public openAdvanceSearch(): void {
    if (!this.advanceIsOpened) {
      this.advanceIsOpened = true;
      this.router.navigate(['/advanced-search']);
    } else {
      this.advanceIsOpened = false;
      this.router.navigate(['.']);
    }
  }

  public closeSearch() {
    this.searchInput = '';
    this.actors$ = [];
    this.films$ = [];
  }

  public searchPersons(): void {
    this.router.navigate(['/search-persons'], {
      queryParams: { search: this.searchInput.trim() }
    });
  }

  public searchFilms(): void {
    this.router.navigate(['/search-films'], {
      queryParams: { search: this.searchInput.trim() }
    });
  }

  public getInfo() {
    this.loading = true;
    this.filmDataService
      .getFilmByKeyWord(this.searchInput, 1)
      .pipe(take(1))
      .subscribe((films: FilmKeywordModel) => {
        this.films$ = films.films.slice(0, 3);
        console.log(films);
        this.loading = false;
      });

    this.filmDataService
      .getActorByKeyWord(this.searchInput, 1)
      .pipe(take(1))
      .subscribe((actors: FilmActorModel) => {
        this.actors$ = actors.items.slice(0, 3);
        console.log(actors);
        this.loading = false;
      });
    /*this.filmDataService
      .getActorByKeyWord(this.searchInput, 1)
      .getFilmByKeyWord(this.searchInput, 1)
      .pipe(take(1), zipWith(this.actors$, this.films$))
      .subscribe((films: FilmKeywordModel, actors: FilmActorModel) => {
        this.films$ = films.films.slice(0, 3);
        this.actors$ = actors.items.slice(0, 3);
        this.loading = false;
      });*/
  }
}
