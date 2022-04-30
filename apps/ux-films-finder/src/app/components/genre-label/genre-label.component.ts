import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FilmBaseModel } from '../../models/film-banner.model';
import { GENRES } from '../../consts/genres.const';

@Component({
  selector: 'ff-genre-label',
  templateUrl: './genre-label.component.html',
  styleUrls: ['./genre-label.component.less']
})
export class GenreLabelComponent {
  @Input()
  public genre = '';
  public genreEng = '';
  films$: Subject<FilmBaseModel[]> = new Subject<FilmBaseModel[]>();
  public name = GENRES;
}
