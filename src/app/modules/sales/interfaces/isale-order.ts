import { IDetailsSaleOrder } from "./idetails-sale-order";

export interface ISaleOrder {
    id_sale_order?: number;
    id_seller: number;
    id_client: number;
    date_of_issue: string;
    date_of_expiration: string;
    state_sale_order: string;
    detail_sales_order: IDetailsSaleOrder[];
}
