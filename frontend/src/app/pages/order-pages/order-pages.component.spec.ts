import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPagesComponent } from './order-pages.component';

describe('OrderPagesComponent', () => {
  let component: OrderPagesComponent;
  let fixture: ComponentFixture<OrderPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPagesComponent]
    });
    fixture = TestBed.createComponent(OrderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
