import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesmanageComponent } from './pagesmanage.component';

describe('PagesmanageComponent', () => {
  let component: PagesmanageComponent;
  let fixture: ComponentFixture<PagesmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
