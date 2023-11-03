import { DeilveryOrderDetails } from "./deilvery-order-details";

export class DeilveryOrder {
    state: string = '';
    details: DeilveryOrderDetails[] = [];
    delivery_order_id: number = 0;
    created_at: string = '';
}
