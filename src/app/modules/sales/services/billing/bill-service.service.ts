import { Injectable } from '@angular/core';
import { BillModel } from '../../models/BillingModelApi';
import { Observable } from 'rxjs';
import { BillingProvider } from './BillingProvider';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

  billList = new Observable<BillModel[]>();

  idOrder:string="";
  doc:string="";
  fromDate:string="";
  toDate:string="";


  constructor(private billProvider: BillingProvider, 
    private http : HttpClient) { }
  

    getBills() : Observable<BillModel[]> {
      this.billList = this.http.get<BillModel[]>("verURL");
      return this.billList;
    }

    getBillsByFilter(idBill?:string, doc?:string, fromDate?:string, toDate?:string): Observable<BillModel[]> {
      let url:string = '';
      if(idBill != '' && doc != null) {
        url = `VERLAURL=${idBill}`
      } else if(doc != '' && doc != null) {
        url = `VERLAURL=${doc}`
      } else {
        url = `VERLAURL=${fromDate}&to_date=${toDate}`;
      }
        return this.http.get<BillModel[]>(url);
      }

}
