import { ActorModel } from './actor.model';
export interface FilmActorModel {
  total: number;
  items: ActorModel[];
}
export type KinopoiskRequestModel = FilmActorModel;
