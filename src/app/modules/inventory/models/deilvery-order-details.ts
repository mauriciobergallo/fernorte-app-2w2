export class DeilveryOrderDetails {
  quantity: number = 0;
  state: string = '';
  product_name: string = '';
  delivered_quantity: number = 0;
  product_id: number = 0;
  quantity_delivery: number = this.quantity - this.delivered_quantity;
}
