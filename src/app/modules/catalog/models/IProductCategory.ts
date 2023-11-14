import { ICategory } from "./ICategory";

export interface IProductCategory{
    id_product: number;
    name: string;
    description: string;
    unit_price: number;
    stock_quantity: number;
    unit_of_measure: string;
    category: ICategory;
    url_image: string;
    user_created:string;
    price_product:number;
    discount:number;
}
