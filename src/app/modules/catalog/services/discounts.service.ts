import { Injectable } from '@angular/core';
import { IDiscount } from '../models/IDiscounts';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { RequestResponseService } from './requestResponse.service';
import { HttpParams } from "@angular/common/http";
import { formatDate } from '@angular/common';

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
    isDeleted?: boolean,
    idProduct?: number,
    initStartDate?: Date,
    finalEndDate?: Date
  ): Observable<{ discounts: IDiscount[]; totalItems: number; }> {
    let params = new HttpParams();
    if (page) params = params.append('page', (page - 1).toString());
    if (size) params = params.append('size', size.toString());
    if (sortBy) params = params.append('sortBy', sortBy);
    if (sortDir) params = params.append('sortDir', sortDir);
    if (isDeleted) params = params.append('isDeleted', isDeleted.toString());
    if (idProduct) params = params.append('idProduct', idProduct);
    if (initStartDate) params = params.append('initStartDate', new Date(initStartDate).toISOString().slice(0, -1));
    if (finalEndDate) params = params.append('finalEndDate', new Date(finalEndDate).toISOString().slice(0, -1));
    return this.requestResponseService.makeGetRequest<{ discounts: IDiscount[]; totalItems: number; }>(this.discounts, { params: params })
      .pipe(
        map((response: any) => {
          const discounts = response.disocunts;
          tap(response => console.log(response));
          return {
            discounts: discounts.map((discount: any) => ({
              idDiscount: discount.id_discount,
              product: {
                idProduct: discount.product.id_product,
                name: discount.product.name,
              },
              discountRate: discount.discount_rate,
              startDate: discount.start_date,
              endDate: discount.end_date,
              isDeleted: discount.is_deleted
            })),
            totalItems: response.length
          };
        }),
      );
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
