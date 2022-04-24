import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { ReviewResponseModel } from '../../models/reviews-response.model';
import { ReviewsModel } from '../../models/reviews.model';
import { FilmDataService } from '../../services/film-data.service';
import { fromEvent, take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less']
})
export class ReviewsComponent implements OnInit {
  isComponentInited = false;
  isFullReviewShown = false;

  @Input() get filmId(): number {
    return this._filmdId;
  }
  set filmId(filmId: number) {
    this._filmdId = filmId;
    if (this.isComponentInited) {
      this.loadReviews(1);
    }
  }
  public reviewsResponseInfo!: ReviewResponseModel;
  public reviewsInfo: ReviewsModel[] = [];
  public panelOpenState = false;
  private _filmdId = 0;
  private date = new Date();
  readonly pageSize = 5;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReviews(1);

    //TODO: Doesn't work
    const showMoreButtons = document.querySelectorAll(
      '.reviews__see-more-button'
    );
    const showMore = fromEvent(showMoreButtons, 'click');
    showMore.subscribe(() => {
      showMoreButtons.forEach(button => {
        button.classList.add('_show');
        console.log('class is added to the classList');
      });
    });
  }

  loadReviews(pageIndex: number): void {
    this.filmDataService
      .getReviewsById(this.filmId, pageIndex)
      .pipe(take(1))
      .subscribe((reviewsResponse: ReviewResponseModel) => {
        this.reviewsResponseInfo = reviewsResponse;
        this.reviewsInfo = this.convertData(reviewsResponse.reviews);
        console.log(this.reviewsInfo.length);
        this.cdr.detectChanges();
        this.isComponentInited = true;
      });
  }

  //TODO: How to translate months in Russian? (P.S. Check this format please)
  convertData(reviews: ReviewsModel[]): ReviewsModel[] {
    reviews.forEach(review => {
      this.date = new Date(review.reviewData);
      review.reviewData = this.date.toDateString();
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

  onPageChange(page: PageEvent): void {
    this.loadReviews(++page.pageIndex);
  }
}
