import { Injectable } from "@angular/core";
import { IProduct } from "../models/IProduct";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private products: string = `${environment.production}products`;

   constructor(private requestResponseService: RequestResponseService) { }

   get(): Observable<IProduct[]> {
      return this.requestResponseService.makeGetRequest<IProduct[]>(this.products);
   }

   updateOrCreateProduct(product: any): Observable<IProduct> {
      return this.requestResponseService.makePutRequest<IProduct>(`${this.products}`, product);
   }
}