import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Isupplier } from '../../shared/interfaces/isupplier';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaymentFlow } from '../../../models/IPaymentOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderServiceService {

  supplier: Isupplier[] = [];
  url: string = 'http://localhost:8085/suppliers';
  paymentOrderFlow: BehaviorSubject<PaymentFlow> = new BehaviorSubject<PaymentFlow>('GRID');


  constructor(private _http: HttpClient) { }

  getSupplier(id: number):Observable<Isupplier>{
    return this._http.get<Isupplier>(`${this.url}/${id}`)
  }

  getPaymentOrderFlow() {
    return this.paymentOrderFlow.asObservable()
  }

  setPaymentOrderFlow(flow: PaymentFlow): void {
    this.paymentOrderFlow.next(flow)
  }



}
