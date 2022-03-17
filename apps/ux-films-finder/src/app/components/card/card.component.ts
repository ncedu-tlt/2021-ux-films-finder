import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ff-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @HostBinding('class.ff-card')
  private hostClass = true;
  @Input()
  public name = '';
  @Input()
  public url = '';
  @Input()
  public gender = '';
  @Input()
  public rating = 0;
}
