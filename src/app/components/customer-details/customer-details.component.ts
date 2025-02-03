import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from 'src/app/enums/PaymentMethod';
import { Address } from 'src/app/interfaces/Address';
import { Customer } from 'src/app/interfaces/Customer';
import { Region } from 'src/app/interfaces/Region';
import { AddressesService } from 'src/app/services/addresses.service';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  postalValid: Boolean = true;
  regions: Region[] = [];
  customer: Customer = {} as Customer;
  address: Address = {} as Address;
  paymentMethods: string[] = [PaymentMethod.Paypal, PaymentMethod.Visa, PaymentMethod.Mastercard, PaymentMethod.Bitcoin];

  constructor(private addressesService: AddressesService, private dataService: DataService,
    private usersService: UsersService, private router: Router) {

    this.addressesService.getRegions().subscribe(res => this.regions = res);
    this.dataService.customer.subscribe(c => this.customer = c);
  }

  ngOnInit(): void {
  }

  validateForm(form: any): Boolean {
    let formIsValid;

    if (form.postal == "") {
      this.postalValid = true;
      return true;
    }

    let postal = Number(form.postal);

    if ((postal >= 10000 && postal <= 99999) || (postal >= 1000000 && postal <= 9999999)) {
      formIsValid = true;
      this.postalValid = true;
    }
    else {
      formIsValid = false;
      this.postalValid = false;
    }

    return formIsValid;
  }

  register(form: any) {

    if (!this.validateForm(form)) {
      return;
    }

    this.address.region = form.region;
    this.address.region.employees = [];
    this.address.city = form.city;
    this.address.street = form.street;
    this.address.streetNo = Number(form.streetNo);
    if (form.entrance != "") {
      this.address.entrance = form.entrance;
    }
    if (form.apartmentNumber != "") {
      this.address.apartmentNo = Number(form.apartmentNumber);
    }
    if (form.postal != "") {
      this.address.postal = Number(form.postal);
    }

    this.addressesService.postAddress(this.address).subscribe(
      result => {
        this.customer.address = result;
        this.customer.addressId = result.addressId;

        switch (form.paymentMethod) {
          case "Paypal":
            this.customer.paymentMethod = 0;
            break;

          case "Visa":
            this.customer.paymentMethod = 1;
            break;

          case "Mastercard":
            this.customer.paymentMethod = 2;
            break;

          case "Bitcoin":
            this.customer.paymentMethod = 3;
            break;
        }

        this.customer.paymentDetails = form.paymentDetails;

        this.usersService.putCustomer(this.customer.customerId, this.customer).subscribe(
          result => {            
            this.dataService.updateCustomer(this.customer);
            this.router.navigate(['products']);
          },
          error => {
            alert(error.error);
          }
        );
      },
      error => {
        alert(error.error);
      });
  }
}
