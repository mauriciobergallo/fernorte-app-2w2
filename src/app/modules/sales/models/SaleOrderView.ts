import {DetailSaleOrderView} from '../models/DetailSaleOrderView'
export class SaleOrderView{    
    id_seller: number = 0;
    first_name_seller: string = "";
    last_name_seller: string ="";
    id_client: number = 0;
    first_name_client: string = "";
    last_name_client: string = "";
    company_name: string = "";
    address: string = "";
    telephone: number = 0;
    email: string = "";	
    date_of_issue: string = "";
    date_of_expiration: string = "";
    state_sale_order: string = "";
    detail_sales_order: DetailSaleOrderView [] = [];

    id_sale_order: number = 0;


}
