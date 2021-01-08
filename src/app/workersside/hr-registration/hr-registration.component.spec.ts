import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRegistrationComponent } from './hr-registration.component';

describe('HrRegistrationComponent', () => {
  let component: HrRegistrationComponent;
  let fixture: ComponentFixture<HrRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
