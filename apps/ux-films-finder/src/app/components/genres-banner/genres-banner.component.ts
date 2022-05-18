import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'ff-genres-banner',
  templateUrl: './genres-banner.component.html',
  styleUrls: ['./genres-banner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GenresBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;
  currentSlide = 1;
  dots: number[] = [];
  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: slider => {
          this.currentSlide = slider.track.details.rel;
        },
        breakpoints: {
          '(min-width: 600px)': {
            slides: { perView: 2, spacing: 5 }
          },
          '(min-width: 1000px)': {
            slides: { perView: 3, spacing: 10 }
          }
        },
        slides: { perView: 1 }
      });
      this.dots = Array(9);
    });
  }

  ngOnDestroy() {
    this.slider?.destroy();
  }
}
