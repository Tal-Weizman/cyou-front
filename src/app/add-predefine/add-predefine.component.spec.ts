import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPredefineComponent } from './add-predefine.component';

describe('AddPredefineComponent', () => {
  let component: AddPredefineComponent;
  let fixture: ComponentFixture<AddPredefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPredefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPredefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
