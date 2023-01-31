import { Address } from "./Address";

export interface Supplier {
    id: number;
    name: string;
    contactName: string;
    phone: string;
    email: string;
    address: Address;
}