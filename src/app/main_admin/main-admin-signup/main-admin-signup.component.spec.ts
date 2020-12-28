import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminSignupComponent } from './main-admin-signup.component';

describe('MainAdminSignupComponent', () => {
  let component: MainAdminSignupComponent;
  let fixture: ComponentFixture<MainAdminSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdminSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdminSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
