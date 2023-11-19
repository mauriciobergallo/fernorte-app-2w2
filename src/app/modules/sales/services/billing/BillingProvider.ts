import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/environment";
import { BillModel } from "../../models/BillingModelApi";
import { IResponse } from "../../interfaces/IResponse";
@Injectable()

export class BillingProvider {
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  createBill(bill: BillModel): Observable<IResponse> {
    const url = this.urlBase + "/VER URL/create-bill";
    const header = { "content-type": "application/json" };
    const body = bill;
    return this.http.post<IResponse>(url, body, { headers: header });
  }

}