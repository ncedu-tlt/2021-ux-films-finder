import { Component, HostBinding, OnInit } from '@angular/core';
import { FilmModel } from '../../models/film.model';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ff-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  public filmInfo!: FilmModel;

  constructor(
    private filmDataService: FilmDataService,
    private activatedRoute: ActivatedRoute
  ) {}
  @HostBinding('class.center-content') private hostClass = true;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const param = params['id'];
      this.filmDataService.getFilmById(+param).subscribe((info: FilmModel) => {
        this.filmInfo = info;
      });
    });
  }
}
