import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProduct2 } from '../../../models/ISuppliers';
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

  getProductsBySupplier(id: number): Observable<IProduct2[]> {
    const params = new HttpParams().set('id_supplier', id.toString());
    return this._http.get<IProduct2[]>(this.urlSupplier, { params });
  }

  addProduct(
    supplierId: number,
    productId: number,
    price: number,
    observations: string
  ): Observable<any> {
    const postObject: any = {
      supplierId: supplierId,
      productId: productId,
      price: parseInt(price.toString()),
      observations: observations,
    };
    return this._http.post<any>(this.urlSupplier, postObject);
  }

  deleteProduct(supplierId: number, productId: number): Observable<any> {
    const params = new HttpParams().set('id_product', productId.toString()).set('id_supplier', supplierId.toString());

    return this._http.delete<any>(this.urlSupplier, { params });
  }
}
