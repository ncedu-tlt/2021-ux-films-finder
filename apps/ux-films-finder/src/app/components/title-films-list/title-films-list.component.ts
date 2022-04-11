import { Component, HostBinding, Input } from '@angular/core';
import { COLORS } from '../../consts/color-gender.const';
import { Subject } from 'rxjs';
import { TitleFilmsListModel } from '../../models/title-films-list.model';
import { TitleFilmsListResponseModel } from '../../models/title-films-list-response.model';
import { FilmBaseModel } from '../../models/film-banner.model';

@Component({
  selector: 'ff-title-films-list',
  templateUrl: './title-films-list.component.html',
  styleUrls: ['./title-films-list.component.less']
})
export class TitleFilmsListComponent {
  @Input()
  public genres = '';
  films$: Subject<FilmBaseModel[]> = new Subject<FilmBaseModel[]>();
  public color = COLORS;
}
