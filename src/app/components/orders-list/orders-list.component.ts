import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { DataService } from 'src/app/services/data.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  customer: Customer = {} as Customer;

  constructor(private dataService: DataService, private ordersService: OrdersService, private router: Router) {
    this.dataService.customer.subscribe(c => {
      this.customer = c;
      this.orders = c.orders;
    });

  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['customer-page']);
  }

}
