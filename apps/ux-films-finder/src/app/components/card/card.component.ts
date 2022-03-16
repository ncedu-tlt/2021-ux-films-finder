import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ff-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input()
  public url = '';
  @Input()
  public name = '';
  @Input()
  public gender = '';
  @Input()
  public rating = 0;
}
