import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ff-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent {
  @Input() public name = '';
  @Input() public rating = 0;
  @Input() public url = '';
}
