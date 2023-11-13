import {Tax} from "./TaxModel"

export class DetailBill{
    id?:number=0;
    tax:Tax=new Tax;
    idProduct:number=0;
    quantity:number=0;
    unit:string="";
    unitaryPrice:number=0;
    discountAmount:number=0; 
}
