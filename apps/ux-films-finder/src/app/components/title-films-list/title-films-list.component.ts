import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { COLORSTITLE } from '../../consts/color-title.const';
import { COLORSTITLENAME } from '../../consts/title-name.const';

@Component({
  selector: 'ff-title-films-list',
  templateUrl: './title-films-list.component.html',
  styleUrls: ['./title-films-list.component.less']
})
export class TitleFilmsListComponent {
  @Input()
  public genres = '';
  public color = COLORSTITLE;
  public titleGenres = '';
  public name = COLORSTITLENAME;
  constructor(private router: Router) {}

  ngOnInit() {
    this.titleGenres = this.router.url;
    console.log(this.router.url);
  }
}
