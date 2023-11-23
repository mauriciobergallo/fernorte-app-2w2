import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Pagination } from '../models/pagination';
import { DeilveryOrder } from '../models/deilvery-order';
import { DeliveryOrderPut } from '../models/delivery-order-put';
import { catchError, map } from 'rxjs';
import { DeilveryOrderDetails } from '../models/deilvery-order-details';

@Injectable({
  providedIn: 'root',
})
export class DeliverOrderService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'http://localhost:8081/delivery-orders';

  getDeliveryOrder(
    orderId: string,
    currentPage: number
  ): Observable<Pagination> {
    const url = `${this.apiBaseUrl}/${orderId}/${currentPage}`;
    return this.http.get<Pagination>(url);
  }

  getDeliveryOrderById(orderId: number): Observable<DeilveryOrder> {
    const url = `${this.apiBaseUrl}/${orderId}`;

    return this.http.get<DeilveryOrder>(url).pipe(
      map((data) => {
        const deliveryOrder = new DeilveryOrder();
        deliveryOrder.state = data.state;
        deliveryOrder.details = data.details.map((detail) => {
          const detailOrder = new DeilveryOrderDetails();
          detailOrder.product_id = detail.product_id;
          detailOrder.product_name = detail.product_name;
          detailOrder.state = detail.state;
          detailOrder.quantity = detail.quantity;
          detailOrder.delivered_quantity = detail.delivered_quantity;
          return detailOrder;
        });
        deliveryOrder.client = data.client;
        deliveryOrder.delivery_order_id = data.delivery_order_id;
        deliveryOrder.created_at = data.created_at;
        deliveryOrder.sale_order_id = data.sale_order_id;
        return deliveryOrder;
      })
    );
  }

  updateDeliveryOrderDetails(order: DeliveryOrderPut): Observable<any> {
    let credential = JSON.parse(localStorage.getItem('credentials') || 'N/N');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      delivered_by: credential.username,
      // Agrega más encabezados según sea necesario
    });
    const url = `${this.apiBaseUrl}`;
    return this.http.put(url, order, { headers }).pipe(
      catchError((error) => {
        console.error('Error al realizar la petición:', error);
        return error;
      })
    );
  }
}
