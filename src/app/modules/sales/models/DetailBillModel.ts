import {Tax} from "./TaxModel"

export class DetailBill{
    id?:number=0;
    tax:Tax=new Tax;
    idProduct:number=0;
    nameProduct:string="";
    quantity:number=0;
    unit:string="";
    taxValue:number=0;
    unitaryPrice:number=0;
    discountAmount:number=0; 
}
