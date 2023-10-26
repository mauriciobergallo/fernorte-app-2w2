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

  constructor(private requestResponseService: RequestResponseService) { }

  getDiscounts(): Observable<IDiscount[]> {
    return this.requestResponseService.makeGetRequest<IDiscount[]>(`${environment.production}discounts`);
  }
  updateDiscounts(request:any[]): Observable<IDiscount[]> {
    return this.requestResponseService.makePutRequest<IDiscount[]>(`${environment.production}discounts`, request);
  }
  deleteDiscounts(id:number, user:string): Observable<IDiscount[]> {

    let params = {
      user
    }

    return this.requestResponseService.makeDeleteRequest<IDiscount[]>(`${environment.production}discounts/${id}`, { params });
  }

}
