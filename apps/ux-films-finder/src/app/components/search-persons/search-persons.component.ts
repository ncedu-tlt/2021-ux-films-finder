import { Component, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { PersonInfoResponseModel } from '../../models/person-info-response.model';
import { Subject, Subscription, take } from 'rxjs';
import { PersonInfoModel } from '../../models/person-info.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.less']
})
export class SearchPersonsComponent implements OnInit {
  constructor(private personData: FilmDataService) {}
  public personInfo!: PersonInfoModel;
  public person$: Subject<PersonInfoResponseModel> =
    new Subject<PersonInfoResponseModel>();
  readonly pageSize = 50;
  private loadInfo$: Subscription = new Subscription();
  personName = 'eva';
  ngOnInit(): void {
    this.loadPersonInfo(1);
  }
  loadPersonInfo(pageIndex: number) {
    this.loadInfo$ && this.loadInfo$.unsubscribe();
    this.loadInfo$ = this.personData
      .getInfoByPersonName(this.personName, pageIndex)
      .pipe(take(1))
      .subscribe((info: PersonInfoResponseModel) => {
        this.person$.next(info);
      });
  }
  onPageChange(page: PageEvent): void {
    this.loadPersonInfo(++page.pageIndex);
  }
  ngOnDestroy(): void {
    this.loadInfo$.unsubscribe();
  }
}
