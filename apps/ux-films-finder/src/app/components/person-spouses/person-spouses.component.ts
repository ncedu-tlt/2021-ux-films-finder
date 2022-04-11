import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SpousesEnum } from '../../enum/spouses.enum';

@Component({
  selector: 'ff-person-spouses',
  templateUrl: './person-spouses.component.html',
  styleUrls: ['./person-spouses.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonSpousesComponent {
  @Input() relation = '';
  @Input() name = '';
  @Input() divorced = false;
  @Input() children = 0;
  @Input() personId = 0;
  public SPOUSES: typeof SpousesEnum = SpousesEnum;
}
