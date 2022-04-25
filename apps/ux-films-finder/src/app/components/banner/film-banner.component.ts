import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Subject, Subscription, take } from 'rxjs';
import { FilmBannerResponseModel } from '../../models/film-banner-response.model';
import { FilmBaseModel } from '../../models/film-banner.model';
import { FilmDataService } from '../../services/film-data.service';
import { GENRES } from '../../consts/genres.const';

@Component({
  selector: 'ff-film-banner',
  templateUrl: './film-banner.component.html',
  styleUrls: ['./film-banner.component.less']
})
export class FilmBannerComponent implements AfterViewInit, OnDestroy, OnInit {
  private loadFilms$: Subscription = new Subscription();
  films$: Subject<FilmBaseModel[]> = new Subject<FilmBaseModel[]>();
  public name = GENRES;
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  currentSlide = 1;
  slider!: KeenSliderInstance;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFilmsList();
  }

  loadFilmsList(): void {
    this.loadFilms$ = this.filmDataService
      .getTopFilms('TOP_100_POPULAR_FILMS', 1)
      .pipe(take(1))
      .subscribe((info: FilmBannerResponseModel) => {
        this.films$.forEach(function (films) {
          films.forEach(function (film) {
            film.genres;
          });
        });
        this.films$.next(info.films.slice(0, 10));
        this.cdr.detectChanges();
        this.slider.update();
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(
        this.sliderRef.nativeElement,
        {
          initial: this.currentSlide,
          slideChanged: s => {
            this.currentSlide = s.track.details.rel;
          },
          loop: true
        },
        [
          slider => {
            let number: any;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(number);
            }
            function nextTimeout() {
              clearTimeout(number);
              if (mouseOver) return;
              number = setTimeout(() => {
                slider.next();
              }, 5000);
            }
            slider.on('created', () => {
              slider.container.addEventListener('mouseover', () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener('mouseout', () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on('dragStarted', clearNextTimeout);
            slider.on('animationEnded', nextTimeout);
            slider.on('updated', nextTimeout);
          }
        ]
      );
      this.cdr.detectChanges();
      this.slider.update();
    });
  }
  ngOnDestroy() {
    this.slider?.destroy();
  }
}
