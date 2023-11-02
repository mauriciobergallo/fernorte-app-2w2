import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocationInfoProduct } from '../../models/ilocation-info-product';
import { IStorageAvailability } from '../../models/istorage-availability';
import { IticketStorage } from '../../models/iticket-storage';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}

  private apiLocationUrl = 'http://localhost:8080/locations'
  private apiTicketsUrl = 'http://localhost:8080'


  getProductByCode(productId: number): Observable<ILocationInfoProduct> {
    return this.http.get<ILocationInfoProduct>(`${this.apiLocationUrl}/products?product_id=${productId}`);
  }

  getProductByName(productName: string): Observable<ILocationInfoProduct> {
    return this.http.get<ILocationInfoProduct>(`${this.apiLocationUrl}/product/by-name?name=${productName}`);
  }

  getStorageAvailability(productId: number, quantity: number): Observable<IStorageAvailability> {
    return this.http.get<IStorageAvailability>(`${this.apiLocationUrl}/products/${productId}?quantity=${quantity}`);
  }
  createStorageTicket(ticketStorage: IticketStorage): Observable<any> {
    return this.http.post(`${this.apiTicketsUrl}/storage-tickets`, ticketStorage);
  }
}
