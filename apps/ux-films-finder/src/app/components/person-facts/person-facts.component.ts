import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ff-person-facts',
  templateUrl: './person-facts.component.html',
  styleUrls: ['./person-facts.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonFactsComponent {
  @Input() public facts: string[] = [];
}
