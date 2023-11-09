import { IProduct } from "./IProduct";

export interface IDiscount {
    id_discount: number;
    product: IProduct;
    discount_rate: number;
    start_date: string;
    end_date: string;
    is_deleted: boolean;
}