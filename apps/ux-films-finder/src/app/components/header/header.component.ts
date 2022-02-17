import { Component } from '@angular/core';

@Component({
  selector: 'ff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  isShown = false;

  searchDisplay() {
    this.isShown = !this.isShown;
  }
}
