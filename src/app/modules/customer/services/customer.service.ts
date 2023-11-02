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


getCustomerById(customerId: any): Observable<any>{
  return this.http.get<CustomerRequest>(this.apiUrl + "/" + customerId);
} 

postCustomer(customer: CustomerRequest): Observable<any>{
    return this.http.post<CustomerRequest>(this.apiUrl, customer );
  
  }

  putCustomer(customer: any): Observable<any>{
    debugger;
    let id = customer.id_customer;
    let customerOk= customer;
    customerOk.id_document_type=1;
    return this.http.put<CustomerRequest>(this.apiUrl + "/" + id, customerOk );
  
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
