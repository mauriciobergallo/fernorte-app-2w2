import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/iCustomer';
import { ClientProvider } from './clientProvider';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private client!: ICustomer;
  
  constructor(private clientsProvide:ClientProvider) { }  
  
  getClient(): ICustomer {
    this.clientsProvide.getlistClients().subscribe((res) => {
      this.client = res;
      return this.client;
    });
    return this.client;
  }
}
