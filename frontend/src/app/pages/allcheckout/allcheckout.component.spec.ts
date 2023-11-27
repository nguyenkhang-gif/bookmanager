import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcheckoutComponent } from './allcheckout.component';

describe('AllcheckoutComponent', () => {
  let component: AllcheckoutComponent;
  let fixture: ComponentFixture<AllcheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcheckoutComponent]
    });
    fixture = TestBed.createComponent(AllcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
