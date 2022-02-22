import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ff-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.less']
})
export class SwitcherComponent {
  isThemeEnabled = false;
  constructor(@Inject(DOCUMENT) private document: Document) {}
  changeTheme() {
    this.isThemeEnabled = !this.isThemeEnabled;
    this.document.body.classList.add('theme-dark');
  }
}
