import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcommentComponent } from './allcomment.component';

describe('AllcommentComponent', () => {
  let component: AllcommentComponent;
  let fixture: ComponentFixture<AllcommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcommentComponent]
    });
    fixture = TestBed.createComponent(AllcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
