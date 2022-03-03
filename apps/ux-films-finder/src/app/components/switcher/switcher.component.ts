import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ff-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.less']
})
export class SwitcherComponent {
  isDarkThemeEnabled = false;
  constructor(@Inject(DOCUMENT) private document: Document) {}
  changeTheme() {
    this.isDarkThemeEnabled = !this.isDarkThemeEnabled;
    this.document.body.classList.toggle('theme-dark');
  }
}
