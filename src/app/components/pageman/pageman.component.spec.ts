import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemanComponent } from './pageman.component';

describe('PagemanComponent', () => {
  let component: PagemanComponent;
  let fixture: ComponentFixture<PagemanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagemanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
