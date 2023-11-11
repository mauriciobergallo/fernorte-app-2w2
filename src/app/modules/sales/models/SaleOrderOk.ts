import { ProductOk } from "./ProductOk";

export class SaleOrderOk {
    idSaleOrder?: number = 0;
    idSeller: number = 0;
    idClient: number = 0;
    dateOfIssue: Date = new Date();
    dateOfExpiration: Date = new Date();
    stateSaleOrder: string = "";
    details : ProductOk[]=[];
}