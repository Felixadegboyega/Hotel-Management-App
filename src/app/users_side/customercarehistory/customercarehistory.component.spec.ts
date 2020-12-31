import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercarehistoryComponent } from './customercarehistory.component';

describe('CustomercarehistoryComponent', () => {
  let component: CustomercarehistoryComponent;
  let fixture: ComponentFixture<CustomercarehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercarehistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercarehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
