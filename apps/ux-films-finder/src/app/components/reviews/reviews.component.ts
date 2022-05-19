import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ReviewResponseModel } from '../../models/reviews-response.model';
import { ReviewsModel } from '../../models/reviews.model';
import { FilmDataService } from '../../services/film-data.service';
import { fromEvent, take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {
  didComponentInit = false;
  isFullReviewShown = false;

  @Input() get filmId(): number {
    return this._filmdId;
  }
  set filmId(filmId: number) {
    this._filmdId = filmId;
    if (this.didComponentInit) {
      this.loadReviews(1);
    }
  }
  public reviewsResponseInfo!: ReviewResponseModel;
  public reviewsInfo: ReviewsModel[] = [];
  public panelOpenState = false;
  private _filmdId = 0;
  readonly pageSize = 5;

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
        this.reviewsResponseInfo = reviewsResponse;
        this.reviewsInfo = this.convertData(reviewsResponse.reviews);
        this.cdr.detectChanges();
        this.didComponentInit = true;
      });
  }

  convertData(reviews: ReviewsModel[]): ReviewsModel[] {
    reviews.forEach(review => {
      if (review.reviewType === 'POSITIVE') {
        review.reviewType = 'Положительный';
      }
      if (review.reviewType === 'NEUTRAL') {
        review.reviewType = 'Нейтральный';
      }
      if (review.reviewType === 'NEGATIVE') {
        review.reviewType = 'Отрицательный';
      }
    });
    return reviews;
  }

  toggleReview(review: ReviewsModel): void {
    review.isShown = !review.isShown;
    console.log('toggleReview triggered');
  }

  onPageChange(page: PageEvent): void {
    this.loadReviews(++page.pageIndex);
  }
}
