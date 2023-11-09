import { HttpClient, HttpParams } from '@angular/common/http';
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

  getDiscounts(
      page?: number,
      size?: number,
      sortBy?: string,
      sortDir?: string,
      idProduct?: number,
      initStartDate?:Date,
      finalStartDate?:Date,
      initEndDate?:Date,
      finalEndDate?:Date,
      isDeleted: boolean = false,
  ): Observable<IDiscount[]> {
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
      if (idProduct) {
        params = params.set('idProduct', idProduct);
      }
      if (isDeleted) {
         params = params.set('isDeleted', isDeleted.toString());
      }else{
         params = params.set('isDeleted', 'false');
      }
      if (initStartDate) {
        params = params.set('initStartDate', initStartDate.toISOString());
      }
      if (finalStartDate) {
        params = params.set('finalStartDate', finalStartDate.toISOString());
      }
      if (initEndDate) {
        params = params.set('initEndDate', initEndDate.toISOString());
      }
      if (finalEndDate) {
        params = params.set('finalEndDate', finalEndDate.toISOString());
      }
    return this.requestResponseService.makeGetRequest<IDiscount[]>(this.discounts, { params });
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
