import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaplyComponent } from './phaply.component';

describe('PhaplyComponent', () => {
  let component: PhaplyComponent;
  let fixture: ComponentFixture<PhaplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
