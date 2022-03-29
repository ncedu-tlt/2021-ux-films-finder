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
  public currentImage: string = this.data.image;
  public images: string[] = this.data.images;
  public currentIndex = 0;
  ngOnInit(): void {
    this.currentIndex = this.images.indexOf(this.currentImage);
  }
  public switchImage(isLeftArrowClicked: boolean): void {
    if (isLeftArrowClicked) {
      if (this.currentIndex == 0) {
        this.currentIndex = this.images.length - 1;
      } else {
        this.currentIndex--;
      }
    } else if (this.currentIndex == this.images.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
}
