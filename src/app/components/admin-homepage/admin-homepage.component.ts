import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/Order';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  goToCustomerList() {
    this.router.navigate([`customers-list`]);
  }

  goToFilteredProductsList(filterBy: string) {
    this.router.navigate([`products-list/${filterBy}`]);
  }

  logout() {
    let cart = {} as Order;
    cart.orderLines = [];
    this.dataService.updateCart(cart);
    this.dataService.logout();
    
    this.router.navigate(['']);
  }

}
