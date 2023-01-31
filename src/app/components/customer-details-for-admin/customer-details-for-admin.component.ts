import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-customer-details-for-admin',
  templateUrl: './customer-details-for-admin.component.html',
  styleUrls: ['./customer-details-for-admin.component.css']
})
export class CustomerDetailsForAdminComponent implements OnInit {

  customer: Customer = {} as Customer;

  constructor(private usersService: UsersService, private route: ActivatedRoute,
    private router: Router, private ordersService: OrdersService) {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.usersService.getCustomer(id).subscribe(res => this.customer = res);
    });
  }

  ngOnInit(): void {
  }

  goToOrderDetails(id: number) {
    this.router.navigate([`orders/${id}`]);
  }

  deleteOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe(
      res => {
        this.usersService.getCustomer(this.customer.customerId).subscribe(res => this.customer = res);
      },
      err => {
        alert(err.error);
      });
  }

  back() {
    this.router.navigate(['admin-homepage']);
  }
}
