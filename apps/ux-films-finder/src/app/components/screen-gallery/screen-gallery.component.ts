import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { FilmDataService } from '../../services/film-data.service';
import { FilmImagesResponseModel } from '../../models/fiml-images-response.model';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MovieCadrComponent } from '../movie-cadr/movie-cadr.component';
import { FilmImagesModel } from '../../models/film-images.model';

@Component({
  selector: 'ff-screen-gallery',
  templateUrl: './screen-gallery.component.html',
  styleUrls: ['./screen-gallery.component.less']
})
export class ScreenGalleryComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  @Input() public filmId = 0;
  slider?: KeenSliderInstance;
  public activeImage: FilmImagesModel[] = [];
  currentSlide = 1;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  openDialog(url: string): void {
    const newImagesArray = this.activeImage.map((currentValue, index) => {
      return currentValue.imageUrl;
    });
    this.dialog.open(MovieCadrComponent, {
      data: { currentImage: url, images: newImagesArray },
      maxWidth: '1600px'
    });
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      mode: 'free',
      initial: this.currentSlide,
      slideChanged: slide => {
        this.currentSlide = slide.track.details.rel;
      },
      breakpoints: {
        '(min-width: 370px)': {
          slides: { perView: 1, spacing: 8 }
        },
        '(min-width: 800px)': {
          slides: { perView: 1.5, spacing: 16 }
        },
        '(min-width: 1000px)': {
          slides: { perView: 2.5, spacing: 32 }
        }
      }
    });
  }

  ngOnInit() {
    this.filmDataService
      .getFilmImages(this.filmId)
      .pipe(take(1))
      .subscribe((filmImagesResponse: FilmImagesResponseModel) => {
        this.activeImage = filmImagesResponse.items;
        this.cdr.detectChanges();
        this.slider?.update();
      });
  }

  ngOnDestroy() {
    this.slider?.destroy();
  }
}
