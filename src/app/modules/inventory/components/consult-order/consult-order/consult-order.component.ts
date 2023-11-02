import { Component } from '@angular/core';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { DeilveryOrder } from '../../../models/deilvery-order';

@Component({
  selector: 'fn-consult-order',
  templateUrl: './consult-order.component.html',
  styleUrls: ['./consult-order.component.css']
})
export class ConsultOrderComponent {
  orderId: number = 0;
  deliveryOrder: DeilveryOrder | null = null;
  constructor(private deliveryorderService: DeliverOrderService) {}

  search()
  {
    this.deliveryorderService.getDeliveryOrder(this.orderId).subscribe(
      (result) => {
        this.deliveryOrder = result;
      },
      (error) => {
        alert('Orden No encontrada');
        this.deliveryOrder = null; 
      }
    );
  }
}
