import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { SortOptions } from 'src/app/enums/SortOptions';
import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/Order';
import { OrderLine } from 'src/app/interfaces/OrderLine';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  cart: Order = {} as Order;

  SortEnum = SortOptions;
  sortOption: SortOptions = SortOptions.CATEGORY;

  categorySelected: boolean = true;
  priceSelected: boolean = false;

  classes: any = {
    category: true,
    priceLowToHigh: false,
    priceHighToLow: false,
    name: false
  };

  page: number = 1;  // Current page for "pagination" mechanism
  cardsPerPage: number = 12;
  sizeOptions: any = [6, 12, 18, 24];

  orderSucceededMessage: string = '';

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {

    this.dataService.products.subscribe(p => {
      this.page = 1;       // When products' list changes, I want the user to see 
      // the new list from it's start. So I restart current page to 1
      this.products = p;
    });
    this.dataService.cart.subscribe(c => this.cart = c);
  }

  ngOnInit(): void {
    if (Boolean(this.activatedRoute.snapshot.queryParamMap.get('orderSucceeded'))) {

      this.orderSucceededMessage = 'Your order has completed successfully!';
      setTimeout(() => this.orderSucceededMessage = '', 15000);
    }
  }
  
  onDataChange(event: any) {
    this.page = event;
  }

  onSizeChange(event: any) {
    this.cardsPerPage = event.target.value;
    this.page = 1;
  }

  addToCart(line: OrderLine) {
    this.cart.orderLines.push(line);
    this.dataService.updateCart(this.cart);
  }

  handleSort(sort: SortOptions) {

    this.page = 1; // Restart current page to 1

    switch (sort) {

      case SortOptions.CATEGORY:

        for (const key in this.classes) {
          this.classes[key] = false;
        }
        this.classes.category = true;

        this.products = this.products.sort((a, b) => {
          if (a.category.id < b.category.id) {
            return -1;
          }
          if (a.category.id > b.category.id) {
            return 1;
          }
          return 0;
        });

        break;

      case SortOptions.PRICELowToHigh:

        for (const key in this.classes) {
          this.classes[key] = false;
        }
        this.classes.priceLowToHigh = true;

        this.products = this.products.sort((a, b) => {
          if (a.unitPrice < b.unitPrice) {
            return -1;
          }
          if (a.unitPrice > b.unitPrice) {
            return 1;
          }
          return 0;
        });

        break;

      case SortOptions.PRICEHighToLow:

        for (const key in this.classes) {
          this.classes[key] = false;
        }
        this.classes.priceHighToLow = true;

        this.products = this.products.sort((a, b) => {
          if (a.unitPrice < b.unitPrice) {
            return 1;
          }
          if (a.unitPrice > b.unitPrice) {
            return -1;
          }
          return 0;
        });

        break;

      case SortOptions.NAME:

        for (const key in this.classes) {
          this.classes[key] = false;
        }
        this.classes.name = true;

        this.products = this.products.sort((a, b) => {
          let aName = a.name.toLowerCase();
          let bName = b.name.toLowerCase();
          if (aName < bName) {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }
          return 0;
        });

        break;

      default:
        break;
    }
  }
}
