import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRequest } from '../models/customer-request';
import { Observable } from 'rxjs';
import { CustomerActResponse } from '../models/customer-response';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8089/customers"

  //Post
  createCustomer(customer: CustomerRequest){
    console.log("CUSTOMER", customer)
    alert(JSON.stringify(customer))
                                  
  }

  postCustomer(customer: CustomerRequest): Observable<any>{
      return this.http.post<CustomerRequest>(this.apiUrl, customer );
    
    }



  clearFields(customer: any){
    for (const prop in customer) {
      if (customer.hasOwnProperty(prop)) {
        delete customer[prop];
      }
    }

  }

  deleteCustomer(id: number): Observable<string> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<string>(url);
  }

  activateCustomer(id: number): Observable<CustomerActResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<CustomerActResponse>(url, null);
  }

  getAllCustomers(): Observable<CustomerActResponse[]> {
    return this.http.get<CustomerActResponse[]>(`${this.apiUrl}/all`);
  }

}
