import { ICategory } from "./ICategory";

export interface IProductCategory{
    idProduct: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    unitOfMeasure: string;
    category: ICategory;
    urlImage: string;
    userCreated:string;
    priceProduct:number;
    discount:number;
    isDeleted:boolean;
}
