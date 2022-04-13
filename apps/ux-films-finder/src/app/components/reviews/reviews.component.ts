import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { ReviewResponseModel } from '../../models/reviews-response.model';
import { ReviewsModel } from '../../models/reviews.model';
import { FilmDataService } from '../../services/film-data.service';
import { take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less']
})
export class ReviewsComponent implements OnInit {
  isComponentInited = false;

  @Input() get filmId(): number {
    return this._filmdId;
  }
  set filmId(filmId: number) {
    this._filmdId = filmId;
    if (this.isComponentInited) {
      this.loadReviews(1);
    }
  }
  public reviewsInfo: ReviewsModel[] = [];
  private _filmdId = 0;
  readonly pageSize = 20;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReviews(1);
  }

  loadReviews(pageIndex: number): void {
    this.filmDataService
      .getReviewsById(this.filmId, pageIndex)
      .pipe(take(1))
      .subscribe((reviewsResponse: ReviewResponseModel) => {
        this.reviewsInfo = reviewsResponse.reviews;
        this.cdr.detectChanges();

        this.isComponentInited = true;
      });
  }

  onPageChange(page: PageEvent): void {
    this.loadReviews(++page.pageIndex);
  }
}
