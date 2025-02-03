import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

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

  back() {
    this.router.navigate(['admin-homepage']);
  }

}
