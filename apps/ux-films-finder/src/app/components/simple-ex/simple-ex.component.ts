import { Component, OnInit } from '@angular/core';
import { FilmModel } from '../../models/film.model';
import { FilmDataService } from '../../services/film-data.service';

@Component({
  selector: 'ff-simple-ex',
  templateUrl: './simple-ex.component.html',
  styleUrls: ['./simple-ex.component.less']
})
export class SimpleExComponent implements OnInit {
  public filmInfo: FilmModel | null = null;
  public filmImg: FilmModel | null = null;

  constructor(private filmDataService: FilmDataService) {}

  ngOnInit(): void {
    this.filmDataService
      .getFilmById(301)
      .subscribe((info: FilmModel | null) => {
        this.filmInfo = info;
      });
  }
}
