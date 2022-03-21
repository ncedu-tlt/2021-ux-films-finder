import { Component, Input } from '@angular/core';
import { Subject, take } from 'rxjs';
import { FilmBannerModel } from '../../models/film-banner.model';
import { COLORS } from '../../consts/color-gender.const';
import { FilmBannerResponseModel } from '../../models/film-banner-response.model';

@Component({
  selector: 'ff-genre-label',
  templateUrl: './genre-label.component.html',
  styleUrls: ['./genre-label.component.less']
})
export class GenreLabelComponent {
  @Input()
  public genres = '';
  films$: Subject<FilmBannerModel[]> = new Subject<FilmBannerModel[]>();
  public color = COLORS;
}
