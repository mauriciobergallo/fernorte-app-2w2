import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../enviroment/environment";
import { ISaleOrder } from "../interfaces/isale-order";
import { IResponse } from "../interfaces/IResponse";
@Injectable()

export class SaleOrderProvider {
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  createSaleOrder(saleOrder: ISaleOrder): Observable<IResponse> {
    const url = this.urlBase + "/sales-order/create-sale-order";
    const header = { "content-type": "application/json" };
    const body = saleOrder;
    return this.http.post<IResponse>(url, body, { headers: header });
  }

  getSaleOrdesByFilter(filter:string): Observable<IResponse> {
    const url = this.urlBase + `/sales-order?${filter}`;
    return this.http.get<IResponse>(url);
  }

  getSaleOrders() : ISaleOrder[] {
    const saleOrderList: ISaleOrder[] =  [
      {
        id_sale_order: 1,
        id_seller: 1,
        id_client: 1,
        date_of_issue: '2023-02-11',
        date_of_expiration: '2023-02-15',
        state_sale_order: 'active',
        detail_sales_order: []
      }
    ]
    return saleOrderList;
  }
}