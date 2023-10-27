import { Injectable } from "@angular/core";
import {  IProductCategory } from "../models/IProductCategory";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { IProduct } from "../models/IProduct";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private products: string = `${environment.production}products`;
   private categories: string = `${environment.production}products/categories`;

   constructor(private requestResponseService: RequestResponseService) { }

   get(): Observable<IProductCategory[]> {
      return this.requestResponseService.makeGetRequest<IProductCategory[]>(this.products);
   }
   getById(id: number): Observable<IProductCategory> {
      return this.requestResponseService.makeGetRequest<IProduct>(`${this.products}/${id}`);
   }
   getProductsByCategory(id: number): Observable<IProductCategory[]> {
      return this.requestResponseService.makeGetRequest<IProductCategory[]>(`${this.categories}/${id}`);
   }
   put(product:any[]): Observable<IProduct[]> {
      return this.requestResponseService.makePutRequest<IProduct>(this.products, product);
   }
   delete(id:number , username:string): Observable<any> {
      return this.requestResponseService.makeDeleteRequest<any>(this.products + "/" + id + "?username=" + username);
   }
}