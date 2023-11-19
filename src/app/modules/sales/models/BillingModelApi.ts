import { DetailBill } from "./DetailBillModel";
import { Payment } from "./PaymentModel";

export class BillModel {
    id_bill?: number = 0;
    address:string="";
    id_sale_order?: number = 0;
    id_seller: number = 0;
    name_seller: string = "";
    id_client: number = 0;
    first_name: string = "";
    las_name: string="";
    company_name:string="";
    telephone:number=0;
    email:string="";
    vat_condition: string = "";
    bill_type: string = "";
    cae: string = "";
    expiration_date_cae: number[] = [];
    created_date: number[] = [];
    total_price: number = 0;
    detail_bill: DetailBill[] = [];
    payments: Payment[] = [];
}
