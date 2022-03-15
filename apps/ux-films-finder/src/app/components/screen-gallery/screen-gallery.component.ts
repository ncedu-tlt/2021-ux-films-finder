import {
  AfterViewInit,
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
import { BehaviorSubject, Subject, Subscription, take } from 'rxjs';
import { PersonInfoResponseModel } from '../../models/person-info-response.model';

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

  constructor(private filmDataService: FilmDataService) {}

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      mode: 'free',
      slides: { origin: 'center', perView: 2.5, spacing: 10 },
      range: {
        min: -5,
        max: 5
      }
    });
  }
  ngOnInit() {
    this.loadImages$ = this.filmDataService
      .getFilmImages(this.filmId)
      .pipe(take(1))
      .subscribe((img: FilmImagesResponseModel) => {
        this.filmImages$.next(img);
      });
    this.slider?.update();
  }
  ngOnDestroy() {
    this.slider?.destroy();
    this.loadImages$.unsubscribe();
  }
}
