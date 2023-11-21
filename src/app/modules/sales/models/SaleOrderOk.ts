import { ProductOk } from "./ProductOk";

export class SaleOrderOk {
    idSaleOrder?: number = 0;
    idSeller: number = 0;
    idClient: number = 0;
    nameClient: string = "";
    nameSeller: string ="";
    address: string ="";
    telephone:string = "";
    companyName:string ="";
    email: string = "";
    dateOfIssue: number[]=[];
    dateOfExpiration!: number[];// de Date a String
    stateSaleOrder: string = "";
    details : ProductOk[]=[];
}