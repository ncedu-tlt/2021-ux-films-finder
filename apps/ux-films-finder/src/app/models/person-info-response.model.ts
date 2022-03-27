import { PersonInfoModel } from './person-info.model';

export interface PersonInfoResponseModel {
  total: number;
  items: PersonInfoModel[];
}
export type KinopoiskRequestModel = PersonInfoModel;
