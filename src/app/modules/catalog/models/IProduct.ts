import { ICategory } from "./ICategory";

export interface IProduct {
    idProduct: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    unitOfMeasure: number;
    category: ICategory;
    urlImage: string;
}