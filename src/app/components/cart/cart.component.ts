import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { OrderLine } from 'src/app/interfaces/OrderLine';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  customer: Customer = {} as Customer;
  cart: Order = {} as Order;

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.cart.subscribe(c => this.cart = c);
    this.dataService.customer.subscribe(c => this.customer = c);
  }

  ngOnInit(): void {
    this.setTotalPrice();    
  }

  setTotalPrice() {
    let price = 0;
    for (const line of this.cart.orderLines) {
      price += (line.unitPrice * line.quantity);
    }
    this.cart.totalPrice = price;
  }

  onQuantityChange(num: number, line: OrderLine): void {
    line.quantity += num;
    this.setTotalPrice();
  }

  removeFromCart(line: OrderLine) {

    this.cart.orderLines = this.cart.orderLines.filter(l => l !== line);
    this.setTotalPrice();

  }
  clearCart() {
    this.cart.orderLines = [];
  }

  checkout() {
    this.customer.orders = [];
    this.cart.customer = this.customer;
    this.dataService.updateCart(this.cart);
    this.router.navigate(['checkout']);
  }

  back() {
    this.router.navigate(['products']);
  }
}
