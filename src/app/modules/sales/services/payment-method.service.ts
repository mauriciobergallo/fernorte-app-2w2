import { Injectable } from '@angular/core';
import { IPaymentMethod } from '../interfaces/ipayment-method';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = "http://localhost:8088/payment-methods";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private http: HttpClient) { }

  


  getPaymentMethods(): Observable<IPaymentMethod[]> {

    return this.http.get<IPaymentMethod[]>(url);
  }
  createPaymentMethod(payment: IPaymentMethod): Observable<IPaymentMethod> {
    console.log("payment service create payment: ", payment)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IPaymentMethod>(url, payment, { headers });
  }

  updatePaymentMethod(payment: IPaymentMethod):Observable<IPaymentMethod>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IPaymentMethod>(url, payment, { headers });
  }

}
