import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { RequestResponseService } from "./requestResponse.service";
import { ICategory } from "../models/ICategory";
import { HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

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
      isDeleted?: boolean,
      name?: string,
   ): Observable<{ categories: ICategory[]; totalItems: number; }> {
      let params = new HttpParams();
      if (page) params = params.append('page', (page - 1).toString());
      if (size) params = params.append('size', size.toString());
      if (sortBy) params = params.append('sortBy', sortBy);
      if (sortDir) params = params.append('sortDir', sortDir);
      if (isDeleted) params = params.append('isDeleted', isDeleted.toString());
      if (name) params = params.append('name', name);

      return this.requestResponseService.makeGetRequest<{ categories: ICategory[]; totalItems: number; }>(this.categories, { params: params })
         .pipe(
            map((response: any) => {
               const categories = response.categories;
               return {
                  categories: categories.map((category: any) => ({
                     idCategory: category.id_category,
                     name: category.name,
                     description: category.description,
                     isDeleted: category.is_deleted,
                  })),
                  totalItems: response.length
               };
            })
         );
   }
   getById(id: number): Observable<ICategory> {
      return this.requestResponseService.makeGetRequest<ICategory>(`${this.categories}/${id}`);
   }

   put(category: ICategory): Observable<ICategory> {
      const categoryApi = {
         id_category: category.idCategory,
         name: category.name,
         description: category.description,
         is_deleted: category.isDeleted
      }
      return this.requestResponseService.makePutRequest<ICategory>(this.categories, categoryApi);
   }
   delete(id: number, username: string): Observable<any> {
      return this.requestResponseService.makeDeleteRequest<any>(
         this.categories + '/' + id + '?username=' + username
      );
   }
}