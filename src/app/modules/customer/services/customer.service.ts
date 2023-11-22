import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerRequest } from '../models/customer-request';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8089/customers';

  private customerUpdatedSubject = new BehaviorSubject<void>(undefined);

  //Post
  createCustomer(customer: CustomerRequest) {
    console.log('CUSTOMER', customer);
    alert(JSON.stringify(customer));
  }

  getCustomerById(customerId: any): Observable<any> {
    return this.http.get<CustomerRequest>(this.apiUrl + '/' + customerId);
  }

  postCustomer(customer: CustomerRequest): Observable<any> {
    return this.http.post<CustomerRequest>(this.apiUrl, customer);
  }

  putCustumer(customer: any, idCustomer: number): Observable<any> {
    return this.http.put<CustomerRequest>(
      this.apiUrl + '/' + idCustomer,
      customer
    );
  }

  clearFields(customer: any) {
    for (const prop in customer) {
      if (customer.hasOwnProperty(prop)) {
        delete customer[prop];
      }
    }
  }

  getAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl +'/');
  }

  getEmployeeUpdatedObservable(): Observable<void> {
    return this.customerUpdatedSubject.asObservable();
  }

  notifyEmployeeUpdated() {
    this.customerUpdatedSubject.next();
  }
  
}
