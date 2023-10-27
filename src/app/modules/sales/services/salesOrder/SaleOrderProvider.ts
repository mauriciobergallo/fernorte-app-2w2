import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/environment";
import { SaleOrderModel } from "../../models/SaleOrderModel";
import { IResponse } from "../../interfaces/IResponse";
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

  getSaleOrdesByFilter(idOrder?:string, doc?:string, fromDate?:string, toDate?:string): Observable<IResponse> {
    let url:string = '';
    if(idOrder != '' && idOrder != null) {
      url = `http://localhost:8080/sales-order?id_order=${idOrder}`
    } else if(doc != '' && doc != null) {
      url = `http://localhost:8080/sales-order?doc_client=${doc}`
    } else {
      url = `http://localhost:8080/sales-order?from_date=${fromDate}&to_date=${toDate}`;
    }
      return this.http.get<IResponse>(url);
    }


  getSaleOrders() : SaleOrderModel[] {
    const saleOrderList: SaleOrderModel[] =  [
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