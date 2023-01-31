import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from 'src/app/enums/PaymentMethod';
import { Address } from 'src/app/interfaces/Address';
import { Customer } from 'src/app/interfaces/Customer';
import { User } from 'src/app/interfaces/User';
import { UserImage } from 'src/app/interfaces/UserImage';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { AddressesService } from 'src/app/services/addresses.service';
import { DataService } from 'src/app/services/data.service';
import { UserImagesService } from 'src/app/services/user-images.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: User = {} as User;
  users: User[] = [];
  customer: Customer = {} as Customer;
  address: Address = {} as Address;
  userImage: UserImage = {} as UserImage;
  passwordConfirmed: Boolean = true;

  usernameValid: Boolean = true;
  usernameAvailable: Boolean = true;
  firstNameValid: Boolean = true;
  lastNameValid: Boolean = true;

  constructor(private router: Router, private usersService: UsersService,
    private userImagesService: UserImagesService, private addressesService: AddressesService,
    private dataService: DataService) {
    this.userImagesService.getUserImage(13).subscribe(res => {
      this.userImage = res;
    });

    this.usersService.getUsers().subscribe(res => this.users = res);

    this.addressesService.getAddress(9).subscribe(res => this.address = res);
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['']);
  }

  validateForm(form: any): Boolean {
    let formIsValid = true;

    let regex: RegExp = new RegExp("^[a-zA-Z][a-zA-Z0-9]+$");
    if (!regex.test(form.username)) {
      this.usernameValid = false;
      formIsValid = false;
    }
    else {
      this.usernameValid = true;
      this.usernameAvailable = true;
      for (const user of this.users) {
        if (user.username == form.username) {
          this.usernameAvailable = false;
          formIsValid = false;
          break;
        }
      }
    }

    if (!(form.password == form.passwordConfirm)) {
      this.passwordConfirmed = false;
      formIsValid = false;
    }
    else {
      this.passwordConfirmed = true;
    }

    regex = new RegExp("^^[A-Z][a-zA-Z ]*[a-zA-Z]$");
    if (!regex.test(form.firstName)) {
      this.firstNameValid = false;
      formIsValid = false;
    }
    else {
      this.firstNameValid = true;
    }

    if (!regex.test(form.lastName)) {
      this.lastNameValid = false;
      formIsValid = false;
    }
    else {
      this.lastNameValid = true;
    }

    return formIsValid;
  }

  register(form: any) {

    if (!this.validateForm(form)) {
      return;
    }

    this.user.username = form.username;
    this.user.hashedPassword = form.password;
    this.user.firstName = form.firstName;
    this.user.lastName = form.lastName;
    this.user.email = form.email;
    this.user.phone = form.phone;
    this.user.image = this.userImage;
    this.user.authorization = "Customer";

    this.usersService.postUser(this.user).subscribe(
      result => {
        this.customer.user = result;
        this.address.region.employees = [];
        this.customer.address = this.address;
        this.customer.orders = [];
        this.customer.paymentMethod = 4;
        this.customer.paymentDetails = '';

        this.usersService.postCustomer(this.customer).subscribe(
          res => {
            let userLogin: UserLogin = {
              username: form.username,
              password: form.password
            };
            this.usersService.login(userLogin).subscribe(result => {
              this.dataService.login(result, true);
            },
              error => {
                alert(error.error);
              });
          },
          err => {
            alert(err.error);
          });
      },
      error => {
        alert(error.error);
      });



  }
}