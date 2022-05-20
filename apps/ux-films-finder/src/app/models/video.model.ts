import { VideoDetailsModel } from './video-details.model';

export interface VideoModel {
  total: number;
  items: VideoDetailsModel[];
}
