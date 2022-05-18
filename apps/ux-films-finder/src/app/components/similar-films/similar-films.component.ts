import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { take } from 'rxjs';
import { BaseFilmsResponseModel } from '../../models/films-response.model';
import { BaseFilmModel } from '../../models/film.model';
import { FilmDataService } from '../../services/film-data.service';

@Component({
  selector: 'ff-similar-films',
  templateUrl: './similar-films.component.html',
  styleUrls: ['./similar-films.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SimilarFilmsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  currentSlide = 0;
  clickedSlide = -1;
  dots: number[] = [];
  slider!: KeenSliderInstance;
  extraDots = 2;
  didComponentInit = false;
  readonly SLIDER_OPTIONS = {
    initial: this.currentSlide,
    slideChanged: (slider: KeenSliderInstance) => {
      if (this.clickedSlide >= 0) {
        this.currentSlide = this.clickedSlide;
        this.clickedSlide = -1;
      } else {
        this.currentSlide = slider.track.details.rel;
      }
    },
    breakpoints: {
      '(min-width: 900px)': {
        slides: { perView: 2, spacing: 5 },
        optionsChanged: () => {
          if (this.similarFilms.length - this.dots.length === 2) {
            this.dots.length++;
          }
          if (this.similarFilms.length === this.dots.length) {
            this.dots.length--;
          }
        }
      },
      '(min-width: 1250px)': {
        slides: { perView: 3, spacing: 10 },
        optionsChanged: () => {
          if (this.similarFilms.length - this.dots.length === 1) {
            this.dots.length--;
          }
          if (this.similarFilms.length === this.dots.length) {
            this.dots.length -= 2;
          }
        }
      }
    },
    slides: { perView: 1 },
    optionsChanged: () => {
      if (this.similarFilms.length - this.dots.length === 1) {
        this.dots.length++;
      }
      if (this.similarFilms.length - this.dots.length === 2) {
        this.dots.length += 2;
      }
    }
  };

  @Input() get filmId(): number {
    return this._filmId;
  }
  set filmId(filmdId: number) {
    this._filmId = filmdId;
    if (this.didComponentInit) {
      this.loadSimilarFilms();
    }
  }
  public similarFilms: BaseFilmModel[] = [];
  private _filmId = 0;

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      this.SLIDER_OPTIONS
    );
  }

  ngOnInit(): void {
    this.loadSimilarFilms();
  }

  loadSimilarFilms(): void {
    this.filmDataService
      .getSimilarFilms(this.filmId)
      .pipe(take(1))
      .subscribe((films: BaseFilmsResponseModel) => {
        this.similarFilms = films.items.slice(0, 10);
        this.dots = Array(this.similarFilms.length - this.extraDots);
        this.currentSlide = 0;
        this.cdr.detectChanges();

        this.slider?.update(this.SLIDER_OPTIONS, 0);

        this.didComponentInit = true;
      });
  }

  moveToIndex(index: number): void {
    this.clickedSlide = index;
    this.slider.moveToIdx(index);
  }

  ngOnDestroy() {
    this.slider?.destroy();
  }
}
