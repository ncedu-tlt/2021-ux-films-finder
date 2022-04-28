import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmKeywordModel } from '../../models/film-keyword.model';
import { FilmModel } from '../../models/film.model';
import { debounceTime, fromEvent, Subject, take } from 'rxjs';
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
  films$: Subject<FilmModel[]> = new Subject();
  actors$: Subject<BiographyModel[]> = new Subject();
  advanceIsOpened = false;

  constructor(
    private filmDataService: FilmDataService,
    private router: Router
  ) {}

  @ViewChild('text', { static: true }) text!: ElementRef;
  ngAfterViewInit() {
    fromEvent(this.text.nativeElement, 'keydown')
      .pipe(debounceTime(3000))
      .subscribe(res => console.log(res));
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
    this.getActorFilms();
    this.getListFilms();
  }

  public getListFilms(): void {
    this.filmDataService
      .getFilmByKeyWord(this.searchInput, 1)
      .pipe(take(1) /*debounceTime(3000)*/)
      .subscribe((info: FilmKeywordModel) => {
        this.films$.next(info.films);
        //console.log(info);
      });
  }

  public getActorFilms(): void {
    this.filmDataService
      .getActorByKeyWord(this.searchInput, 1)
      .pipe(take(1) /*debounceTime(3000)*/)
      .subscribe((info: FilmActorModel) => {
        this.actors$.next(info.items);
        //console.log(info);
      });
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

  public getInfo(): void {
    this.getActorFilms();
    this.getListFilms();
  }
}
