import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { BiographyModel } from '../../models/biography.model';
import { takeUntil } from 'rxjs/operators';
import { Subject, take } from 'rxjs';
import { GenderEnum } from '../../enum/gender.enum';
import { SpousesEnum } from '../../enum/spouses.enum';
import { PROFESSIONS } from '../../consts/professions-key.const';

@Component({
  selector: 'ff-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonComponent implements OnInit {
  public personsInfo!: BiographyModel;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public GENDER: typeof GenderEnum = GenderEnum;
  public SPOUSES: typeof SpousesEnum = SpousesEnum;
  public professions = PROFESSIONS;
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const param = +params['id'];
        this.filmDataService
          .getPersonsInfoById(param)
          .pipe(take(1))
          .subscribe((info: BiographyModel) => {
            this.personsInfo = info;
          });
      });
  }
}
