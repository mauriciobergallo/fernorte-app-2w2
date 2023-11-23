import { Component, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { DeilveryOrder } from '../../../models/deilvery-order';
import { Observable, switchMap } from 'rxjs';
import { DeliveryOrderPut } from '../../../models/delivery-order-put';
import { DeliveryOrderDetailPut } from '../../../models/delivery-order-detail-put';
import { DeilveryOrderDetails } from '../../../models/deilvery-order-details';
import Swal from 'sweetalert2';
import { ILocationInfoProduct } from '../../../models/ILocationInfoProduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryOrdersMockService } from '../../../services/delivery-order-mock.service';
@Component({
  selector: 'fn-delivery-order-details',
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.css'],
})
export class DeliveryOrderDetailsComponent {
  orderId: number = 0;
  order: DeilveryOrder = new DeilveryOrder();
  loading: boolean = false;
  locationInfo: ILocationInfoProduct = {
    location_id: 0,
    category_name: '',
    product_name: '',
    capacityRemaining: 0,
    measure_unit: '',
    max_capacity: 0,
    location: {
      id: 0,
      zone: '',
      section: '',
      space: '',
    },
    quantity: 0,
  };
  @ViewChild('myModal') myModal: any;
  constructor(
    private route: ActivatedRoute,
    private deliveryorderService: DeliverOrderService,
    private router: Router,
    private mockservice: DeliveryOrdersMockService,
    private modalService: NgbModal
  ) {}

  save() {
    this.loading = true;
    const deliveryOrderPut = this.mapToDeliveryOrderPut();
    console.log('ORDEN');
    console.log(deliveryOrderPut);
    setTimeout(() => {
      this.mockservice.updateOrder(deliveryOrderPut);
      this.loading = false;

      Swal.fire({
        icon: 'success',
        title: '¡Carga completada!',
        text: 'La orden se ha actualizado correctamente.',
      });
    }, 2000);
    /*
      this.deliveryorderService
        .updateDeliveryOrderDetails(deliveryOrderPut)
        .pipe(
          switchMap(() => {
            return this.deliveryorderService.getDeliveryOrderById(this.orderId);
          })
        )
        .subscribe((orderData) => {
          this.order = orderData;
          console.log('DELIVERY ORDER UPDATED');
          console.log(orderData);
          this.loading = false;
        });*/
  }

  mapToDeliveryOrderPut(): DeliveryOrderPut {
    const deliveryOrderPut = new DeliveryOrderPut();
    deliveryOrderPut.delivery_order_id = this.order.delivery_order_id;

    deliveryOrderPut.details = this.order.details.map((detail) => {
      const detailPut = new DeliveryOrderDetailPut();
      detailPut.quantity = detail.delivered_quantity;
      detailPut.product_id = detail.product_id;
      return detailPut;
    });

    return deliveryOrderPut;
  }
  private getIdFromRouteSnapshot(
    routeSnapshot: ActivatedRouteSnapshot
  ): string | null {
    return routeSnapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.loading = false;
    const id = this.getIdFromRouteSnapshot(this.route.snapshot);
    var order = this.mockservice.getById(Number(id));
    if (order) {
      this.order = order;
    }
    console.log(this.order);
    /*this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.orderId = +id;
        this.deliveryorderService
          .getDeliveryOrderById(this.orderId)
          .subscribe((orderData) => {
            this.order = orderData;
            console.log(this.order);
            this.loading = false;
          });
      }
    });*/
  }

  cargarModal(productNmae: string) {
    const foundLocation =
      this.mockservice.getLocationByProductName(productNmae);
    console.log(foundLocation);
    if (foundLocation !== undefined) {
      this.locationInfo = foundLocation;
    }
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

  confirmCancellation(): void {
    Swal.fire({
      title: '¿Desea volver?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6C757D',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['inventory', 'orders']);
      }
    });
  }

  navigate() {
    this.router.navigate(['inventory', 'orders']);
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

  confirmSave(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción guardará la orden. ¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6C757D',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.save();
      }
    });
  }
}
