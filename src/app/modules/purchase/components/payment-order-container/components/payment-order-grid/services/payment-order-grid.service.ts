import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPurchaseOrder } from '../models-payment-order-grid/IPurchaseOrderForGrid';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  url: string = 'http://localhost:5433/purchase-orders';

  constructor(private _http: HttpClient) {}

  // Propiedad para almacenar las órdenes de compra seleccionadas
  selectedPurchaseOrders: IPurchaseOrder[] = [];

  //Trae las ordenes de compra
  getPurchaseOrder(): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url);
  }
  //Trae las ordenes de compra que esten aceptadas y por id... de cuando seleccionas el combobox
  getUnpaidPurchaseOrdersBySupplier(supplierId: number): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url)
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) => {
          console.log(supplierId);
          return purchaseOrders.filter(order => order.supplierId.toString() === supplierId.toString());
        })
      );
  }
  //Trae las ordenes de compra que esten aceptadas. //por si la quieren usar
  getUnpaidPurchaseOrders(supplierId: number): Observable<IPurchaseOrder[]> {
    return this._http.get<IPurchaseOrder[]>(this.url)
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) => {
          console.log(supplierId);
          return purchaseOrders.filter(order => order.purchaseStatus === "ACCEPTED");
        })
      );
  }
    // Agregar una orden de compra a la lista de seleccionadas
    addSelectedPurchaseOrder(order: IPurchaseOrder) {
      this.selectedPurchaseOrders.push(order);
    }
    removeSelectedPurchaseOrder(order: IPurchaseOrder): void {
      const index = this.selectedPurchaseOrders.findIndex(o => o.id === order.id);

      if (index !== -1) {
        this.selectedPurchaseOrders.splice(index, 1);
      }
    }
  
    // obtiene las ordenes de compra seleccionadas para pagar. esto deberian usar me parece el resto que utilice estas ordenes
    getSelectedPurchaseOrders(): IPurchaseOrder[] {
      return this.selectedPurchaseOrders;
    }
  
}