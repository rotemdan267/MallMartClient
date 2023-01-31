import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/Order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = {} as Order;

  constructor(private ordersService: OrdersService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.ordersService.getOrder(id).subscribe(res => this.order = res);
    });
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate([`customers/${this.order.customer.customerId}`]);
  }
}
