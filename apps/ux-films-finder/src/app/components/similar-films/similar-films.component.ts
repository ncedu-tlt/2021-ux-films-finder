import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Subject, Subscription, take } from 'rxjs';
import { BaseFilmsResponseModel } from '../../models/films-response.model';
import { FilmDataService } from '../../services/film-data.service';

@Component({
  selector: 'ff-similar-films',
  templateUrl: './similar-films.component.html',
  styleUrls: ['./similar-films.component.less']
})
export class SimilarFilmsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  currentSlide = 1;
  dots: number[] = [];
  slider!: KeenSliderInstance;

  @Input() public filmId = 0;
  public similarFilms$: Subject<BaseFilmsResponseModel> =
    new Subject<BaseFilmsResponseModel>();
  private loadSimilarFilms$: Subscription = new Subscription();

  constructor(
    private filmDataService: FilmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: slider => {
          this.currentSlide = slider.track.details.rel;
        },
        slides: {
          perView: 3,
          spacing: 150
        }
      });
      this.dots = [...Array(this.slider.track.details.slides.length).keys()];
    });
  }

  ngOnInit(): void {
    this.loadSimilarFilms$ = this.filmDataService
      .getSimilarFilms(this.filmId)
      .pipe(take(1))
      .subscribe((films: BaseFilmsResponseModel) => {
        // films.items.slice(0, 10);
        this.similarFilms$.next(films);
        this.cdr.detectChanges();
        this.slider?.update();
      });
  }

  ngOnDestroy() {
    this.slider?.destroy();
    this.loadSimilarFilms$.unsubscribe();
  }
}
