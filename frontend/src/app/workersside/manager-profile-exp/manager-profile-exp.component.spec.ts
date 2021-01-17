import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProfileExpComponent } from './manager-profile-exp.component';

describe('ManagerProfileExpComponent', () => {
  let component: ManagerProfileExpComponent;
  let fixture: ComponentFixture<ManagerProfileExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerProfileExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProfileExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
