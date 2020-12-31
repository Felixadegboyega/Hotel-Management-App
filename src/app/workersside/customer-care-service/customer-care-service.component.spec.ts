import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareServiceComponent } from './customer-care-service.component';

describe('CustomerCareServiceComponent', () => {
  let component: CustomerCareServiceComponent;
  let fixture: ComponentFixture<CustomerCareServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCareServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCareServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
