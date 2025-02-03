import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDateStructAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { Order } from 'src/app/interfaces/Order';
import { DataService } from 'src/app/services/data.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // model: NgbDateStruct = {} as NgbDateStruct;
  date: { year: number; month: number } = { year: 0, month: 0 };
  minDate: NgbDateStruct = {} as NgbDateStruct;
  maxDate: NgbDateStruct = {} as NgbDateStruct;
  isDisabled: any = {};

  customer: Customer = {} as Customer;
  cart: Order = {} as Order;

  constructor(private dataService: DataService, private ordersService: OrdersService,
    private calendar: NgbCalendar, private router: Router) {

    this.dataService.cart.subscribe(c => this.cart = c);
    this.dataService.customer.subscribe(c => this.customer = c);

    this.isDisabled = (date: NgbDate) => this.calendar.getWeekday(date) == 6;

    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 2);

    this.minDate.day = todayDate.getDate();
    this.minDate.month = todayDate.getMonth() + 1;
    this.minDate.year = todayDate.getFullYear();

    this.maxDate.day = this.minDate.day;
    this.maxDate.month = this.minDate.month;
    this.maxDate.year = this.minDate.year + 1;
  }

  ngOnInit(): void {
  }

  finishOrder(form: any) {

    this.cart.dateOrdered = new Date();
    this.cart.dueTimeFirst = new Date(form.datepicker.year, form.datepicker.month - 1,
      form.datepicker.day, Number(form.hourpicker), 0, 0, 0);
    this.cart.dueTimeLast = new Date(form.datepicker.year, form.datepicker.month - 1,
      form.datepicker.day, Number(form.hourpicker) + 4, 0, 0, 0);
    this.cart.comment = form.comments;

    this.ordersService.postOrder(this.cart).subscribe(
      res => {
        this.cart = {} as Order;
        this.cart.orderLines = [];
        this.dataService.updateCart(this.cart);

        this.ordersService.getOrdersByCustomerId(this.customer.customerId).subscribe(res => {
          this.customer.orders = res;
        });

        this.router.navigate(['products'], { queryParams: { 'orderSucceeded': true } });
      },
      err => {
        alert(err.error);
      });
  }

  back() {
    this.router.navigate(['cart']);
  }
}
