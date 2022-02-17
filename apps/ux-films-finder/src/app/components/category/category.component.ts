import { Component, Injectable, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmModel } from '../../models/film.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, take } from 'rxjs';
import { FilmsResponseModel } from '../../models/films-response.model';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel: string = 'First page';
  itemsPerPageLabel: string = 'Items per page:';
  lastPageLabel: string = 'Last page';
  nextPageLabel: string = 'Next page';
  previousPageLabel: string = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Page 1 of 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: 'ff-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  private loadFilms$: Subscription = new Subscription();
  private activeFilm$: Subscription = new Subscription();
  films$: Subject<FilmsResponseModel | null> = new Subject();
  film: FilmModel | undefined;
  pageSize: number = 20;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent?: PageEvent;
  genre: number = 0;

  constructor(
    private filmDataService: FilmDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeFilm$ = this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        this.genre = data['genreId'];
        this.loadFilmsList(1);
      });
  }
  onPageChange(page: PageEvent): void {
    console.log(page.pageIndex);
    this.loadFilmsList(++page.pageIndex);
  }
  loadFilmsList(pageIndex: number): void {
    this.loadFilms$ = this.filmDataService
      .getFilmByGenre(this.genre, pageIndex)
      .subscribe((info: FilmsResponseModel | null) => {
        this.films$.next(info);
      });
  }
  ngOnDestroy(): void {
    this.loadFilms$.unsubscribe();
    this.activeFilm$.unsubscribe();
  }
}
