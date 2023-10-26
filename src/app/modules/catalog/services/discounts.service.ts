import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscount } from '../models/IDiscounts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private http:HttpClient) { }

  getDescuentos(): Observable<IDiscount[]> {
    return this.http.get<IDiscount[]>('http://191.96.31.161:8080/discounts');
  }

}
