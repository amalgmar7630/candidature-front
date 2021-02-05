import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessApplicationComponent } from './success-application.component';

describe('SuccessApplicationComponent', () => {
  let component: SuccessApplicationComponent;
  let fixture: ComponentFixture<SuccessApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
