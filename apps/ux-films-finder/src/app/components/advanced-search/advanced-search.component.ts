import {
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {FilmModel} from "../../models/film.model";
import {FilmDataService} from "../../services/film-data.service";
import {BehaviorSubject, Subscription, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FilmsResponseModel} from "../../models/films-response.model";

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

  private loadFilms$: Subscription = new Subscription();
  private activeFilm$: Subscription = new Subscription();
  readonly pageSize = 20;

  public filmInfo: FilmModel | null | undefined;

  /*films$: BehaviorSubject<FilmsResponseModel> =
    new BehaviorSubject<FilmsResponseModel>({
      countries: [], genres: [], nameRu: "", type: "", year: 0,
      items: [],
      total: 0,
      totalPages: 0
    });*/

  dataForm: any = {
    nameFilm: '',
    yearFrom: '',
    yearTo: '',
    country: '',
    keyWord: '',
    genreFilm: '',
  }
  posterUrl: any;
  private nameRu: string | undefined;
  private loading: boolean | undefined;
  private genreId: any;


  constructor(private filmDataService: FilmDataService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.filmDataService
      .getCountry()
      .subscribe((info: FilmModel) => {
        this.filmInfo = info;
      });
    this.activeFilm$ = this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        this.genreId = data['genreId'];
        this.showFilms(1);
        this.loading = true;
      });
  }

  showFilms(pageIndex: number) {
    /*this.loadFilms$ && this.loadFilms$.unsubscribe();
    this.loadFilms$ = this.filmDataService*/
    this.filmDataService
      .allFilters(this.dataForm.country.id, this.dataForm.genreFilm.id, this.dataForm.yearFrom, this.dataForm.yearTo, this.dataForm.keyWord)
      .pipe(take(1))
      .subscribe((info: FilmModel | null) => {
        console.log(this.filmInfo = info);

        /*this.loading = false;*/
      });
    this.dataForm.yearFrom = this.dataForm.yearTo = this.dataForm.keyWord = ''

  }

 /* ngOnDestroy(): void {
    this.loadFilms$.unsubscribe();
    this.activeFilm$.unsubscribe();
  }*/
}





