import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../enviroment/environment";
import { SaleOrderModel } from "../models/SaleOrderModel";
import { IResponse } from "../interfaces/IResponse";
@Injectable()

export class SaleOrderProvider {
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  createSaleOrder(saleOrder: SaleOrderModel): Observable<IResponse> {
    const url = this.urlBase + "/sales-order/create-sale-order";
    const header = { "content-type": "application/json" };
    const body = saleOrder;
    return this.http.post<IResponse>(url, body, { headers: header });
  }

  getSaleOrdesByFilter(filter:string): Observable<IResponse> {
    const url = this.urlBase + `/sales-order?${filter}`;
    return this.http.get<IResponse>(url);
  }
  getSaleOrders() : Observable<IResponse> {
    const url = this.urlBase + '/sale-order';
    return this.http.get<IResponse>(url);
  } 

}