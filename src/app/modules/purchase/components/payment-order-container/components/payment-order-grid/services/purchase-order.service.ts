import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPurchaseOrder } from '../models/PurchaseOrder';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  url: string = 'http://localhost:8080/purchaseOrder/';

  constructor(private _http: HttpClient) {}

  getPurchaseOrder(): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url);
  }
  
  getPurchaseOrderTotals(): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url);
  }
  getUnpaidPurchaseOrders(): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url)
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) => {
          console.log(purchaseOrders)
          return purchaseOrders.filter(order => order.purchaseStatus==="ACCEPTED");
        })
      );
  }
}
