import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'ff-category-film-list-banner',
  templateUrl: './category-film-list-banner.component.html',
  styleUrls: ['./category-film-list-banner.component.less']
})
export class CategoryFilmListBannerComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;
  currentSlide = 1;
  dotHelper: Array<number> = [];
  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: s => {
          this.currentSlide = s.track.details.rel;
        },
        breakpoints: {
          '(min-width: 400px)': {
            slides: { perView: 2, spacing: 5 }
          },
          '(min-width: 1000px)': {
            slides: { perView: 3, spacing: 10 }
          }
        },
        slides: { perView: 1 }
      });
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys()
      ];
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
