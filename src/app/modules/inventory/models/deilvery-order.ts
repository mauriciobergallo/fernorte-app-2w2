import { DeilveryOrderDetails } from "./deilvery-order-details";
import { Client } from "./Client";

export class DeilveryOrder {
    state: string = '';
    details: DeilveryOrderDetails[] = [];
    client : Client | null = null;
    delivery_order_id: number = 0;
    sale_order_id: number = 0;
    created_at: string = '';
}
