import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { Category } from 'src/app/interfaces/Category';
import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/Order';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderLine } from 'src/app/interfaces/OrderLine';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  products: Product[] = [];
  product: Product = {} as Product;
  category: Category = {} as Category;
  cart: Order = {} as Order;
  productRating: number = 0;

  successMessage = '';

  quantity: number = 1;

  isLoggedIn = false;
  authorization: string = '';

  @Output() addToCart = new EventEmitter<OrderLine>();

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {

    this.dataService.allProducts.subscribe(p => {
      this.products = p;
      this.route.params.subscribe((params: Params) => {

        let id = params['id'];
        for (const iterator of this.products) {
          if (iterator.id == id) {
            this.product = iterator;
            this.productRating = this.product.rating;
            this.category = iterator.category;
            break;
          }
        }
      });
    });
    this.dataService.cart.subscribe(c => this.cart = c);
    this.dataService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res.isLoggedIn;
      this.authorization = res.authorization;
    });
  }

  ngOnInit(): void {
  }

  onQuantityChange(num: number): void {
    this.quantity += num;
  }

  addProductToCart() {

    if (!this.isLoggedIn) {
      this.router.navigate(['login'], { queryParams: { 'ynli': true } }); // ynli = you not loggen in
      return;
    }
    else if (!(this.authorization == "Customer")) {
      alert("Log in as a customer to shop");
      return;
    }

    let line: OrderLine = {} as OrderLine;
    line.product = this.product;
    line.unitPrice = this.product.unitPrice;
    line.quantity = this.quantity;

    this.cart.orderLines.push(line);
    this.dataService.updateCart(this.cart);

    this.successMessage = 'Item added to your cart successfully';
    setTimeout(() => this.successMessage = '', 5000);
  }

  onBuy() {

    if (!this.isLoggedIn) {
      this.router.navigate(['login'], { queryParams: { 'ynli': true } }); // ynli = you not loggen in
      return;
    }
    else if (!(this.authorization == "Customer")) {
      alert("Log in as a customer to shop");
      return;
    }

    this.addProductToCart();
    this.router.navigate(['cart']);
  }

  back() {
    this.router.navigate(['products']);
  }

  onRateChange(event: any) {
    let newAvg = (this.product.rating * this.product.numOfRaters) + event;
    this.product.numOfRaters++;
    this.product.rating = newAvg / this.product.numOfRaters;
    this.productRating = this.product.rating;
  }
}
