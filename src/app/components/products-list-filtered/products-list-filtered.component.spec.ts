import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListFilteredComponent } from './products-list-filtered.component';

describe('ProductsListFilteredComponent', () => {
  let component: ProductsListFilteredComponent;
  let fixture: ComponentFixture<ProductsListFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListFilteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
