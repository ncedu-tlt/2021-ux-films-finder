export interface ReviewsModel {
  reviewId: number;
  reviewType: string;
  reviewData: string;
  userPositiveRating: string;
  userNegativeRating: string;
  reviewAutor: string;
  reviewTitle: string;
  reviewDescription: string;
  isShown?: boolean;
}
