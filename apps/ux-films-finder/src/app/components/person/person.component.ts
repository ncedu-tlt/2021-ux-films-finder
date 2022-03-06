import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { BiographyModel } from '../../models/biography.model';
import { takeUntil } from 'rxjs/operators';
import { Subject, take } from 'rxjs';

@Component({
  selector: 'ff-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PersonComponent implements OnInit {
  public personsInfo!: BiographyModel;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(take(1)).subscribe(params => {
      const param = params['id'];
      this.filmDataService
        .getPersonsInfoById(+param)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((info: BiographyModel) => {
          this.personsInfo = info;
        });
    });
  }

  public getRole(professionKey: string): string {
    switch (professionKey) {
      case 'ACTOR':
        return 'Актёр';

      case 'OPERATOR':
        return 'Оператор';

      case 'HRONO_TITR_MALE':
        return 'Титры хроно мужской';

      case 'HRONO_TITR_FEMALE':
        return 'Титры хроно женский';

      case 'VOICE_FEMALE':
        return 'Озвучка женский';

      case 'VOICE_MALE':
        return 'Озвучка мужской';

      case 'PRODUCER':
        return 'Продюссер';

      case 'HIMSELF':
        return 'Сам себя';

      case 'WRITER':
        return 'Писатель';

      case 'EDITOR':
        return 'Редактор';

      case 'DESIGN':
        return 'Дизайнер';

      case 'HERSELF':
        return 'Сама себя';

      case 'DIRECTOR':
        return 'Режиссер';

      default:
        return 'Не указано';
    }
  }
}
