import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresBanner } from './genres-banner.component';

describe('CategoryFilmListBannerComponent', () => {
  let component: GenresBanner;
  let fixture: ComponentFixture<GenresBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenresBanner]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
