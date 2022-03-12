import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  isShown = false;
  desktop = false;
  isScrolled = false;
  DESKTOP_SIZE = 871;
  searchDisplay() {
    this.isShown = !this.isShown;
  }
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= this.DESKTOP_SIZE) {
      this.desktop = true;
      this.isShown = false;
    } else {
      this.desktop = false;
    }
  }
  ngOnInit() {
    this.onResize();
  }
}
