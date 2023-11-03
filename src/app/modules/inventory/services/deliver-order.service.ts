import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeilveryOrder } from '../models/deilvery-order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeliverOrderService {

  constructor(private http: HttpClient) {}
  
  private apiBaseUrl = 'http://localhost:8080/delivery-orders'

  getDeliveryOrder(orderId: number): Observable<DeilveryOrder> {
    const url = `${this.apiBaseUrl}/${orderId}`;
    return this.http.get<DeilveryOrder>(url);
  }
}
