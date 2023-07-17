import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { OrderLine } from 'src/app/interfaces/OrderLine';
import { Product } from 'src/app/interfaces/Product';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnChanges {

  tooltipMessage = 'Add to cart';
  category: Category = {} as Category;
  @Input() product: Product = {} as Product;
  @Output() addToCart = new EventEmitter<OrderLine>();
  productRating: number = 0;
  isLoggedIn = false;
  authorization: string = '';

  constructor(private router: Router, private dataService: DataService) {
    this.dataService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res.isLoggedIn;
      this.authorization = res.authorization;
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.productRating = this.product.rating;
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
    line.quantity = 1;
    
    this.addToCart.emit(line);
    this.tooltipMessage = 'Item added successfully!'
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

  getImage() {
    let path = '../../../assets/images/';

    if (this.product.id > 20) {
      path += 'Placeholder.png';
    }
    else {
      path += this.product.id.toString() + '.jpg';
    }

    return path;
  }

  onRateChange(event: any) {

    let newAvg = (this.product.rating * this.product.numOfRaters) + event;
    this.product.numOfRaters++;
    this.product.rating = newAvg / this.product.numOfRaters;
    this.productRating = this.product.rating;
  }
}
