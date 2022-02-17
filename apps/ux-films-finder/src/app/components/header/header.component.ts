import { Component} from '@angular/core';

@Component({
  selector: 'ff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  isPressed = false;

  searchDisplay(){
    this.isPressed = !this.isPressed;
  }
}
