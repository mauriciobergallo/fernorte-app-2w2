import { ICategory } from "./ICategory";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    unitOfMeasure: string;
    category: ICategory;
    urlImage: string;
}
