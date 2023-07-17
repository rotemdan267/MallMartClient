import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { DataService } from 'src/app/services/data.service';
import { OrderLine } from 'src/app/interfaces/OrderLine';
import { Order } from 'src/app/interfaces/Order';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnChanges {

  products: Product[] = [];
  productsForCarousel: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  cart: Order = {} as Order;
  isLoggedIn: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.allProducts.subscribe(p => {
      this.products = p;
    });
    this.dataService.cart.subscribe(c => this.cart = c);
    this.dataService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res.isLoggedIn;
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
      this.occupyProductsForCarousel();
  }

  addToCart(line: OrderLine) {
    line.order = this.cart;
    this.cart.orderLines.push(line);
    this.dataService.updateCart(this.cart);
  }

  occupyProductsForCarousel() {
    console.log(this.products.length);

    let count = 0;
    while (count < 9) {

      let productIndex = this.getRndInteger(0, this.products.length);
      if (this.productsForCarousel.length === 0) {
        this.productsForCarousel.push(productIndex);
        count++;
        continue;
      }

      let alreadyExitsInArr = false;
      for (const iterator of this.productsForCarousel) {
        if (iterator === productIndex) {
          alreadyExitsInArr = true;
          break;
        }
      }

      if (alreadyExitsInArr) {
        continue;
      }
      else {
        this.productsForCarousel.push(productIndex);
        count++;
        console.log(this.productsForCarousel);
      }
    }
  }

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
