  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainworkerComponent } from './mainworker.component';

describe('MainworkerComponent', () => {
  let component: MainworkerComponent;
  let fixture: ComponentFixture<MainworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
