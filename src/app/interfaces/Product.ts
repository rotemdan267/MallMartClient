import { Category } from "./Category";

export interface Product {
    id: number;
    name: string;
    category: Category;
    unitPrice: number;
    unitsInStock: number;
    description: string;
    imageLink: string;
    rating: number;
    numOfRaters: number;
}