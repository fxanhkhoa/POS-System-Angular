import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFillInfoComponent } from './user-fill-info.component';

describe('UserFillInfoComponent', () => {
  let component: UserFillInfoComponent;
  let fixture: ComponentFixture<UserFillInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFillInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
