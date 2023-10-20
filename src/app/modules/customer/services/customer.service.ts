import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRequest } from '../models/customer-request';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

//Post
createCustomer(customer: CustomerRequest){
  console.log("CUSTOMER", customer)
  alert(JSON.stringify(customer))
                                 
}

postCustomer(customer: CustomerRequest): Observable<any>{
  return this.http.post("URL", customer) //Petición HTTP Post para crear empleado

}



clearFields(customer: any){
  for (const prop in customer) {
    if (customer.hasOwnProperty(prop)) {
      delete customer[prop];
    }
  }

}

}
