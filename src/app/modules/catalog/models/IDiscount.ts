import { IProduct } from "./IProduct";

export interface IDiscount {
    idDiscount: number;
    product: IProduct;
    discountRate: number;
    startDate: Date;
    endDate: Date;
}
