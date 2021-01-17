import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServiceComponent } from './cleaning-service.component';

describe('CleaningServiceComponent', () => {
  let component: CleaningServiceComponent;
  let fixture: ComponentFixture<CleaningServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
