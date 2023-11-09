import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { ICategory } from "../models/ICategory";
import { HttpParams } from "@angular/common/http";

@Injectable({
   providedIn: 'root'
})
export class CategoryService {
   private categories: string = `${environment.production}categories`;

   constructor(private requestResponseService: RequestResponseService) { }
   
   get(
      page?: number,
      size?: number,
      sortBy?: string,
      sortDir?: string,
      name?: string,
      isDeleted: boolean = false,
   ): Observable<ICategory[]> {

      let params = new HttpParams();
      if (page) {
         params = params.set('page', (page - 1).toString());
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

      if (isDeleted) {
         params = params.set('isDeleted', isDeleted.toString());
      }else{
         params = params.set('isDeleted', 'false');
      }
      if (name) {
         params = params.set('name', name);
      }

      return this.requestResponseService.makeGetRequest<ICategory[]>(this.categories, { params });
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