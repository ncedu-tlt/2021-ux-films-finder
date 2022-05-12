import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFilmsComponent } from './person-films.component';

describe('PersonFilmsComponent', () => {
  let component: PersonFilmsComponent;
  let fixture: ComponentFixture<PersonFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonFilmsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
