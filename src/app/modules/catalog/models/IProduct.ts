import { ICategory } from "./ICategory";

export interface IProduct {
    idProduct: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    unitOfMeasure: string;
    category: ICategory;
    urlImage: string;
    userCreated: string
}

export interface IProductRequestEdit{
    idProduct: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    unitOfMeasure: string;
    idCategory: number;
    image: string;
    userCreated: string
}


