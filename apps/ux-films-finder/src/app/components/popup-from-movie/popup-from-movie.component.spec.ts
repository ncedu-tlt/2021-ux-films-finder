import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFromMovieComponent } from './popup-from-movie.component';

describe('PopupFromMovieComponent', () => {
  let component: PopupFromMovieComponent;
  let fixture: ComponentFixture<PopupFromMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupFromMovieComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFromMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
