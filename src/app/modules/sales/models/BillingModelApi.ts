import { DetailBill } from "./DetailBillModel";
import { Payment } from "./PaymentModel";

export class BillModel {
    idBill?: number = 0;
    idSaleOrder?:number = 0;
    idSeller: number = 0;
    idClient: number = 0;
    vatCondition:string="";
    billType:string="";
    cae:string="";
    expirationDateCae: string = "";
    createdDate: string = "";
    totalPrice: number = 0;
    detailBill: DetailBill[] = [];
    payment:Payment[]=[];
}