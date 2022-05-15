import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilmBaseModel } from '../../models/film-banner.model';
import { GENRES } from '../../consts/genres.const';

@Component({
  selector: 'ff-genre-label',
  templateUrl: './genre-label.component.html',
  styleUrls: ['./genre-label.component.less']
})
export class GenreLabelComponent implements OnInit {
  @Input()
  public genre = '';
  public genreEng = '';

  public genres = GENRES;

  ngOnInit() {
    for (const [key, value] of Object.entries(this.genres)) {
      console.log(`${key}: ${value}`);
      if (value === this.genre) {
        this.genreEng = key;
      }
    }
  }
}
