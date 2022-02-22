import { Component } from '@angular/core';

@Component({
  selector: 'ff-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.less']
})
export class SwitcherComponent {
  isDarkThemeEnabled = false;
  isBaseThemeEnabled = true;

  themeEnabled() {
    this.isDarkThemeEnabled = !this.isDarkThemeEnabled;
    this.isBaseThemeEnabled = !this.isBaseThemeEnabled;
  }
}
