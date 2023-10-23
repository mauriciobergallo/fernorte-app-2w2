import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //private product: IProduct;
  private baseUrlByCode: string =
    'http://localhost:8080/locations/product/by-code';
  private baseUrlByName: string =
    'http://localhost:8080/locations/product/by-name';
  constructor(private client: HttpClient) {}

  getProduct(product: string): Observable<IProduct> {
    if (isNaN(parseInt(product))) {
      return this.client.get<IProduct>(this.baseUrlByName + '?name=' + product);
    } else {
      return this.client.get<IProduct>(this.baseUrlByCode + '?code=' + product);
    }
  }
}
