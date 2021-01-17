import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfileExpComponent } from './hr-profile-exp.component';

describe('HrProfileExpComponent', () => {
  let component: HrProfileExpComponent;
  let fixture: ComponentFixture<HrProfileExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrProfileExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfileExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
