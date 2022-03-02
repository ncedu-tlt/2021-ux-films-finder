import { Component, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { PersonInfoResponseModel } from '../../models/person-info-response.model';
import { Subject, Subscription, take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ff-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.less']
})
export class SearchPersonsComponent implements OnInit {
  constructor(
    private personData: FilmDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  public person$: Subject<PersonInfoResponseModel> =
    new Subject<PersonInfoResponseModel>();
  readonly pageSize = 50;
  private loadInfo$: Subscription = new Subscription();
  search = '';
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.search = params['search'];
    });
    this.loadPersonInfo(1);
  }
  loadPersonInfo(pageIndex: number) {
    this.loadInfo$ && this.loadInfo$.unsubscribe();
    this.loadInfo$ = this.personData
      .getInfoByPersonName(this.search, pageIndex)
      .pipe(take(1))
      .subscribe((info: PersonInfoResponseModel) => {
        this.person$.next(info);
      });
  }
  onSearch() {
    this.router.navigate(['/search-persons'], {
      queryParams: { search: this.search }
    });
    this.loadPersonInfo(1);
  }
  onPageChange(page: PageEvent): void {
    this.loadPersonInfo(++page.pageIndex);
  }

  ngOnDestroy(): void {
    this.loadInfo$.unsubscribe();
  }
}
