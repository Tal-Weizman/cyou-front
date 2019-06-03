import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevImageComponent } from './prev-image.component';

describe('PrevImageComponent', () => {
  let component: PrevImageComponent;
  let fixture: ComponentFixture<PrevImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
