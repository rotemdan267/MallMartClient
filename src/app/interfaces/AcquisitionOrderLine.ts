import { AcquisitionOrder } from "./AcquisitionOrder";
import { Product } from "./Product";

export interface AcquisitionOrderLine {
    id: number;
    acquisitionOrder: AcquisitionOrder;
    product: Product;
    unitPrice: number;
    quantity: number;
}