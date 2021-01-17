import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfoodComponent } from './newfood.component';

describe('NewfoodComponent', () => {
  let component: NewfoodComponent;
  let fixture: ComponentFixture<NewfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
