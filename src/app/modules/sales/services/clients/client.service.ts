import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/iCustomer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private client!: ICustomer;
  
  constructor(private http: HttpClient) { }

  private URL = environment.urlClientsBase;

  getClient(): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.URL + `/customers/3`);
    
  }
}
