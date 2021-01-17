import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCleaningComponent } from './request-cleaning.component';

describe('RequestCleaningComponent', () => {
  let component: RequestCleaningComponent;
  let fixture: ComponentFixture<RequestCleaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCleaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
