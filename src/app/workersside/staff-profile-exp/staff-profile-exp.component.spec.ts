import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileExpComponent } from './staff-profile-exp.component';

describe('StaffProfileExpComponent', () => {
  let component: StaffProfileExpComponent;
  let fixture: ComponentFixture<StaffProfileExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProfileExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
