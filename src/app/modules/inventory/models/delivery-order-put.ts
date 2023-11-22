import { DeliveryOrderDetailPut } from "./delivery-order-detail-put";

export class DeliveryOrderPut {
    delivery_order_id: number = 0;
    details : DeliveryOrderDetailPut[] = [];
}
