import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  isShown = false;
  desktop = false;
  laptop = true;
  readonly DESKTOP_SIZE = 871;
  readonly LAPTOP_SIZE = 1439;
  toggleSearchVisibility() {
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
    if (window.innerWidth <= this.LAPTOP_SIZE) {
      this.laptop = false;
    } else {
      this.laptop = true;
    }
  }
  ngOnInit() {
    this.onResize();
  }
}
