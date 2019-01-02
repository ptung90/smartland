import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmanageComponent } from './usersmanage.component';

describe('UsersmanageComponent', () => {
  let component: UsersmanageComponent;
  let fixture: ComponentFixture<UsersmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
