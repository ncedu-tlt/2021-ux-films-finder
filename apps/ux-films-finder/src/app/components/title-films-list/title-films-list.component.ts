import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GENRES } from '../../consts/genres.const';

@Component({
  selector: 'ff-title-films-list',
  templateUrl: './title-films-list.component.html',
  styleUrls: ['./title-films-list.component.less']
})
export class TitleFilmsListComponent {
  @Input()
  public genre = '';
  public genres = GENRES;
}
