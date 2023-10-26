import { IProduct } from "./IProduct";

export interface IDiscount {
    id_discount: number;
    product: IProduct;
    discount_rate: number;
    start_date: Date;
    end_date: Date;
}