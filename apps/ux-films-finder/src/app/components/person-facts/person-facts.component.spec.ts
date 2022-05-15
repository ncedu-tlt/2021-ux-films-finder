import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFactsComponent } from './person-facts.component';

describe('PersonFactsComponent', () => {
  let component: PersonFactsComponent;
  let fixture: ComponentFixture<PersonFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonFactsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
