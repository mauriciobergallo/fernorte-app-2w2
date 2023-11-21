import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISupplier } from '../../../models/ISuppliers';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaymentFlow, PaymentOrderDetailResponse, PaymentOrderDetailsRequest, PaymentOrderRequest } from '../../../models/IPaymentOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderServiceService {

  supplier: ISupplier[] = [];
  url: string = 'http://localhost:8005/suppliers';
  urlPurchases:string ='http://localhost:8004/payment-orders';
  paymentOrderFlow: BehaviorSubject<PaymentFlow> = new BehaviorSubject<PaymentFlow>('GRID');
  PaymentOrderDetails:PaymentOrderDetailsRequest[]=[];
  


  constructor(private _http: HttpClient) { 
    
  }

  getSupplier(id: number):Observable<ISupplier>{
    return this._http.get<ISupplier>(`${this.url}/${id}`)
  }

  getPaymentOrderFlow() {
    return this.paymentOrderFlow.asObservable()
  }

  setPaymentOrderFlow(flow: PaymentFlow): void {
    this.paymentOrderFlow.next(flow)
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





}
