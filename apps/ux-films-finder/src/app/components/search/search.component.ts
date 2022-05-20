import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmModel } from '../../models/film.model';
import { debounceTime, fromEvent, take, tap, zip } from 'rxjs';
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
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        debounceTime(2000)
      )
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
    zip([
      this.filmDataService.getActorByKeyWord(this.searchInput, 1),
      this.filmDataService.getFilmByKeyWord(this.searchInput, 1)
    ])
      .pipe(take(1))
      .subscribe(([actors, films]) => {
        this.films$ = films.films.slice(0, 3);
        this.actors$ = actors.items.slice(0, 3);
        this.loading = false;
      });
  }
}
