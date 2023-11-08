import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { ICategory } from "../models/ICategory";

@Injectable({
   providedIn: 'root'
})
export class CategoryService {
   private categories: string = `${environment.production}categories`;

   constructor(private requestResponseService: RequestResponseService) { }
   
   get(): Observable<ICategory[]> {
      return this.requestResponseService.makeGetRequest<ICategory[]>(this.categories);
   }
   getById(id: number): Observable<ICategory> {
      return this.requestResponseService.makeGetRequest<ICategory>(`${this.categories}/${id}`);
   }
   put(category:ICategory): Observable<ICategory> {
      return this.requestResponseService.makePutRequest<ICategory>(this.categories,category);
   }	
   delete(id: number, username: string): Observable<any> {
      return this.requestResponseService.makeDeleteRequest<any>(
         this.categories + '/' + id + '?username=' + username
      );
   }
}