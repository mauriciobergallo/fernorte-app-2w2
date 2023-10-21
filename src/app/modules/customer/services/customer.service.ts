import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRequest } from '../models/customer-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8085/customers"
                   


//Post
createCustomer(customer: CustomerRequest){

  console.log("CUSTOMER", customer)
  alert(JSON.stringify(customer))
                                 
}

postCustomer(customer: CustomerRequest): Observable<any>{
debugger
  return this.http.post<CustomerRequest>(this.apiUrl, customer );

}



clearFields(customer: any){
  for (const prop in customer) {
    if (customer.hasOwnProperty(prop)) {
      delete customer[prop];
    }
  }

}

}