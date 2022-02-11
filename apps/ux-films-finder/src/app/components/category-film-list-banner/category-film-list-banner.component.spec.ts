import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilmListBannerComponent } from './category-film-list-banner.component';

describe('CategoryFilmListBannerComponent', () => {
  let component: CategoryFilmListBannerComponent;
  let fixture: ComponentFixture<CategoryFilmListBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFilmListBannerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFilmListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
