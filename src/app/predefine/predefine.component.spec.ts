import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefineComponent } from './predefine.component';

describe('PredefineComponent', () => {
  let component: PredefineComponent;
  let fixture: ComponentFixture<PredefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
