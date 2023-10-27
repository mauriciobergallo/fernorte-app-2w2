import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/iCustomer';
import { ClientProvider } from './clientProvider';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private listClient: ICustomer[] = []
  constructor(private clientsProvide:ClientProvider) { }
  getListClients(): ICustomer[] {
    this.clientsProvide.getlistClients().subscribe((res) => {
      this.listClient = res;
      return this.listClient;
    });
    return this.listClient;
  }
}
