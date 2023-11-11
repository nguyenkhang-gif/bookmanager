import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleSectionComponent } from './bundle-section.component';

describe('BundleSectionComponent', () => {
  let component: BundleSectionComponent;
  let fixture: ComponentFixture<BundleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BundleSectionComponent]
    });
    fixture = TestBed.createComponent(BundleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
