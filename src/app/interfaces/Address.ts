import { Region } from "./Region";

export interface Address {
    addressId: number;
    region: Region;
    city: string;
    street: string;
    streetNo: number;
    entrance: string;
    apartmentNo: number;
    postal: number;
}