import {DetailBillView} from '../models/DetailBillView';

export class BillView{    
    idBill: number = 0;
    idSeller: number = 0;
    firstNameSeller: string = "";
    lastNameSeller: string ="";
    idClient: number = 0;
    firstNameClient: string = "";
    lastNameClient: string = "";
    companyName: string = "";
    address: string = "";
    telephone: number = 0;
    email: string = "";
    vatCondition: string ="";
    billType: string = "";
    cae:string ="";	
    createdDate: string = "";
    expirationDateCae: string = "";
    totalPrice: number = 0;
    payment!: Payment;
    idSaleOrder: number = 0;
    detailBill: DetailBillView [] = [];




}
export class Payment{
    id:number = 0;
    paymenMetod!: PaymentMethod;
    surcharge: number = 0;
    payment: number = 0;
} 

export class PaymentMethod{
    idPaymentMethod: number = 0;
    paymentMethod: string = "";
    surcharge: number = 0;
}
