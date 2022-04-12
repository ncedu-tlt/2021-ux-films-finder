import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PROFESSIONS } from '../../consts/professions-key.const';
import { FilmModel } from '../../models/film.model';

@Component({
  selector: 'ff-person-films',
  templateUrl: './person-films.component.html',
  styleUrls: ['./person-films.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonFilmsComponent {
  @Input() public films: FilmModel[] = [];
  public professions = PROFESSIONS;
}
