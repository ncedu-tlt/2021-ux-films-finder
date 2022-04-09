import { Component, Input } from '@angular/core';
import { PROFESSIONS } from '../../consts/professions-key.const';

@Component({
  selector: 'ff-person-films',
  templateUrl: './person-films.component.html',
  styleUrls: ['./person-films.component.less']
})
export class PersonFilmsComponent {
  @Input() public rating = '';
  @Input() public filmId = 0;
  @Input() public nameRu = '';
  @Input() public nameEn = '';
  @Input() public professionKey = '';
  public professions = PROFESSIONS;
}
