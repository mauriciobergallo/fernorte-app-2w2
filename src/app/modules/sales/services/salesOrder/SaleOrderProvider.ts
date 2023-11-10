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

  createSaleOrder(saleOrder: SaleOrderModel): Observable<any> {
    const url = this.urlBase + "/sales-orders";
    const header = { "content-type": "application/json" };
    const body = {
      id_sale_order: saleOrder.idSaleOrder,
      id_seller: saleOrder.idSeller,
      first_name_seller: saleOrder.firstNameSeller,
      last_name_seller: saleOrder.lastNameSeller,
      id_client: saleOrder.idClient,
      first_name_client: saleOrder.firstNameClient,
      last_name_client: saleOrder.lastNameClient,
      company_name: saleOrder.companyName,
      date_of_issue: saleOrder.dateOfIssue,
      date_of_expiration: saleOrder.dateOfExpiration,
      state_sale_order: saleOrder.stateSaleOrder,
      detail_sales_order: saleOrder.detailSalesOrder
    };
    return this.http.post<any>(url, body, { headers: header });
  }

  getSaleOrdesByFilter(idOrder?: string, doc?: string, fromDate?: string, toDate?: string): Observable<IResponse> {
    let url: string = '';
    if (idOrder != '' && idOrder != null) {
      url = `http://localhost:8080/sales-order?id_order=${idOrder}`
    } else if (doc != '' && doc != null) {
      url = `http://localhost:8080/sales-order?doc_client=${doc}`
    } else {
      url = `http://localhost:8080/sales-order?from_date=${fromDate}&to_date=${toDate}`;
    }
    return this.http.get<IResponse>(url);
  }


  getSaleOrders(): SaleOrderModel[] {
    const saleOrderList: SaleOrderModel[] = [
      {
        idSaleOrder: 1,
        idSeller: 1,
        idClient: 1,
        dateOfIssue: '2023-02-11',
        dateOfExpiration: '2023-02-15',
        stateSaleOrder: 'active',
        detailSalesOrder: []
      }
    ]
    return saleOrderList;
  }
}