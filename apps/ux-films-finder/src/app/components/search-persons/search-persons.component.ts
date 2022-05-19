import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { PersonInfoResponseModel } from '../../models/person-info-response.model';
import { BehaviorSubject, Subject, Subscription, take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ff-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.less']
})
export class SearchPersonsComponent implements OnInit, OnDestroy {
  constructor(
    private personData: FilmDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @HostBinding('class.center-content') private hostClass = true;
  public person$: BehaviorSubject<PersonInfoResponseModel> =
    new BehaviorSubject<PersonInfoResponseModel>({ items: [], total: 0 });

  private unsubscribe$: Subject<void> = new Subject<void>();

  readonly pageSize = 50;

  private loadInfo$: Subscription = new Subscription();

  public search = '';
  public searchParam = '';
  private firstPage = 1;
  public loading!: boolean;
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.search = params['search'];
        this.searchParam = params['search'];
        this.loading = true;
        this.loadPersonInfo(this.firstPage);
      });
  }

  loadPersonInfo(pageIndex: number): void {
    this.loadInfo$ && this.loadInfo$.unsubscribe();
    this.loadInfo$ = this.personData
      .getInfoByPersonName(this.search ?? '', pageIndex)
      .pipe(take(1))
      .subscribe((info: PersonInfoResponseModel) => {
        this.person$.next(info);
        this.loading = false;
      });
  }

  onSearch(): void {
    this.router.navigate(['/search-persons'], {
      queryParams: { search: this.search.trim() }
    });
  }
  onPageChange(page: PageEvent): void {
    this.loadPersonInfo(++page.pageIndex);
    this.router.navigate(['/search-persons'], {
      queryParams: { page: page.pageIndex }
    });
  }

  ngOnDestroy(): void {
    this.loadInfo$.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
