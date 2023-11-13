import { IProduct } from "./IProduct";

export interface IDiscount {
    idDiscount: number;
    product: IProduct;
    discountRate: number;
    startDate: string;
    endDate: string;
    isDeleted: boolean;
    user: string;
}