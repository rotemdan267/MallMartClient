import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  customer: Customer = {} as Customer;

  constructor(private dataService: DataService, private router: Router) {

    this.dataService.customer.subscribe(c => this.customer = c);
  }

  ngOnInit(): void {
  }

  goToOrders() {
    this.router.navigate(['orders']);
  }
  
  goToEdit() {
    this.router.navigate(['edit']);
  }

  goToEditDetails() {
    this.router.navigate(['edit-customer-details']);
  }

  logout() {
    let cart = {} as Order;
    cart.orderLines = [];
    this.dataService.updateCart(cart);
    this.dataService.logout();

    this.router.navigate(['']);
  }

}
