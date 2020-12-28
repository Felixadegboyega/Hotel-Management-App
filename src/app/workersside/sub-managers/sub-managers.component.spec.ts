import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubManagersComponent } from './sub-managers.component';

describe('SubManagersComponent', () => {
  let component: SubManagersComponent;
  let fixture: ComponentFixture<SubManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
