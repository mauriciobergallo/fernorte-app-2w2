import { ICategory } from "./ICategory";

export interface IProductCategory{
    id_product: number;
    name: string;
    description: string;
    unit_Price: number;
    stock_Quantity: number;
    unit_Of_Measure: string;
    category: ICategory;
    image: string;
    user_created:string;
}
