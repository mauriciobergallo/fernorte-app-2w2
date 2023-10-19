import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/ISuppliers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:8080/products';
  urlSupplier: string = 'http://localhost:8080/product_by_supplier';

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.url);
  }

  getProductsBySupplier(id: number): Observable<IProduct[]> {
    const params = new HttpParams().set('id_supplier', id.toString());
    return this._http.get<IProduct[]>(this.urlSupplier, { params });
  }
}
