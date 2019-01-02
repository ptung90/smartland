import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannermanComponent } from './bannerman.component';

describe('BannermanComponent', () => {
  let component: BannermanComponent;
  let fixture: ComponentFixture<BannermanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannermanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
