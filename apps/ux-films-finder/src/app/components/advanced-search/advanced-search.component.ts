import {
  Component, HostBinding,
  Injectable, Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {FilmDataService} from "../../services/film-data.service";
import {BehaviorSubject, Subscription, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FilmsResponseModel} from "../../models/films-response.model";
import {FilmFilterModel} from "../../models/film-flter.model";

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

  public filmResponse: BehaviorSubject<FilmsResponseModel> =
    new BehaviorSubject<FilmsResponseModel>({items: [], total: 0, totalPages: 0});

  dataForm: any = {
    nameFilm: '',
    yearFrom: '',
    yearTo: '',
    country: '',
    keyWord: '',
    genreFilm: '',
  }


  constructor(private filmDataService: FilmDataService) {
  }

  ngOnInit(): void {

    this.filmDataService
      .getCountry()
      .subscribe((info: FilmFilterModel) => {
        this.filmInfo = info;

      });
  }
  showFilmsLog() {
    this.filmDataService
      .allFilters(this.dataForm.country.id, this.dataForm.genreFilm.id, this.dataForm.yearFrom, this.dataForm.yearTo, this.dataForm.keyWord)
      .pipe(take(1))
      .subscribe((info: FilmsResponseModel) => {
        this.filmResponse.next(info);
      });
  }

}
