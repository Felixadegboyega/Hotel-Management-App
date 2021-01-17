import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginComponent } from './staff-login.component';

describe('StaffLoginComponent', () => {
  let component: StaffLoginComponent;
  let fixture: ComponentFixture<StaffLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
