import { Injectable } from "@angular/core";
import { IProduct, IProductRequest } from "../models/IProduct";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private getProducts: string = `${environment.production}products/all`;
   private putProducts: string = `${environment.production}products/create-update`;

   constructor(private requestResponseService: RequestResponseService) { }

   get(): Observable<IProduct[]> {
      return this.requestResponseService.makeGetRequest<IProduct[]>(this.getProducts);
   }

   updateOrCreateProduct(product: IProductRequest): Observable<IProduct> {
      console.log(`${this.putProducts}`, product)
      return this.requestResponseService.makePutRequest<IProduct>(`${this.putProducts}`, product);
   }
}