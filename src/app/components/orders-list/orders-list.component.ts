import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService, private ordersService: OrdersService) {
    this.dataService.customer.subscribe(c => {
      this.customer = c;

      // if a new order was ordered by the user - the list of orders needs to be updated
      this.ordersService.getOrdersByCustomerId(this.customer.customerId).subscribe(res => {
        this.customer.orders = res;
        this.orders = res;
      });
    });

  }

  ngOnInit(): void {
  }

}
