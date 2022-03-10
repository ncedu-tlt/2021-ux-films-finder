import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { BiographyModel } from '../../models/biography.model';
import { takeUntil } from 'rxjs/operators';
import { Subject, take } from 'rxjs';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import { GenderEnum } from '../../enum/gender.enum';
import { SpousesEnum } from '../../enum/spouses.enum';

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
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const param = params['id'];
        this.filmDataService
          .getPersonsInfoById(+param)
          .pipe(take(1))
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

  getDate(date: string): string {
    const event = new Date(date);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    } as DateTimeFormatOptions;
    return event.toLocaleDateString('ru-RU', options);
  }
}
