import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminComponentComponent } from './home-admin-component.component';

describe('HomeAdminComponentComponent', () => {
  let component: HomeAdminComponentComponent;
  let fixture: ComponentFixture<HomeAdminComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminComponentComponent]
    });
    fixture = TestBed.createComponent(HomeAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
