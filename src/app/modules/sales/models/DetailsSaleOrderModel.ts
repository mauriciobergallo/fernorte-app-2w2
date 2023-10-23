import { DetailsState } from "./DetailsState";
import { SaleOrderStates } from "./SalesOrderState";

export class DetailsSaleOrderModel {
    id_sale_order_details?: number = 0;
    id_sale_order?: number = 0;
    id_product: number = 0;
    quantity: number = 0;
    price: number = 0;
    state_sale_order_detail: DetailsState = DetailsState.CANCELLED;
}
