import { Component, Input } from '@angular/core';

@Component({
  selector: 'ff-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
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
