import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { DeilveryOrder } from '../../../models/deilvery-order';
import { Observable, switchMap } from 'rxjs';
import { DeliveryOrderPut } from '../../../models/delivery-order-put';
import { DeliveryOrderDetailPut } from '../../../models/delivery-order-detail-put';
import { DeilveryOrderDetails } from '../../../models/deilvery-order-details';

@Component({
  selector: 'fn-delivery-order-details',
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.css'],
})
export class DeliveryOrderDetailsComponent {
  orderId: number = 0;
  order: DeilveryOrder = new DeilveryOrder();

  constructor(
    private route: ActivatedRoute,
    private deliveryorderService: DeliverOrderService,
    private router: Router
  ) {}

  save() {
    if (confirm('¿Desea guardar la información?')) {
      const deliveryOrderPut = this.mapToDeliveryOrderPut();

      this.deliveryorderService
        .updateDeliveryOrderDetails(deliveryOrderPut)
        .pipe(
          switchMap(() => {
            return this.deliveryorderService.getDeliveryOrderById(this.orderId);
          })
        )
        .subscribe((orderData) => {
          this.order = orderData;
          console.log(orderData);
        });
    }
  }

  mapToDeliveryOrderPut(): DeliveryOrderPut {
    const deliveryOrderPut = new DeliveryOrderPut();
    deliveryOrderPut.delivery_order_id = this.order.delivery_order_id;

    deliveryOrderPut.details = this.order.details.map((detail) => {
      const detailPut = new DeliveryOrderDetailPut();
      detailPut.quantity = detail.quantity_delivery;
      detailPut.product_id = detail.product_id;
      return detailPut;
    });

    console.log(deliveryOrderPut);
    return deliveryOrderPut;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.orderId = +id;
        this.deliveryorderService
          .getDeliveryOrderById(this.orderId)
          .subscribe((orderData) => {
            this.order = orderData;
          });
      }
    });
  }

  getStatusText(state: string): string {
    switch (state) {
      case 'CREATED':
        return 'Creado';
      case 'PARTIALLY_DELIVERED':
        return 'Parcialmente entregado';
      case 'DELIVERED':
        return 'Entregado';
      case 'CANCELED':
        return 'Cancelado';
      default:
        return '';
    }
  }

  limitInputValue(event: any, maxValue: number) {
    const inputValue = parseFloat(event.target.value);
    if (inputValue > maxValue) {
      event.target.value = maxValue.toString();
    }
  }

  confirmCancellation() {
    if (confirm('¿Desea cancelar la acción?')) {
      this.router.navigate(['orders']);
    }
  }

  navigate() {
    this.router.navigate(['/orders']);
  }
  getTooltipText(state: string): string {
    switch (state) {
      case 'CREATED':
        return 'Estado: Creado';
      case 'PARTIALLY_DELIVERED':
        return 'Estado: Parcialmente entregado';
      case 'DELIVERED':
        return 'Estado: Entregado';
      case 'CANCELED':
        return 'Estado: Cancelado';
      default:
        return '';
    }
  }
}
