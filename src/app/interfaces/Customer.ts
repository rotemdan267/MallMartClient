import { Address } from "./Address";
import { Order } from "./Order";
import { User } from "./User";

export interface Customer {
    customerId: number;
    address: Address;
    addressId: number;
    user: User;
    paymentMethod: number;
    paymentDetails: string;
    orders: Order[];
}