import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaninghistoryComponent } from './cleaninghistory.component';

describe('CleaninghistoryComponent', () => {
  let component: CleaninghistoryComponent;
  let fixture: ComponentFixture<CleaninghistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaninghistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaninghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
