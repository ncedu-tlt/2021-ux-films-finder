import { Component, HostBinding, Input } from '@angular/core';
import { COLORS } from '../../consts/color-gender.const';
import { Subject } from 'rxjs';
import { TitleFilmsListModel } from '../../models/title-films-list.model';
import { TitleFilmsListResponseModel } from '../../models/title-films-list-response.model';
import { FilmBaseModel } from '../../models/film-banner.model';
import { Router } from '@angular/router';
import { COLORSTITLE } from '../../consts/color-title.const';

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
  // private routerSubscription: Subscription;

  constructor(private router: Router) {}
  //   this.routerSubscription = router.params.subscribe(params=>this.id=params['']);
  //   this
  // .
  //   router
  // .
  //
  //   navigate(['localhost:4200'] {
  //
  //   }
  //
  // )
  ngOnInit() {
    this.titleGenres = this.router.url;
    console.log(this.router.url);
  }
}
