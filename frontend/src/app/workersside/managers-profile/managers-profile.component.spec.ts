import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersProfileComponent } from './managers-profile.component';

describe('ManagersProfileComponent', () => {
  let component: ManagersProfileComponent;
  let fixture: ComponentFixture<ManagersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagersProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
