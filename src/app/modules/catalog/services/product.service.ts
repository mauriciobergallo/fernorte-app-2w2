import { Injectable } from "@angular/core";
import { IProductCategory } from "../models/IProductCategory";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { IProduct } from "../models/IProduct";
import { HttpParams } from "@angular/common/http";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private products: string = `${environment.production}products`;
   private categories: string = `${environment.production}products/categories`;

   constructor(private requestResponseService: RequestResponseService) { }

   get(page?: number, size?: number, sortBy?: string, sortDir?: string, isDeleted?: boolean): Observable<IProductCategory[]> {
      let params = new HttpParams();
      if (page) {
         params = params.set('page', page.toString());
      }

      if (size) {
         params = params.set('size', size.toString());
      }

      if (sortBy) {
         params = params.set('sortBy', sortBy);
      }

      if (sortDir) {
         params = params.set('sortDir', sortDir);
      }

      if (isDeleted !== undefined) {
         params = params.set('isDeleted', isDeleted.toString());
      }
      return this.requestResponseService.makeGetRequest<IProductCategory[]>(this.products, {params: params});
   }
   getById(id: number): Observable<IProductCategory> {
      return this.requestResponseService.makeGetRequest<IProduct>(`${this.products}/${id}`);
   }
   getProductsByCategory(id: number): Observable<IProductCategory[]> {
      return this.requestResponseService.makeGetRequest<IProductCategory[]>(`${this.categories}/${id}`);
   }
   put(product: IProduct): Observable<IProduct> {
      return this.requestResponseService.makePutRequest<IProduct>(this.products, product);
   }
   delete(id: number, username: string): Observable<any> {
      return this.requestResponseService.makeDeleteRequest<any>(this.products + "/" + id + "?username=" + username);
   }
}