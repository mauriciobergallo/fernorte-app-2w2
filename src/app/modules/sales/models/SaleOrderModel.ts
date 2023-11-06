import { DetailsSaleOrderModel } from "./DetailsSaleOrderModel";

export class SaleOrderModel {
    id_sale_order?: number = 0;
    id_seller: number = 0;
    id_client: number = 0;
    date_of_issue: string = "";
    date_of_expiration: string = "";
    state_sale_order: string = "";
    detail_sales_order: DetailsSaleOrderModel[] = [];
}
