import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscount } from '../models/IDiscounts';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RequestResponseService } from './requestResponse.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  private discounts: string = `${environment.production}discounts`;

  constructor(private requestResponseService: RequestResponseService) { }

  getDiscounts(): Observable<IDiscount[]> {
    return this.requestResponseService.makeGetRequest<IDiscount[]>(this.discounts);
  }
  getDiscountById(id: number): Observable<IDiscount> {
    return this.requestResponseService.makeGetRequest<IDiscount[]>(`${this.discounts}/${id}`);
  }
  updateDiscounts(request: any[]): Observable<IDiscount[]> {
    return this.requestResponseService.makePutRequest<IDiscount[]>(this.discounts, request);
  }
  deleteDiscounts(id: number, user: string): Observable<IDiscount[]> {

    let params = {
      user
    }

    return this.requestResponseService.makeDeleteRequest<IDiscount[]>(`${this.discounts}/${id}`, { params });
  }

}
