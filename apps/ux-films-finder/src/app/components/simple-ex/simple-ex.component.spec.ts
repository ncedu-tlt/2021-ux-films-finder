import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExComponent } from './simple-ex.component';

describe('SimpleExComponent', () => {
  let component: SimpleExComponent;
  let fixture: ComponentFixture<SimpleExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleExComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
