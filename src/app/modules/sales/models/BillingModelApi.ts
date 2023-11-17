import { DetailBill } from "./DetailBillModel";
import { Payment } from "./PaymentModel";

export class BillModel {
    idBill?: number = 0;
    address:string="";
    idSaleOrder?: number = 0;
    idSeller: number = 0;
    nameSeller: string = "";
    idClient: number = 0;
    firstName: string = "";
    lasName: string="";
    companyName:string="";
    telephone:number=0;
    email:string="";
    vatCondition: string = "";
    billType: string = "";
    cae: string = "";
    expirationDateCae: number[] = [];
    createdDate: number[] = [];
    totalPrice: number = 0;
    detailBill: DetailBill[] = [];
    payments: Payment[] = [];
}
