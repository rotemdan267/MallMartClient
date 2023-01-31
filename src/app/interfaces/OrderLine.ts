import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderLine {
    id: number;
    order: Order;
    product: Product;
    unitPrice: number;
    quantity: number;
}