import {
  ChangeDetectorRef,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ff-popup-from-movie',
  templateUrl: './popup-from-movie.component.html',
  styleUrls: ['./popup-from-movie.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PopupFromMovieComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
