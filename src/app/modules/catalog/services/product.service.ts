import { Injectable } from "@angular/core";
import { IProduct } from "../models/IProduct";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private getProducts: string = `${environment.production}products/all`;

   constructor(private requestResponseService: RequestResponseService) { }

   get(): Observable<IProduct[]> {
      return this.requestResponseService.makeGetRequest<IProduct[]>(this.getProducts);
   }
}