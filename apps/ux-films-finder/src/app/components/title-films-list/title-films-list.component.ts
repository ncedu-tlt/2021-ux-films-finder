import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS_TITLE } from '../../consts/color-title.const';
import { COLORS_TITLE_NAME } from '../../consts/title-name.const';

@Component({
  selector: 'ff-title-films-list',
  templateUrl: './title-films-list.component.html',
  styleUrls: ['./title-films-list.component.less']
})
export class TitleFilmsListComponent {
  @Input()
  public genres = '';
  public color = COLORS_TITLE;
  public titleGenres = '';
  public name = COLORS_TITLE_NAME;
  constructor(private router: Router) {}

  ngOnInit() {
    this.titleGenres = this.router.url;
    console.log(this.router.url);
  }
}
