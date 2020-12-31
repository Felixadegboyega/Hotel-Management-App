import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewroomComponent } from './newroom.component';

describe('NewroomComponent', () => {
  let component: NewroomComponent;
  let fixture: ComponentFixture<NewroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
