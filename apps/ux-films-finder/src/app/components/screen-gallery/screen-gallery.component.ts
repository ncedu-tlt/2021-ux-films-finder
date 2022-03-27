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

@Component({
  selector: 'ff-screen-gallery',
  templateUrl: './screen-gallery.component.html',
  styleUrls: ['./screen-gallery.component.less']
})
export class ScreenGalleryComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  slider?: KeenSliderInstance;
  @Input() public filmId = 0;
  public filmImages$: BehaviorSubject<FilmImagesResponseModel> =
    new BehaviorSubject<FilmImagesResponseModel>({
      items: [],
      total: 0,
      totalPages: 0
    });

  private loadImages$: Subscription = new Subscription();

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef //TODO: ChangeDetectorRef ?
  ) {}

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      mode: 'free',
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
        this.filmImages$.next(img);
        this.cdr.detectChanges();
        this.slider?.update();
      });
  }

  ngOnDestroy() {
    this.slider?.destroy();
    this.loadImages$.unsubscribe();
  }
}
