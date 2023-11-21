import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseQuantityByProductId } from '../../../models/IResponseQuantityByProductId';

@Injectable({
  providedIn: 'root'
})
export class QuantityByProductIdService {

  private baseUrl: string = 'http://localhost:8084/quantity-products';

  constructor(private _http: HttpClient) {}


  getQuantityResponse(idProduct: number, quantity: number): Observable<IResponseQuantityByProductId> {
    const url = `${this.baseUrl}/products/${idProduct}/quantity/${quantity}`;
    return this._http.get<IResponseQuantityByProductId>(url);
    
  }
}
