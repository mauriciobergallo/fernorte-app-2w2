import {Tax} from "./TaxModel"

export class DetailBill{
    id?:number=0;
    tax:Tax=new Tax;
    id_product:number=0;
    name_product:string="";
    quantity:number=0;
    unit:string="";
    tax_value:number=0;
    unitary_price:number=0;
    discount_amount:number=0; 
}
