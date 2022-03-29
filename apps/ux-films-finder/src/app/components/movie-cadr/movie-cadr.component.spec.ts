import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCadrComponent } from './movie-cadr.component';

describe('PopupFromMovieComponent', () => {
  let component: MovieCadrComponent;
  let fixture: ComponentFixture<MovieCadrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCadrComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCadrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
