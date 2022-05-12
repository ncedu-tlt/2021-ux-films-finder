import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { FilmsResponseModel } from '../../models/films-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  private loadFilms$: Subscription = new Subscription();
  private activeFilm$: Subscription = new Subscription();
  readonly pageSize = 20;
  films$: BehaviorSubject<FilmsResponseModel> =
    new BehaviorSubject<FilmsResponseModel>({
      items: [],
      total: 0,
      totalPages: 0
    });
  genreId = 0;
  public loading!: boolean;

  constructor(
    private filmDataService: FilmDataService,
    private activatedRoute: ActivatedRoute
  ) {}
  @HostBinding('class.center-content') private hostClass = true;
  ngOnInit(): void {
    this.activeFilm$ = this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        this.genreId = data['genreId'];
        this.loadFilmsList(1);
        this.loading = true;
      });
  }
  onPageChange(page: PageEvent): void {
    this.loadFilmsList(++page.pageIndex);
  }
  loadFilmsList(pageIndex: number): void {
    this.loadFilms$ && this.loadFilms$.unsubscribe();
    this.loadFilms$ = this.filmDataService
      .getFilmByGenre(this.genreId, pageIndex)
      .pipe(take(1))
      .subscribe((info: FilmsResponseModel) => {
        this.films$.next(info);
        this.loading = false;
      });
  }
  ngOnDestroy(): void {
    this.loadFilms$.unsubscribe();
    this.activeFilm$.unsubscribe();
  }
}
