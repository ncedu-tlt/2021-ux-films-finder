import {
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {FilmDataService} from '../../services/film-data.service';
import {BehaviorSubject, Subscription, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FilmsResponseModel} from '../../models/films-response.model';
import {FilmFilterModel} from '../../models/film-filter.model';
import {PageEvent} from '@angular/material/paginator';


@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'ff-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.less'],
  encapsulation: ViewEncapsulation.None

})

export class AdvancedSearchComponent implements OnInit {

  readonly pageSize = 20;

  public filmInfo: FilmFilterModel | null | undefined;
  private loadFilms$: Subscription = new Subscription();
  private activeFilm$: Subscription = new Subscription();
  public filmResponse: BehaviorSubject<FilmsResponseModel> =
    new BehaviorSubject<FilmsResponseModel>({items: [], total: 0, totalPages: 0});

  dataForm: any = {
    nameFilm: '',
    yearFrom: '',
    yearTo: '',
    country: '' ,
    keyWord: '',
    genreFilm: '',
  }
  page: any;

  public loading!: boolean;

  constructor(
    private filmDataService: FilmDataService) {
  }

  ngOnInit(): void {
    this.filmDataService
      .getCountry()
      .subscribe((info: FilmFilterModel) => {
        this.filmInfo = info;
        this.showFilms(1);
        this.loading = true;
      });

  }

  showFilms(pageIndex: number) {
    this.loadFilms$ && this.loadFilms$.unsubscribe();
    this.filmDataService
      .allFilters(this.dataForm.country.id, this.dataForm.genreFilm.id, this.dataForm.yearFrom, this.dataForm.yearTo, this.dataForm.keyWord, pageIndex)
      .pipe(take(1))
      .subscribe((info: FilmsResponseModel) => {
        this.filmResponse.next(info);
        this.loading = false;
      });
  }

  onPageChange($event: PageEvent) {
    this.showFilms(++this.page.pageIndex);
  }

  ngOnDestroy(): void {
    this.loadFilms$.unsubscribe();
  }
}
