import { AcquisitionOrderLine } from "./AcquisitionOrderLine";
import { Employee } from "./Employee";
import { Supplier } from "./Supplier";

export interface AcquisitionOrder {
    acquisitionOrderId: number;
    supplier: Supplier;
    dateOrdered: Date;
    dueTimeFirst: Date;
    dueTimeLast: Date;
    arrivalTime: Date;
    employee: Employee;
    totalPrice: number;
    pricePaid: number;
    isOrderDone: boolean,
    comment: string,
    orderLines: AcquisitionOrderLine[]
}