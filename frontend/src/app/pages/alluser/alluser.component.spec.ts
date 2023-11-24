import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserComponent } from './alluser.component';

describe('AlluserComponent', () => {
  let component: AlluserComponent;
  let fixture: ComponentFixture<AlluserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlluserComponent]
    });
    fixture = TestBed.createComponent(AlluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
