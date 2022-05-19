import { ReviewsModel } from './reviews.model';

export interface ReviewResponseModel {
  page: number;
  filmId: number;
  reviewAllCount: number;
  reviewAllPositiveRatio: number;
  reviewPositiveCount: number;
  reviewNegativeCount: number;
  reviewNeutralCount: number;
  pagesCount: number;
  reviews: ReviewsModel[];
}

export type KinopoiskRequestModel = ReviewResponseModel;
