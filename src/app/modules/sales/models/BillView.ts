import {DetailBillView} from '../models/DetailBillView';
import { Payment } from './PaymentModel';

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
    payment: Payment [] = [];
    idSaleOrder: number = 0;
    detailBill: DetailBillView [] = [];




}
