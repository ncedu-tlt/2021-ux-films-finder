import { Component, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { FilmModel } from '../../models/film.model';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, take } from 'rxjs';
import { FilmsResponseModel } from '../../models/films-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  private loadFilms$: Subscription = new Subscription();
  private activeFilm$: Subscription = new Subscription();
  films$?: Subject<FilmsResponseModel> = new Subject();
  film?: FilmModel;
  pageSize = 20;
  pageEvent?: PageEvent;
  genreId = 0;

  constructor(
    private filmDataService: FilmDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeFilm$ = this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        this.genreId = data['genreId'];
        this.loadFilmsList(1);
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
      });
  }
  ngOnDestroy(): void {
    this.loadFilms$.unsubscribe();
    this.activeFilm$.unsubscribe();
  }
}
