import { Component } from '@angular/core';
import { IOrderDetail } from '../../models/order-detail.interface';

@Component({
  selector: 'fn-reception-orders',
  templateUrl: './reception-orders.component.html',
  styleUrls: ['./reception-orders.component.css'],
})
export class ReceptionOrdersComponent {
  details: IOrderDetail[] = [];
  actualDetail: IOrderDetail = {
    name: '',
    quantity: 0,
    deliveryDate: new Date(),
    deliveryTime: '',
  };
}
