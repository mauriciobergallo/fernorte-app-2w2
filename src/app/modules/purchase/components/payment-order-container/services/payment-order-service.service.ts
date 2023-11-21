import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISupplier } from '../../../models/ISuppliers';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';
import { PaymentFlow, PaymentOrderDetailResponse, PaymentOrderDetailsRequest, PaymentOrderRequest, PaymentOrderResponse } from '../../../models/IPaymentOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderServiceService {

  supplier: ISupplier[] = [];
  url: string = 'http://localhost:5433/suppliers';
  urlPurchases: string ='http://localhost:5434/paymentOrder';
  paymentOrderFlow: BehaviorSubject<PaymentFlow> = new BehaviorSubject<PaymentFlow>('GRID');
  PaymentOrderDetails:PaymentOrderDetailsRequest[]=[];

  paymentOrdersList = new BehaviorSubject<PaymentOrderResponse[]>([]);
  filteredPaymentOrdersList = new BehaviorSubject<PaymentOrderResponse[]>([]);
  
  constructor(private _http: HttpClient) {}

  // PAYMENT ORDER
  getPaymentOrders(): void {
    this._http
      .get<PaymentOrderResponse[]>(`${this.urlPurchases}/`)
      .pipe(
        tap((paymentOrders: PaymentOrderResponse[]) => {
          this.paymentOrdersList.next(paymentOrders);
          this.filteredPaymentOrdersList.next(paymentOrders);
        })
      )
      .subscribe();
  }

  getFilteredPaymentOrdersList() {
    return this.filteredPaymentOrdersList.asObservable();
  }
  setFilteredPaymentOrdersList(payments: PaymentOrderResponse[]): void {
    this.filteredPaymentOrdersList.next(payments);
  }
  deletePaymentOrder(orderId: number): Observable<number> {
    const deleteUrl = `${this.urlPurchases}delete/${orderId}`;
    return this._http.delete(deleteUrl)
    .pipe(
      tap(() => {
        console.log(`Purchase order ${orderId} deleted.`);
      }),
      map(() => 1),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error deleting purchase order ${orderId}: ${error.message}`);
        return of(0); // Return 0 in case of an error
      })
    );
  }

  setPaymentOrderDetails(details:PaymentOrderDetailsRequest):void{
    this.PaymentOrderDetails.push(details);
  }
  clearPaymentOrderDetails(){
    this.PaymentOrderDetails = [];
  }
  getPaymentOrderDetails(){
    return this.PaymentOrderDetails;
  }
  createPaymentOrder(paymentOrder: PaymentOrderRequest): Observable<any> {
    return this._http.post<any>(this.urlPurchases, paymentOrder);
  }

  // SUPPLIER
  getSupplier(id: number):Observable<ISupplier>{
    return this._http.get<ISupplier>(`${this.url}/${id}`)
  }

  // PAYMENT SCREEN FLOW
  getPaymentOrderFlow() {
    return this.paymentOrderFlow.asObservable()
  }
  setPaymentOrderFlow(flow: PaymentFlow): void {
    this.paymentOrderFlow.next(flow)
  }

}
