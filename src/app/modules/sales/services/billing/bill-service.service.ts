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

  urlBase:string="http://localhost:8008/bills";


  constructor(private billProvider: BillingProvider,
    private http : HttpClient) { }


    getBills() : Observable<BillModel[]> {
      this.billList = this.http.get<BillModel[]>(this.urlBase);
      return this.billList;
    }

    getBillsByFilter(idBill?: string, clientId?: string, fromDate?: string, toDate?: string): Observable<BillModel[]> {
      let params = new HttpParams();

      if (idBill) {
        params = params.append('idBill', idBill);
      }
      if (clientId) {
        params = params.append('clientId', clientId);
      }
      if (fromDate) {
        params = params.append('fromDate', fromDate);
      }
      if (toDate) {
        params = params.append('toDate', toDate);
      }

      return this.http.get<BillModel[]>(this.urlBase, { params: params });
    }

    checkOrder(orderId: number): boolean{
    return true
    }

}
