import { ProductApi } from "./ProductApi";

export class SaleOrderApi {
    id_sale_order?: number = 0;
    id_seller: number = 0;
    id_client: number = 0;
    date_of_issue: number[] = [];
    date_of_expiration: number[] = [];
    state_sale_order: string = "";
    detail_sales_order : ProductApi[] = [];
}