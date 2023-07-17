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
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.css']
})
export class EditCustomerDetailsComponent implements OnInit {

  postalValid: Boolean = true;
  regions: Region[] = [];
  regionNames: string[] = [];
  customer: Customer = {} as Customer;
  address: Address = {} as Address;
  paymentMethods: string[] = [PaymentMethod.Paypal, PaymentMethod.Visa, PaymentMethod.Mastercard, PaymentMethod.Bitcoin];

  editMode: Boolean = false;
  buttonText: string = '';

  form = {
    region: {} as Region,
    city: '',
    street: '',
    streetNo: 0,
    entrance: '',
    apartmentNumber: 0,
    postal: 0,
    paymentMethod: '',
    paymentDetails: ''
  };

  constructor(private addressesService: AddressesService, private dataService: DataService,
    private usersService: UsersService, private router: Router) {

    this.addressesService.getRegions().subscribe(res => {
      this.regions = res;

      for (const iterator of this.regions) {
        this.regionNames.push(iterator.name);
      }
    });

    this.dataService.customer.subscribe(c => {
      this.customer = c;
      this.address.addressId = this.customer.addressId;

      let paymentMethod = '';
      switch (this.customer.paymentMethod) {
        case 0:
          paymentMethod = "Paypal";
          break;

        case 1:
          paymentMethod = "Visa";
          break;

        case 2:
          paymentMethod = "Mastercard";
          break;

        case 3:
          paymentMethod = "Bitcoin";
          break;
      }

      this.form = {
        region: this.customer.address.region,
        city: this.customer.address.city,
        street: this.customer.address.street,
        streetNo: this.customer.address.streetNo,
        entrance: this.customer.address.entrance,
        apartmentNumber: this.customer.address.apartmentNo,
        postal: this.customer.address.postal,
        paymentMethod: paymentMethod,
        paymentDetails: this.customer.paymentDetails
      };
    });
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['customer-page']);
  }

  validateForm(form: any): Boolean {
    let formIsValid;

    if (form.postal == "" || form.postal == null) {
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

  save(form: any) {

    console.log(form);

    if (!this.validateForm(form)) {
      return;
    }

    for (const iterator of this.regions) {
      if (iterator.name == form.region) {
        this.address.region = iterator;
        this.address.regionId = iterator.id;
        break;
      }
    }

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

    this.addressesService.putAddress(this.address.addressId, this.address).subscribe(
      result => {
        console.log("put address result", result);

        this.customer.address = this.address;

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

        this.customer.orders = [];

        this.usersService.patchCustomer(this.customer.customerId, this.customer).subscribe(
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