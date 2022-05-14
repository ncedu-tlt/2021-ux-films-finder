import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSpousesComponent } from './person-spouses.component';

describe('PersonSpousesComponent', () => {
  let component: PersonSpousesComponent;
  let fixture: ComponentFixture<PersonSpousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonSpousesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSpousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
