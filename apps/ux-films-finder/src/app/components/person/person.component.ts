import { Component, OnInit } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { BiographyModel } from '../../models/biography.model';

@Component({
  selector: 'ff-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less']
})
export class PersonComponent implements OnInit {
  public personsInfo!: BiographyModel;
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const param = params['id'];
      this.filmDataService
        .getPersonsInfoById(+param)
        .subscribe((info: BiographyModel) => {
          this.personsInfo = info;
        });
    });
  }
}
