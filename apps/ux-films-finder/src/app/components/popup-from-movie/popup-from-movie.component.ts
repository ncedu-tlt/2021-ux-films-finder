import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageDataInterface } from '../../models/image-data.interface';

@Component({
  selector: 'ff-popup-from-movie',
  templateUrl: './popup-from-movie.component.html',
  styleUrls: ['./popup-from-movie.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PopupFromMovieComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDataInterface) {}
}
