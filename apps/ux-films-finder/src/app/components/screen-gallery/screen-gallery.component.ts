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
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupFromMovieComponent } from '../popup-from-movie/popup-from-movie.component';
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
  public images: FilmImagesModel[] = [];
  private loadImages$: Subscription = new Subscription();
  public enlargeImage?: string;
  currentSlide = 1;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  openDialog(url: string) {
    this.enlargeImage = url;
    const dialogRef = this.dialog.open(PopupFromMovieComponent, {
      data: { image: this.enlargeImage, images: this.images },
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
    this.loadImages$ = this.filmDataService
      .getFilmImages(this.filmId)
      .pipe(take(1))
      .subscribe((img: FilmImagesResponseModel) => {
        this.images = img.items;
        this.cdr.detectChanges();
        this.slider?.update();
      });
  }

  ngOnDestroy() {
    this.slider?.destroy();
    this.loadImages$.unsubscribe();
  }
}
