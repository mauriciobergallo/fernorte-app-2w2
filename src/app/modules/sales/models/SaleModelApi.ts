import { ProductApi } from "./ProductApi";

export class SaleOrderApi {
    id_sale_order?: number = 0;
    id_seller: number = 0;
    id_client: number = 0;
    first_name_client: string = "";
    last_name_client: string = "";
    company_name: string="";
    telephone: string ="";
    email: string ="";
    address: string = "";
    first_name_seller: string ="";
    last_name_seller: string ="";
    date_of_issue: number[] = [];
    date_of_expiration: number[] = [];
    state_sale_order: string = "";
    detail_sales_order : ProductApi[] = [];
}