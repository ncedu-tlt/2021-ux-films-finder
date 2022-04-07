import { Component, Input } from '@angular/core';
import { Subject, take } from 'rxjs';
import { FilmBaseModel } from '../../models/film-banner.model';
import { COLORS } from '../../consts/color-gender.const';

@Component({
  selector: 'ff-genre-label',
  templateUrl: './genre-label.component.html',
  styleUrls: ['./genre-label.component.less']
})
export class GenreLabelComponent {
  @Input()
  public genres = '';
  films$: Subject<FilmBaseModel[]> = new Subject<FilmBaseModel[]>();
  public color = COLORS;
}
