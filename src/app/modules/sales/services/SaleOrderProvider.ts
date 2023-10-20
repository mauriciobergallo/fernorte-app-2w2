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
}