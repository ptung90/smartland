import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyguiComponent } from './kygui.component';

describe('KyguiComponent', () => {
  let component: KyguiComponent;
  let fixture: ComponentFixture<KyguiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyguiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyguiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
