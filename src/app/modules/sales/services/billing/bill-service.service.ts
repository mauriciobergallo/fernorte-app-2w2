import { Injectable } from '@angular/core';
import { BillModel } from '../../models/BillingModelApi';
import { Observable } from 'rxjs';
import { BillingProvider } from './BillingProvider';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

  billList = new Observable<BillModel[]>();

  filters : Map<string, string> = new Map<string, string>();

  get idBill() {
    return this.filters.get("idBill")
  }
  get clientId() {
    return this.filters.get("clientId")
  }
  get fromDate() {
    return this.filters.get("fromDate")
  }
  get toDate() {
    return this.filters.get("toDate")
  }


  urlBase:string="http://localhost:8088/bills";


  constructor(private http : HttpClient) { }


    getBills() : Observable<BillModel[]> {
      this.billList = this.http.get<BillModel[]>(this.urlBase);
      return this.billList;
    }

    getBillsByFilter(filters : Map<string, string>): Observable<BillModel[]> {

    let url:string = '';
    this.filters = filters
    if (this.idBill != '0' && this.idBill != undefined) {
      url = `http://localhost:8088/bills?id=${this.idBill}`
    } else if (this.clientId != '0' && this.clientId != null) {
      url = `http://localhost:8088/bills?clientId=${this.clientId}`
    } else {
      url = `http://localhost:8088/bills?from=${this.fromDate}&to=${this.toDate}`;
    }
    this.billList = this.http.get<BillModel[]>(url);
    return this.billList
    }

    checkOrder(orderId: number): boolean{
    return true
    }
    addBill(bill: any) : Observable<BillModel[]> {
    console.log(bill);
    return this.http.post<BillModel[]>(this.urlBase, bill);
  }

}
