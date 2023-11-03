import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:8085/category';
constructor(private httpClient: HttpClient) { }

  createCategory(category:Category):Observable<Category> {
    console.log("Category: ", category);
    return this.httpClient.post<Category>(`${this.apiUrl}/new`,category);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/get-all`);
  }

  deleteCategory(id:number) : Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiUrl}/update`, category);
  }

 
  clearFields(category: any){
    for (const prop in category) {
      if (category.hasOwnProperty(prop)) {
        delete category[prop];
      }
    }
  
  }

}
