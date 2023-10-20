import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "../models/IProduct";
import { Observable } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class ProductService {

   url = "http://localhost:8080/products" 

   constructor(private http: HttpClient) { }

   get(): Observable<IProduct[]> {
      const result = this.http.get<IProduct[]>(
         this.url+'/all'
      );
      return result;
   }
}