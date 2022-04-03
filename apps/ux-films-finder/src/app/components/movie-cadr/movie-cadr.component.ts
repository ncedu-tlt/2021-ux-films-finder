import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageDataInterface } from '../../models/image-data.interface';

@Component({
  selector: 'ff-movie-cadr',
  templateUrl: './movie-cadr.component.html',
  styleUrls: ['./movie-cadr.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MovieCadrComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDataInterface) {}

  public currentIndex = 0;

  ngOnInit(): void {
    this.currentIndex = this.data.images.indexOf(this.data.currentImage);
  }
  public switchImage(isLeftArrowClicked: boolean): void {
    if (isLeftArrowClicked) {
      this.currentIndex =
        this.currentIndex === 0
          ? this.data.images.length - 1
          : this.currentIndex - 1;
    } else {
      this.currentIndex =
        this.currentIndex === this.data.images.length - 1
          ? 0
          : this.currentIndex + 1;
    }
  }
}
