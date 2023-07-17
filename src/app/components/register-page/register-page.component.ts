import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  buttonText: string = '';

  usernameValid: Boolean = true;
  usernameAvailable: Boolean = true;
  passwordValid: Boolean = true;
  firstNameValid: Boolean = true;
  lastNameValid: Boolean = true;

  form = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  placeholder = '';
  editMode: Boolean = false;
  originalUsername: string = '';

  tooltipMessage: string = "Back to Homepage";

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService,
    private userImagesService: UserImagesService, private addressesService: AddressesService,
    private dataService: DataService) {

    this.userImagesService.getUserImage(13).subscribe(res => {
      this.userImage = res;
    });

    this.usersService.getUsers().subscribe(res => this.users = res);

    this.addressesService.getAddress(9).subscribe(res => this.address = res);

    if (this.route.routeConfig?.path == 'register') {
      this.buttonText = 'Register';
    }
    if (this.route.routeConfig?.path == 'edit') {

      this.editMode = true;
      this.buttonText = 'Save Changes';
      this.placeholder = 'Type only if you want to change your password';
      this.tooltipMessage = 'Back';

      this.dataService.customer.subscribe(c => {
        this.customer = c;
        this.originalUsername = c.user.username;
        this.form = {
          username: this.customer.user.username,
          firstName: this.customer.user.firstName,
          lastName: this.customer.user.lastName,
          email: this.customer.user.email,
          phone: this.customer.user.phone
        };
      });

    }
  }

  ngOnInit(): void {
  }

  back() {

    if (this.editMode) {
      this.router.navigate(['customer-page']);
    }
    else {
      this.router.navigate(['']);
    }
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
      if (this.editMode && form.username == this.originalUsername)
        this.usernameAvailable = true;

      else {
        this.usernameAvailable = true;
        for (const user of this.users) {
          if (user.username == form.username) {
            this.usernameAvailable = false;
            formIsValid = false;
            break;
          }
        }
      }
    }

    if (this.editMode && form.password.length == 0)
      this.passwordValid = true;

    else {

      if (form.password.length < 6) {
        this.passwordValid = false;
        formIsValid = false;
      }
      else {
        this.passwordValid = true;
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

  submit(form: any) {

    if (!this.validateForm(form)) {
      return;
    }

    if (this.editMode)
      this.edit(form);
    else
      this.register(form);
  }

  edit(form: any) {

    this.user.id = this.customer.user.id;
    this.user.username = form.username;
    this.user.hashedPassword = form.password;
    this.user.firstName = form.firstName;
    this.user.lastName = form.lastName;
    this.user.email = form.email;
    this.user.phone = form.phone;
    this.user.imageId = this.userImage.id;
    this.user.image = this.userImage;
    this.user.authorization = "Customer";

    this.usersService.putUser(this.customer.user.id, this.user).subscribe(
      res => {
        this.router.navigate(['customer-page']);
      },
      err => {
        console.log(err.error);

        alert(err.error);
      });
  }

  register(form: any) {

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