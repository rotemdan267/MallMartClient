import { Injectable, OnInit } from '@angular/core';
import { Product } from '../interfaces/Product';
import { ProductsService } from './products.service';
import { Order } from '../interfaces/Order';
import { OrderLine } from '../interfaces/OrderLine';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../interfaces/Category';
import { Customer } from '../interfaces/Customer';
import { Employee } from '../interfaces/Employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categoriesArr: Category[] = [];
  categoriesBS = new BehaviorSubject(this.categoriesArr);
  categories = this.categoriesBS.asObservable();

  productsArr: Product[] = [];
  productsBS = new BehaviorSubject(this.productsArr);
  products = this.productsBS.asObservable();

  productsList: Product[] = [];
  allProductsBS = new BehaviorSubject(this.productsList);
  allProducts = this.allProductsBS.asObservable();  // the list saved in "productsBS" 
  // changes throughout the app's lifetime but "searchbar" component, for 
  // example, needs the whole list as it comes from DB, so I saved it separetely

  employee1: Employee = {} as Employee;
  customer1: any = {};
  lines: OrderLine[] = [];

  cartOrder: Order = {
    orderId: 0,
    customer: this.customer1,
    dateOrdered: new Date(),
    dueTimeFirst: new Date(),
    dueTimeLast: new Date(),
    arrivalTime: new Date(),
    totalPrice: 0,
    pricePaid: 0,
    isPaid: false,
    isOrderDone: false,
    comment: '',
    orderLines: this.lines
  };

  cartBS = new BehaviorSubject(this.cartOrder);
  cart = this.cartBS.asObservable();

  customerBS = new BehaviorSubject(this.customer1);
  customer = this.customerBS.asObservable();

  employeeBS = new BehaviorSubject(this.employee1);
  employee = this.employeeBS.asObservable();

  username: string = "Guest";

  isLoggedInVariable = false;
  isLoggedInBS = new BehaviorSubject({ isLoggedIn: this.isLoggedInVariable, username: this.username, authorization: "" });
  isLoggedIn = this.isLoggedInBS.asObservable();

  jwtToken: string = "";
  jwtBS = new BehaviorSubject(this.jwtToken);
  jwt = this.jwtBS.asObservable();

  constructor(private productsService: ProductsService, private router: Router) {

    this.productsService.getProducts().subscribe((res) => {
      this.updateProducts(res);
      this.updateAllProducts(res);
    });
  }

  updateProducts(products: Product[]) {
    this.productsBS.next(products);
  }

  updateAllProducts(products: Product[]) {
    this.allProductsBS.next(products);
  }

  updateCart(order: Order) {
    this.cartBS.next(order);
  }

  updateCustomer(customer: Customer) {
    this.customerBS.next(customer);
    this.isLoggedInBS.next({ isLoggedIn: true, username: customer.user.username, authorization: "Customer" });
  }

  updateEmployee(employee: Employee) {
    this.employeeBS.next(employee);
    this.isLoggedInBS.next({ isLoggedIn: true, username: employee.user.username, authorization: "Manager" });
  }

  login(result: any, hasToCompleteRegistration: Boolean) {

    this.jwtBS.next(result.jwt);

    if (result.employee == -1) {  // That means the user is not an employee - so he is a customer
      this.updateCustomer(result.customer);

      if (hasToCompleteRegistration)
        this.router.navigate(['customer-details']);
      else
        this.router.navigate(['products']);
    }

    if (result.customer == -1) { // That means the user is not a customer - so he is an employee
      this.updateEmployee(result.employee);
      this.router.navigate(['admin-homepage']);
    }
  }

  logout() {

    let customer = {} as Customer;
    this.customerBS.next(customer);

    let employee = {} as Employee;
    this.employeeBS.next(employee);
    
    this.isLoggedInBS.next({ isLoggedIn: false, username: "Guest", authorization: "" });
  }
}