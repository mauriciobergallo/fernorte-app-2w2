import { Injectable } from '@angular/core';
import { IPaymentMethod } from '../interfaces/ipayment-method';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private http: HttpClient) { }



  getPaymentMethods(): Observable<IPaymentMethod[]> {
    const url = 'http://localhost:8080/bill/payment-methods'; 
    return this.http.get<IPaymentMethod[]>(url);
  }
  createPaymentMethod(payment: IPaymentMethod): Observable<IPaymentMethod> {
    const url = 'http://localhost:8080/bill/payment-methods/create-paymentmethods'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IPaymentMethod>(url, payment, { headers });
  }


}
