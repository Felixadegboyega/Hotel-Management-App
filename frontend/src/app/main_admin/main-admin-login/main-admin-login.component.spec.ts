import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminLoginComponent } from './main-admin-login.component';

describe('MainAdminLoginComponent', () => {
  let component: MainAdminLoginComponent;
  let fixture: ComponentFixture<MainAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
