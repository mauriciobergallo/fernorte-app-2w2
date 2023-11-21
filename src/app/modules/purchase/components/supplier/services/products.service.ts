import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductSupplierResponse, ISupplier, ISupplierPrice } from '../models/ISuppliers';
import { Observable, Subject } from 'rxjs';

interface IProductSupplier {
  products: IProduct[]
}


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string =
    'http://localhost:8085/products';
  urlSupplier: string = 'http://localhost:8085/product-by-supplier';
  urlSupplierPrice: string = "http://localhost:8085/product-by-supplier/supplier"
  products: IProduct[] = [];

  selectedProduct: number = 0;

  selectedProductPrice: number = 0;

  constructor(private _http: HttpClient) {}

  private productCreated = new Subject<void>();

  productCreated$ = this.productCreated.asObservable();

  notifyProductCreated() {
    this.productCreated.next();
  }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.url);
  }

  getProductsBySupplier(id: number): Observable<IProductSupplier[]> {
    const params = new HttpParams().set('supplier-id', id.toString());
    return this._http.get<IProductSupplier[]>(this.urlSupplier, { params });
  }

  getSuppliersOfProducts(id: number): Observable<IProductSupplierResponse> {
    const params = new HttpParams().set('id_producto', id.toString());
    return this._http.get<IProductSupplierResponse>(this.urlSupplierPrice, { params });
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
    const params = new HttpParams()
      .set('product-id', productId.toString())
      .set('supplier-id', supplierId.toString());

    return this._http.delete<any>(this.urlSupplier, { params });
  }
}
// 