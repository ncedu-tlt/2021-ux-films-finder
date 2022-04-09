import { Component, Input } from '@angular/core';

@Component({
  selector: 'ff-person-facts',
  templateUrl: './person-facts.component.html',
  styleUrls: ['./person-facts.component.less']
})
export class PersonFactsComponent {
  @Input() public fact = '';
}
