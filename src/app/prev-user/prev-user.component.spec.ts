import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevUserComponent } from './prev-user.component';

describe('PrevUserComponent', () => {
  let component: PrevUserComponent;
  let fixture: ComponentFixture<PrevUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
