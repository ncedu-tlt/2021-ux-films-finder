import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SpousesEnum } from '../../enum/spouses.enum';
import { SpousesModel } from '../../models/spouses.model';

@Component({
  selector: 'ff-person-spouses',
  templateUrl: './person-spouses.component.html',
  styleUrls: ['./person-spouses.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonSpousesComponent {
  @Input() spouses: SpousesModel[] = [];
  public SPOUSES: typeof SpousesEnum = SpousesEnum;
}
