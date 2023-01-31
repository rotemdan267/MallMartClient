import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsForAdminComponent } from './customer-details-for-admin.component';

describe('CustomerDetailsForAdminComponent', () => {
  let component: CustomerDetailsForAdminComponent;
  let fixture: ComponentFixture<CustomerDetailsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsForAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
