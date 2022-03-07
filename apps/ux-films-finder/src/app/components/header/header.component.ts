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

  searchDisplay() {
    this.isShown = !this.isShown;
  }
  @HostListener('window:resize')
  onResize() {
    window.innerWidth >= 871
      ? ((this.desktop = true), (this.isShown = false))
      : (this.desktop = false);
  }
  ngOnInit() {
    this.onResize();
  }
}
