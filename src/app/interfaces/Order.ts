import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { OrderLine } from "./OrderLine";

export interface Order {
    orderId: number;
    customer: Customer;
    dateOrdered: Date;
    dueTimeFirst: Date;
    dueTimeLast: Date;
    arrivalTime: Date;
    employee?: Employee;
    totalPrice: number;
    pricePaid: number;
    isPaid: boolean,
    isOrderDone: boolean,
    comment: string,
    orderLines: OrderLine[]
}