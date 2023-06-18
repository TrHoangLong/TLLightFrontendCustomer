import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistDialogComponent } from './order-hist-dialog.component';

describe('OrderHistDialogComponent', () => {
  let component: OrderHistDialogComponent;
  let fixture: ComponentFixture<OrderHistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
