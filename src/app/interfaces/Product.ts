import { Category } from "./Category";

export interface Product {
    id: number;
    name: string;
    category: Category;
    price: number;
    unitsInStock: number;
    desc: string;
    image: string;
    rating: number;
    numOfRaters: number;
}