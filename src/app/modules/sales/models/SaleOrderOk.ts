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
    dateOfIssue: Date = new Date();
    dateOfExpiration!: Date;// de Date a String
    stateSaleOrder: string = "";
    details : ProductOk[]=[];
}