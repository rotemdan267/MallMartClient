import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private usersService: UsersService, private router: Router, private dataService: DataService) {

    this.usersService.getCustomers().subscribe(
      res => {
        this.customers = res;
      });
  }

  ngOnInit(): void {
  }

  goToCustomerDetails(id: number) {
    this.router.navigate([`customers/${id}`]);
  }

  logout() {
    let cart = {} as Order;
    cart.orderLines = [];
    this.dataService.updateCart(cart);
    this.dataService.logout();
    
    this.router.navigate(['']);
  }

}
