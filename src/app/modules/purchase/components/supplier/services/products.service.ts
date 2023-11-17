import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProduct2, IProductBySupplierDTO, ISupplier, ISupplierAndProduct } from '../../../models/ISuppliers';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string =
    'https://my-json-server.typicode.com/114537-Bothner-Eric/firma-productos/productos';
  urlSupplier: string = 'http://localhost:8085/product-by-supplier';
  urlall:string='http://localhost:8080/product_by_supplier/all';

  products: IProduct[] = [];

  selectedProduct: number = 0;

  constructor(private _http: HttpClient) {}

  private productCreated = new Subject<void>();

  productCreated$ = this.productCreated.asObservable();

  notifyProductCreated() {
    this.productCreated.next();
  }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.url);
  }
  getProductsBySupplier(id: number): Observable<IProduct2[]> {
    const params = new HttpParams().set('supplier-id', id.toString());
    return this._http.get<IProduct2[]>(this.urlSupplier, { params });
  }
  getProductsAndSupplier(): Observable<ISupplierAndProduct[]> {
    return this._http.get<ISupplierAndProduct[]>(this.urlall);
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
      active: true
    };
    return this._http.post<any>(this.urlSupplier, postObject);
  }

  deleteProduct(supplierId: number, productId: number): Observable<any> {
    const params = new HttpParams()
      .set('id_product', productId.toString())
      .set('id_supplier', supplierId.toString());

    return this._http.delete<any>(this.urlSupplier, { params });
  }
}
