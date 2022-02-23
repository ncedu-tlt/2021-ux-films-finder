import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Subject, Subscription, take } from 'rxjs';
import { FilmsResponseModel } from '../../models/films-response.model';
import { FilmBannerResponseModel } from '../../models/film-banner-response.model';
import { FilmBannerModel } from '../../models/film-banner.model';
import { FilmDataService } from '../../services/film-data.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ff-film-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  private loadFilms$: Subscription = new Subscription();
  films$: Subject<FilmBannerResponseModel> =
    new Subject<FilmBannerResponseModel>();
  film!: FilmBannerModel;
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  currentSlide = 1;
  slider!: KeenSliderInstance;
  dotHelper: number[] | undefined;

  constructor(private filmDataService: FilmDataService) {}

  onPageChange(page: PageEvent): void {
    this.loadFilmsList();
  }

  loadFilmsList(): void {
    this.loadFilms$ = this.filmDataService
      .getTopFilms('TOP_100_POPULAR_FILMS', 1)
      .pipe(take(1))
      .subscribe((info: FilmBannerResponseModel) => {
        this.films$.next(info);
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
            let timeout: any;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
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
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys()
      ];
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
